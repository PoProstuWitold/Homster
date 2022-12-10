import { Injectable } from '@nestjs/common'
import { verify } from 'argon2'

import { isUniqueError } from '../common/utils'
import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { InvalidCredentials } from '../common/exceptions'

import { UserService } from '../users/user.service'


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ) {}
    
    public async register(data: CreateUserInput) {
        try {
            const user = await this.userService.create(data)

            const token = "tokendwjandajhda"
            const result: AuthResult = {
                user,
                token
            }

            return result

        } catch (err) {
            isUniqueError(err)
            throw err
        }
    }

    public async login(credentials: CredentialsInput) {
        try {
            const { email, password } = credentials

            const user = await this.userService.findOneByField('email', email)

            if(!user) {
                throw new InvalidCredentials()
            }

            const match = await verify(user.password, password)

            if(!match) {
                throw new InvalidCredentials()
            }

            const token = "tokendwjandajhda"
            const result: AuthResult = {
                user,
                token
            }

            return result

        } catch (err) {
            throw err
        }
    }

    public async whoAmI() {
        try {
            
        } catch (err) {
            throw err
        }
    }
}