import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { 
    IsNotEmpty, NotContains, Length, Matches, IsEmail, IsDateString, IsEnum, IsArray, IsOptional 
} from 'class-validator'
import { 
    Studio as StudioDB, StudioType,
    Game as GameDB, GameStatus, GameType ,
    Tag as TagDB,
    Genre as GenreDB
} from '@prisma/client'

import { Profile, User } from '../entities'

@InputType()
export class CreateUserInput {
    @IsEmail()
    @Field(() => String)
    email: string

    @IsNotEmpty({
        message: 'Password cannot be empty or whitespace'
    })
    @NotContains(' ', {
        message: 'Password cannot be empty or whitespace'
    })
    @Length(6, 100, {
        message: 'Password must be between 6 and 100 characters long'
    })
    @Field(() => String)
    password: string

    @IsNotEmpty({
        message: 'Display name cannot be empty or whitespace'
    })
    @Length(3, 50, {
        message: 'Display name must be between 3 and 30 characters long'
    })
    @Matches(/^[\w](?!.*?\.{2})[\w. ]{1,30}[\w]$/, {
        message: "Display name can include only letters, numbers and space between words and be max 30 characters long"
    })
    @Field(() => String)
    displayName: string

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
    fullName: string
}

@InputType()
export class UpdateUserInput {
    @IsOptional()
    @IsNotEmpty({
        message: 'Display name cannot be empty or whitespace'
    })
    @Length(3, 50, {
        message: 'Display name must be between 3 and 30 characters long'
    })
    @Matches(/^[\w](?!.*?\.{2})[\w. ]{1,30}[\w]$/, {
        message: "Display name can include only letters, numbers and space between words and be max 30 characters long"
    })
    @Field(() => String, { nullable: true })
    displayName?: string

    @IsOptional()
    @IsNotEmpty({
        message: 'Full name cannot be empty or whitespace'
    })
    @Length(3, 50, {
        message: 'Full name must be between 3 and 30 characters long'
    })
    @Matches(/^[\w](?!.*?\.{2})[\w. ]{1,30}[\w]$/, {
        message: "Full name can include only letters, numbers and space between words and be max 30 characters long"
    })
    @Field(() => String, { nullable: true })
    fullName?: string
}

@InputType()
export class CredentialsInput {
    @IsEmail()
    @Field(() => String)
    email: string

    @IsNotEmpty({
        message: 'Password cannot be empty or whitespace'
    })
    @NotContains(' ', {
        message: 'Password cannot be empty or whitespace'
    })
    @Length(6, 100, {
        message: 'Password must be between 6 and 100 characters long'
    })
    @Field(() => String)
    password: string
}

@ObjectType()
export class AuthResult {
    @Field(() => Int, { nullable: true })
    statusCode?: number

    @Field(() => String, { nullable: true })
    message?: string

    @Field(() => Profile, { nullable: true })
    profile?: Profile
}

@InputType()
export class CreateStudioInput {
    @IsNotEmpty({
        message: 'Studio name cannot be empty or whitespace'
    })
    @Length(2, 30, {
        message: 'Studio name be between 2 and 30 characters long'
    })
    @Field(() => String)
    name: StudioDB['name']
    
    @IsOptional()
    @IsEnum(StudioType, {
        message: `Studio type must be either 'Developer', 'Publisher', 'DeveloperAndPublisher' or left empty`
    })
    @Field(() => String, { nullable: true })
    type?: StudioType
}

@InputType()
export class CreateGameInput {
    @IsNotEmpty({
        message: 'Game name cannot be empty or whitespace'
    })
    @Length(2, 30, {
        message: 'Game name must be between 2 and 30 characters long'
    })
    @Field(() => String)
    name: GameDB['name']

    @IsNotEmpty({
        message: 'Game description cannot be empty or whitespace'
    })
    @Length(2, 250, {
        message: 'Game description cannot be between 2 and 40 characters long'
    })
    @Field(() => String)
    description: GameDB['description']

    @IsNotEmpty({
        message: 'Game status cannot be empty or whitespace'
    })
    @IsEnum(GameStatus, {
        message: `Game status must be one of these: NotReleased, Alpha, Beta, EarlyAccess, Released`
    })
    @Field(() => String)
    status: GameStatus

    @IsNotEmpty({
        message: 'Game release date cannot be empty or whitespace'
    })
    @IsDateString({}, {
        message: 'Release date must be valid ISO string'
    })
    @Field(() => String)
    releasedAt: GameDB['releasedAt']

    @IsEnum(GameType, {
        message: `Game type must be one of these: Game, DLC`
    })
    @Field(() => String)
    type: GameType

    @IsArray({
        message: 'Developers must be array of developer names'
    })
    @Field(() => [String])
    developers: string

    @IsArray({
        message: 'Publishers must be array of developer names'
    })
    @Field(() => [String])
    publishers: string
}

@InputType()
export class AssignOrRevokeToGameInput {
    @IsArray({
        message: 'Assignment must be array of assignment names'
    })
    @Field(() => [String])
    assignment: string[]

    @IsNotEmpty({
        message: 'Game cannot be empty or whitespace'
    })
    @Length(2, 100, {
        message: 'Game must be between 2 and 100 characters long'
    })
    @Field(() => String)
    game: string

    @IsNotEmpty({
        message: 'Game assigment type cannot be empty or whitespace'
    })
    @Length(2, 15, {
        message: 'Game assigment type must be either "tag" or "genre"'
    })
    @Field(() => String)
    type: "tag" | "genre"

    @IsNotEmpty({
        message: 'Game assigment activity cannot be empty or whitespace'
    })
    @Length(2, 15, {
        message: 'Game assigment activity must be either "assign" or "revoke"'
    })
    @Field(() => String)
    activity: "assign" | "revoke"
}

@InputType()
export class CreateTagInput {
    @IsNotEmpty({
        message: 'Tag name cannot be empty or whitespace'
    })
    @Length(2, 20, {
        message: 'Tag name must be between 2 and 20 characters long'
    })
    @Field(() => String)
    name: TagDB['name']
}

@InputType()
export class CreateGenreInput {
    @IsNotEmpty({
        message: 'Genre name cannot be empty or whitespace'
    })
    @Length(2, 20, {
        message: 'Genre name must be between 2 and 20 characters long'
    })
    @Field(() => String)
    name: GenreDB['name']
}