import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { GqlContext, GqlFastifyContext } from '../common/decorators'
import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { JwtGuard } from '../common/guards'

import { AuthService } from './auth.service'

const authCookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 30*60
}

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Mutation(() => AuthResult)
    public async register(
        @Args('createUserInput') data: CreateUserInput,
        @GqlContext() ctx: GqlFastifyContext
    ) {
        const result = await this.authService.register(data)
        ctx.reply.setCookie('dsc_access', result.accessToken, (authCookieOptions as any))

        return {
            statusCode: 200,
            message: 'Signed up',
            ...result
        }
    }

    @Mutation(() => AuthResult)
    public async login(
        @Args('credentialsInput') data: CredentialsInput,
        @GqlContext() ctx: GqlFastifyContext
    ) {
        const result = await this.authService.login(data)
        ctx.reply.setCookie('dsc_access', result.accessToken, (authCookieOptions as any))

        return {
            statusCode: 200,
            message: 'Signed in',
            ...result
        }
    }

    @UseGuards(JwtGuard)
    @Query(() => AuthResult)
    public async whoAmI(
        @GqlContext() ctx: GqlFastifyContext,
    ) {
        return {
            statusCode: 200,
            message: 'Your profile',
            user: ctx.req.user,
        }
    }

    @UseGuards(JwtGuard)
    @Query(() => AuthResult)
    public async logout(
        @GqlContext() ctx: GqlFastifyContext,
    ) {
        ctx.reply.clearCookie('dsc_access')
        return {
            statusCode: 200,
            message: 'Logged out',
        }
    }
}