import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

import { UserRequest } from '../decorators'

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}
    async canActivate(
        context: ExecutionContext,
    ): Promise<any> {
        try {
            const ctx = GqlExecutionContext.create(context)
            const req: UserRequest = ctx.getContext().req

            const accessToken = req.cookies['dsc_access']

            const verifiedToken = await this.jwtService.verifyAsync(accessToken, {
                secret: this.configService.get('jwt.access_secret')
            })

            req.user = verifiedToken.sub

            // console.log(verifiedToken)

            return true
        } catch (err) {
            throw new UnauthorizedException()
        }
    }
}