import { Prisma } from '@prisma/client'
import { PostgresErrorCode } from './enums'
import { UniqueViolation } from './exceptions'

export const isUniqueError = (err: any) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            throw new UniqueViolation(err.meta.target[0])
        }
    }

    if(err.code == PostgresErrorCode.UniqueViolation) {
        if(err.detail.includes('email')) {
            throw new UniqueViolation('email')
        }

        if(err.detail.includes('displayName')) {
            throw new UniqueViolation('displayName')
        }
    }
}