import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { FastifyRequest } from 'fastify'

@Injectable()
export class SessionGuard implements CanActivate {
    constructor() {}
    async canActivate(
        context: ExecutionContext,
    ): Promise<any> {
        try {
            const ctx = GqlExecutionContext.create(context)
            const req: FastifyRequest = ctx.getContext().req

            const userSession = req.session.get('user')

            if(!userSession) {
                throw new UnauthorizedException()
            }

            return userSession
        } catch (err) {
            throw new UnauthorizedException()
        }
    }
}