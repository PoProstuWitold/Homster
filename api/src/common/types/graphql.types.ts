import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Game, Genre, Studio, Tag, User } from '../entities'

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
export class OffsetPageInfo {
    @Field(() => Int)
    currentPage: number

    @Field(() => Int)
    totalPages: number

    @Field(() => Int)
    totalCount: number
}

@ObjectType()
export class PaginatedGenres {
    @Field(() => [Genre], { nullable: true })
    edges?: Genre[]

    @Field(() => OffsetPageInfo, { nullable: true })
    pageInfo?: OffsetPageInfo
}

@ObjectType()
export class PaginatedTags {
    @Field(() => [Tag], { nullable: true })
    edges?: Tag[]

    @Field(() => OffsetPageInfo, { nullable: true })
    pageInfo?: OffsetPageInfo
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

@InputType()
export class OffsetPaginationOptions {
    @Field()
    take: number
    @Field()
    skip: number
    @Field()
    field: string
    @Field()
    type: 'asc' | 'desc'
}