import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { SessionGuard } from '../common/guards'
import { GqlContext, GqlFastifyContext } from '../common/decorators'
import { CreateUserInput, UpdateUserInput } from '../common/dtos'
import { User } from '../common/entities'
import { PaginatedUsers, PaginationOptions } from '../common/types'
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
            const user = await this.userService.findOneByField(field, value, { throwError: true, includeRelations: true })
            
            return user
        } catch (err) {
            throw err
        }
    }

    @UseGuards(SessionGuard)
    @Query(() => User)
    public async updateUser(
        @Args('values') values: UpdateUserInput,
        @GqlContext() ctx: GqlFastifyContext
    ): Promise<User> {
        try {
            const session = await ctx.req.session.get('user')
            const user = await this.userService.update(session.id, values)
            ctx.req.session.set('user', user)

            return user
        } catch (err) {
            throw err
        }
    }

    @Query(() => PaginatedUsers, { name: 'users' })
    public async getUsers(@Args('paginationOptions') paginationOptions: PaginationOptions): Promise<PaginatedUsers> {
        try {
            const { users, pageInfo } = await this.userService.findAll(paginationOptions)

            return {
                users,
                pageInfo
            }
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