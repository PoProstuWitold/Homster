import { UserInputError } from '@nestjs/apollo'

export class UniqueViolation extends UserInputError {
    constructor(field: string) {
        super('UNIQUE_VIOLATION', {
            extensions: {
                statusCode: 400,
                message: 'Unique violation', 
                errors: {
                    [field]: `Field ${field} already exists`
                }
            }
        })
    }
}