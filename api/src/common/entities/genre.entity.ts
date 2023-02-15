import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { Genre as GenreDB } from '@prisma/client'

import { Game } from './game.entity'

@ObjectType()
export class Genre {
    @Field(() => ID)
    id: GenreDB['id']

    @Field(() => GraphQLISODateTime)
    createdAt: Date

    @Field(() => GraphQLISODateTime)
    updatedAt: Date

    @Field(() => String)
    name: GenreDB['name']

    @Field(() => String, { nullable: true })
    description?: GenreDB['description']

    @Field(() => [Game], { nullable: true })
    games?: Game[]
}
