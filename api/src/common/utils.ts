import { PostgresErrorCode } from '../common/enums'
import { UniqueViolation } from '../common/exceptions'


export const isUniqueError = (err) => {
    if(err.code == PostgresErrorCode.UniqueViolation) {
        if(err.detail.includes('email')) {
            throw new UniqueViolation('email')
        }

        if(err.detail.includes('displayName')) {
            throw new UniqueViolation('displayName')
        }
    }
}