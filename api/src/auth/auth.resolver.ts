import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { SessionGuard } from '../common/guards'
import { AuthService } from './auth.service'
import { Request, request } from 'express'

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Mutation(() => AuthResult)
    public async register(
        @Args('createUserInput') data: CreateUserInput,
        @Context('req') req: Request
    ) {
        const result = await this.authService.register(data)
		req.session.user = result.profile

        return result
    }

    @Mutation(() => AuthResult)
    public async login(
        @Args('credentialsInput') data: CredentialsInput,
        @Context('req') req: Request
    ) {
        const result = await this.authService.login(data)
        req.session.user = result.profile

        return result
    }

    @UseGuards(SessionGuard)
    @Query(() => AuthResult)
    public async me(
        @Context('req') req: Request,
    ) {
        const profile = await this.authService.serializeSession(req.session.user)

        return {
            statusCode: 200,
            message: 'Your profile',
            profile,
        }
    }

    @UseGuards(SessionGuard)
    @Mutation(() => AuthResult)
    public async logout(
        @Context('req') req: Request,
    ) {
        req.session.user = null
        
        return {
            statusCode: 200,
            message: 'Logged out',
            profile: null
        }
    }
}