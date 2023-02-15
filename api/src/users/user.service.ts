import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { User } from '@prisma/client'

import { PrismaService } from '../../database/prisma.service'
import { CreateUserInput, UpdateUserInput } from '../common/dtos'
import { isPrismaError } from '../common/utils'
import { PaginationOptions } from '../common/types'

interface findOneByFieldOptions {
    throwError?: boolean
    includeRelations?: boolean
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
            isPrismaError(err)
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
            isPrismaError(err)
            throw err
        }
    }

    public async findOneByField(field: string, value: string | number, options?: findOneByFieldOptions) {
        try {
            let user: User
            
            if(!options || !options.includeRelations) {
                user = await this.prisma.user.findFirst({
                    where: {
                        [field]: value
                    }
                })
            } else {
                user = await this.prisma.user.findFirst({
                    where: {
                        [field]: value
                    },
                    include: {
                        games: true,
                        employments: {
                            include: {
                                studio: true
                            }
                        }
                    }
                })
            }

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
            const edges = await this.prisma.user.findMany({
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
            
            const hasNext = edges.length === take
            const hasPrevious = Boolean(cursor)
            const nextCursor = hasNext ? edges[edges.length -1].id : ''
            const previousCursor = ''
            const pageInfo = {
                hasNext,
                hasPrevious,
                nextCursor,
                previousCursor
            }
            return {
                edges,
                pageInfo
            }
        } catch (err) {
            throw err
        }
    }
}