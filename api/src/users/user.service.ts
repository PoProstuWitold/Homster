import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'

import { CreateUserInput, UpdateUserInput } from '../common/dtos'
import { PrismaService } from '../../database/prisma.service'
import { isUniqueError } from '../common/utils'
import { Field, InputType } from '@nestjs/graphql'

interface findOneByFieldOptions {
    throwError?: boolean
}
@InputType()
export class PaginationOptions {
    @Field()
    take: number
    @Field()
    cursor: string
    @Field()
    field: string
    @Field()
    type: 'asc' | 'desc'
}

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService
    ) {}
    
    public async create(data: CreateUserInput) {
        try {
            const user = await this.prisma.user.create({ data: {
                ...data,
                password: await hash(data.password)
            }})

            return user
        } catch (err) {
            isUniqueError(err)
            throw err
        }
    }

    public async update(userId: string, values: UpdateUserInput) {
        try {
            const user = await this.prisma.user.update({
                where: {
                    id: userId
                },
                data: values
            })

            return user
        } catch (err) {
            isUniqueError(err)
            throw err
        }
    }

    public async findOneByField(field: string, value: string | number, options?: findOneByFieldOptions) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    [field]: value
                }
            })

            if(options && options.throwError) {
                if(!user) {
                    throw new NotFoundException(`User with ${field} of value ${value} not found`)
                }
            }

            return user
        } catch (err) {
            throw err
        }
    }

    public async findAll(paginationOptions?: PaginationOptions) {
        try {
            const { take, cursor, field, type } = paginationOptions
            const users = await this.prisma.user.findMany({
                take,
                orderBy: {
                    [field]: type
                },
                ...(cursor && {
                    skip: 1, // Do not include the cursor itself in the query result.
                    cursor: {
                      id: cursor,
                    }
                })
            })
            

            return {
                users,
                hasMore: users.length === take
            }
        } catch (err) {
            throw err
        }
    }
}