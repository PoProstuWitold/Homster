import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { UserRequest } from '../decorators'
import { User } from '../entities'

export const Roles = (...roles: string[]) => SetMetadata('roles', roles)

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<any> {
        try {
            const roles = this.reflector.get<string[]>('roles', context.getHandler())

            if (!roles) {
                return true
            }

            const ctx = GqlExecutionContext.create(context)
            const req: UserRequest = ctx.getContext().req

            const user: User = req.session.get('user')
            const includeRole = roles.includes(user.role)
            
            if(!includeRole) {
                throw new UnauthorizedException(
                    `You need one of the following role: "${roles.join(', ')}" to access but you are "${user.role}"`
                )
            }
            return includeRole
        } catch (err) {
            throw new UnauthorizedException(err.message)
        }
    }
}