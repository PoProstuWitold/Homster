import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Genre as GenreDB } from '@prisma/client'

import { Game } from './game.entity'

@ObjectType()
export class Genre {
    @Field(() => Int)
    id: GenreDB['id']

    @Field(() => String)
    createdAt: Date

    @Field(() => String)
    updatedAt: Date

    @Field(() => String)
    name: GenreDB['name']

    @Field(() => [Game], { nullable: true })
    games?: Game[]
}
