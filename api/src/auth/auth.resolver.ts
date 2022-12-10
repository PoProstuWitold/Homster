import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { User } from '../common/entities'

import { AuthService } from './auth.service'


@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Mutation(() => AuthResult)
    public async register(
        @Args('createUserInput') data: CreateUserInput
    ) {
        const result = await this.authService.register(data)
        return result
    }

    @Mutation(() => AuthResult)
    public async login(
        @Args('credentialsInput') data: CredentialsInput
    ) {
        const result = await this.authService.login(data)
        return result
    }

    @Mutation(() => User)
    public async whoAmI() {
        // TODO
    }
}