import { Injectable } from '@nestjs/common'
import { verify } from 'argon2'

import { UserService } from '../users/user.service'
import { isPrismaError } from '../common/utils'
import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { InvalidCredentials } from '../common/exceptions'
import { User } from '../common/entities'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ) {}
    
    public async register(data: CreateUserInput) {
        try {
            const profile = await this.userService.create(data)
            
            delete profile.password

            const result: AuthResult = {
                profile,
                statusCode: 200,
                message: 'Signed up',
            }

            return result
        } catch (err) {
            isPrismaError(err)
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

            delete profile.password

            const result: AuthResult = {
                profile,
                statusCode: 200,
                message: 'Signed in',
            }

            return result
        } catch (err) {
            throw err
        }
    }

    public async serializeSession(user: User) {
        try {
            let {
                createdAt,
                updatedAt,
                ...rest
            } = user

            createdAt = new Date(createdAt)
            updatedAt = new Date(updatedAt)

            const profile = {
                createdAt,
                updatedAt,
                ...rest
            }

            return profile
        } catch (err) {
            throw err
        }
    }
}