import { UserInputError } from '@nestjs/apollo'

export class InvalidCredentials extends UserInputError {
    constructor() {
        super('INVALID_CREDENTIALS', {
            extensions: {
                statusCode: 400,
                message: 'Invalid credentials', 
                errors: {
                    password: 'Invalid credentials',
                    email: 'Invalid credentials'
                }
            }
        })
    }
}