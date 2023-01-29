import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { FastifyRequest, FastifyReply } from 'fastify'

import { User } from '../entities'

export interface UserRequest extends FastifyRequest {
    user?: User
}

export interface GqlFastifyContext {
    req: UserRequest
    reply: FastifyReply
}

export const GqlContext = createParamDecorator(
    async (field: string, ctx: ExecutionContext) => {
        const _ctx = await GqlExecutionContext.create(ctx).getContext()
        if(!ctx) return

        return field ? _ctx[field] : _ctx
    }
)