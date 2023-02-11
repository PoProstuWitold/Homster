import { Injectable } from '@nestjs/common'
import { verify } from 'argon2'

import { UserService } from '../users/user.service'
import { isUniqueError } from '../common/utils'
import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { InvalidCredentials } from '../common/exceptions'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}
    
    public async register(data: CreateUserInput) {
        try {
            const profile = await this.userService.create(data)
            
            const result: AuthResult = {
                profile
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

            const profile = await this.userService.findOneByField('email', email)
            if(!profile) {
                throw new InvalidCredentials()
            }

            const match = await verify(profile.password, password)
            if(!match) {
                throw new InvalidCredentials()
            }

            const result: AuthResult = {
                profile
            }

            return result
        } catch (err) {
            throw err
        }
    }
}