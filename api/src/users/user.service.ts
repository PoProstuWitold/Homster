import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

import { CreateUserInput } from '../common/dtos'
import { User } from '../common/entities'
import { isUniqueError } from '../common/utils'


interface findOneByFieldOptions {
    throwError?: boolean
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) {}
    
    public async create(data: CreateUserInput) {
        try {
            const user = this.userRepository.create(data)
            
            await this.userRepository.save(user)

            return user
        } catch (err) {
            isUniqueError(err)
            throw err
        }
    }

    public async update(userId: string, values: QueryDeepPartialEntity<User>) {
        try {
            const user = await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set(values)
                .where("id = :id", { id: userId })
                .execute()

            return user
        } catch (err) {
            isUniqueError(err)
            throw err
        }
    }

    public async findOneByField(field: string, value: string | number, options?: findOneByFieldOptions) {
        try {
            const user = await this.userRepository.findOne({ where: { [field]: value } })

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

    public async findAll() {
        try {
            const users = await this.userRepository.find()

            return users
        } catch (err) {
            throw err
        }
    }
}