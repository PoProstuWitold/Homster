import { Field, Float, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { Game as GameDB, GameStatus, GameType } from '@prisma/client'

import { BaseEntity } from './base.entity'
import { Genre } from './genre.entity'
import { GameStudio } from './studio.entity'
import { Tag } from './tag.entity'
import { User } from './user.entity'

@ObjectType()
export class Game extends BaseEntity {
    @Field(() => String)
    name: GameDB['name']

    @Field(() => String)
    description: GameDB['description']

    @Field(() => Float)
    basicPrice: GameDB['basicPrice']

    @Field(() => Float)
    price: GameDB['price']

    @Field(() => String)
    status: GameStatus

    @Field(() => String)
    type: GameType

    @Field(() => [GameStudio], { nullable: true })
    studios?: GameStudio[]

    @Field(() => GraphQLISODateTime)
    releasedAt: Date

    @Field(() => Int)
    recentReviews: GameDB['recentReviews']

    @Field(() => Int)
    allReviews: GameDB['allReviews']

    @Field(() => Float)
    recentRating: GameDB['recentRating']

    @Field(() => Float)
    allRating: GameDB['allRating']

    @Field(() => Boolean)
    adultOnly: GameDB['adultOnly']

    @Field(() => [Tag], { nullable: true })
    tags?: Tag[]

    @Field(() => [Genre], { nullable: true })
    genres?: Genre[]

    @Field(() => [User], { nullable: true })
    users?: User[]
}