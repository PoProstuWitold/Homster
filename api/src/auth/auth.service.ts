import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'

import { isUniqueError } from '../common/utils'
import { AuthResult, CreateUserInput, CredentialsInput } from '../common/dtos'
import { InvalidCredentials } from '../common/exceptions'
import { User } from '../common/entities'

import { UserService } from '../users/user.service'

export interface AccessToken {
    sub: {
        id: string,
        displayName: string,
        role: string
    },
    aud: string,
    jti: string
}

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}
    
    public async register(data: CreateUserInput) {
        try {
            const user = await this.userService.create(data)

            const accessToken = await this.generateToken(user)

            const result: AuthResult = {
                user,
                accessToken
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

            const accessToken = await this.generateToken(user)
            const result: AuthResult = {
                user,
                accessToken
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

    private async generateToken(user: User) {
        try {
            const jti = crypto.randomUUID()
            const aud = 'https://dsc.pl/'

            const accessToken: string = await this.jwtService.signAsync({
                sub: {
                    id: user.id,
                    displayName: user.displayName,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                },
                aud,
                jti,
            })

            return accessToken

        } catch (err) {
            throw err
        }
    }
}