import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsNotEmpty, NotContains, Length, Matches, IsEmail } from 'class-validator'

import { User } from '../entities'

@InputType()
export class CreateUserInput {
    @IsEmail()
    @Field()
    public email: string

    @IsNotEmpty({
        message: 'Password cannot be empty or whitespace'
    })
    @NotContains(' ', {
        message: 'Password cannot be empty or whitespace'
    })
    @Length(6, 100, {
        message: 'Password must be between 6 and 100 characters long'
    })
    @Field()
    public password: string

    @IsNotEmpty({
        message: 'Display name cannot be empty or whitespace'
    })
    @Length(3, 50, {
        message: 'Display name must be between 3 and 30 characters long'
    })
    @Matches(/^[\w](?!.*?\.{2})[\w. ]{1,30}[\w]$/, {
        message: "Display name can include only letters, numbers and space between words and be max 30 characters long"
    })
    @Field()
    public displayName: string

    @IsNotEmpty({
        message: 'Full name cannot be empty or whitespace'
    })
    @Length(3, 50, {
        message: 'Full name must be between 3 and 30 characters long'
    })
    @Matches(/^[\w](?!.*?\.{2})[\w. ]{1,30}[\w]$/, {
        message: "Full name can include only letters, numbers and space between words and be max 30 characters long"
    })
    @Field()
    public fullName: string
}

@InputType()
export class CredentialsInput {
    @IsEmail()
    @Field()
    public email: string

    @IsNotEmpty({
        message: 'Password cannot be empty or whitespace'
    })
    @NotContains(' ', {
        message: 'Password cannot be empty or whitespace'
    })
    @Length(6, 100, {
        message: 'Password must be between 6 and 100 characters long'
    })
    @Field()
    public password: string
}

@ObjectType()
export class AuthResult {
    @Field(() => Int, { nullable: true })
    public statusCode?: number

    @Field(() => String, { nullable: true })
    public message?: string

    @Field(() => User, { nullable: true })
    public user?: User
}