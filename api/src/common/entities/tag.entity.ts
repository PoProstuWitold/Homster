import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql'
import { Tag as TagDB } from '@prisma/client'

import { Game } from './game.entity'

@ObjectType()
export class Tag {
    @Field(() => ID)
    id: TagDB['id']

    @Field(() => GraphQLISODateTime)
    createdAt: Date

    @Field(() => GraphQLISODateTime)
    updatedAt: Date

    @Field(() => String)
    name: TagDB['name']

    @Field(() => String, { nullable: true })
    description?: TagDB['description']

    @Field(() => [Game], { nullable: true })
    games?: Game[]
}
