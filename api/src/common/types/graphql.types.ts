import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Game, Studio, User } from '../entities'

@ObjectType()
export class PageInfo {
    @Field()
    hasPrevious: boolean

    @Field()
    hasNext: boolean

    @Field(() => String)
    previousCursor: string

    @Field(() => String)
    nextCursor: string
}

@ObjectType()
export class PaginatedUsers {
    @Field(() => [User], { nullable: true })
    users?: User[]

    @Field(() => PageInfo)
    pageInfo: PageInfo
}

@ObjectType()
export class PaginatedStudios {
    @Field(() => [Studio], { nullable: true })
    edges?: Studio[]

    @Field(() => PageInfo)
    pageInfo: PageInfo
}

@ObjectType()
export class PaginatedGames {
    @Field(() => [Game], { nullable: true })
    edges?: Game[]

    @Field(() => PageInfo)
    pageInfo: PageInfo
}

@InputType()
export class PaginationOptions {
    @Field()
    take: number
    @Field()
    cursor: string
    @Field()
    field: string
    @Field()
    type: 'asc' | 'desc'
}