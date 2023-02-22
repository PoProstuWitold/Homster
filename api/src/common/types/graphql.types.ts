import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Game, Genre, Studio, Tag, User } from '../entities'
import { FastifyRequest, FastifyReply } from 'fastify'
import { PubSub } from 'mercurius'

export interface GqlFastifyContext {
    req: FastifyRequest
    reply: FastifyReply
    pubsub: PubSub
}


@ObjectType()
export class CursorPageInfo {
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
export class OffsetPageInfo {
    @Field(() => Int)
    currentPage: number

    @Field(() => Int)
    totalPages: number

    @Field(() => Int)
    totalCount: number
}



@InputType()
export class CursorPaginationOptions {
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

@ObjectType()
export class CursorPaginatedUsers {
    @Field(() => [User], { nullable: true })
    edges?: User[]

    @Field(() => CursorPageInfo)
    pageInfo: CursorPageInfo
}

@ObjectType()
export class CursorPaginatedStudios {
    @Field(() => [Studio], { nullable: true })
    edges?: Studio[]

    @Field(() => CursorPageInfo)
    pageInfo: CursorPageInfo
}


@ObjectType()
export class OffsetPaginatedGenres {
    @Field(() => [Genre], { nullable: true })
    edges?: Genre[]

    @Field(() => OffsetPageInfo, { nullable: true })
    pageInfo?: OffsetPageInfo
}

@ObjectType()
export class OffsetPaginatedTags {
    @Field(() => [Tag], { nullable: true })
    edges?: Tag[]

    @Field(() => OffsetPageInfo, { nullable: true })
    pageInfo?: OffsetPageInfo
}

@ObjectType()
export class CursorPaginatedGames {
    @Field(() => [Game], { nullable: true })
    edges?: Game[]

    @Field(() => CursorPageInfo)
    pageInfo: CursorPageInfo
}