import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GqlFastifyContext } from '../common/types'
import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { SessionGuard } from '../common/guards'
import { AuthService } from './auth.service'

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Mutation(() => AuthResult)
    public async register(
        @Args('createUserInput') data: CreateUserInput,
        @Context() ctx: GqlFastifyContext
    ) {
        const result = await this.authService.register(data)
        ctx.req.session.set('user', result.profile)

        return result
    }

    @Mutation(() => AuthResult)
    public async login(
        @Args('credentialsInput') data: CredentialsInput,
        @Context() ctx: GqlFastifyContext
    ) {
        const result = await this.authService.login(data)
        ctx.req.session.set('user', result.profile)

        return result
    }

    @UseGuards(SessionGuard)
    @Query(() => AuthResult)
    public async me(
        @Context() ctx: GqlFastifyContext,
    ) {
        const profile = await this.authService.serializeSession(ctx.req.session.get('user'))

        return {
            statusCode: 200,
            message: 'Your profile',
            profile,
        }
    }

    @UseGuards(SessionGuard)
    @Mutation(() => AuthResult)
    public async logout(
        @Context() ctx: GqlFastifyContext,
    ) {
        ctx.req.session.delete()
        
        return {
            statusCode: 200,
            message: 'Logged out',
            profile: null
        }
    }
}