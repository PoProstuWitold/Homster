import { BadRequestException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { UniqueViolation } from './exceptions'

export const isPrismaError = (err: any) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            throw new UniqueViolation(err.meta.target[0])
        }
        if (err.code === 'P2025') {
            throw new BadRequestException(err.meta.cause || 'Record to update not found')
        }
        if (err.code === 'P2016') {
            throw new BadRequestException('Entity with given criteria not found')
        }
    }
}