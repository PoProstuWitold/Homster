import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateUserInput } from '../common/dtos'
import { User } from '../common/entities'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    @Query(() => User, { name: 'user' })
    public async getUser(
        @Args('field') field: string,
        @Args('value') value: string
    ): Promise<User> {
        try {
            const user = await this.userService.findOneByField(field, value, {
                throwError: true
            })
            
            return user
        } catch (err) {
            throw err
        }
    }

    @Query(() => [User], { name: 'users' })
    public async getUsers(): Promise<User[]> {
        try {
            return this.userService.findAll()
        } catch (err) {
            throw err
        }
    }

    @Mutation(() => User)
    public async createUser(@Args('createUserInput') data: CreateUserInput): Promise<User> {
        try {
            const user = await this.userService.create(data)
            return user
        } catch (err) {
            throw err
        }
    }
}