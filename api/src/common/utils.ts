import { BadRequestException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { UniqueViolation } from './exceptions'

export const isUniqueError = (err: any) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            throw new UniqueViolation(err.meta.target[0])
        }
        if (err.code === 'P2025') {
            console.log(err)
            throw new BadRequestException(err.message)
        }
    }
}