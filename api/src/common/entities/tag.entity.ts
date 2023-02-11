import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Tag as TagDB } from '@prisma/client'

import { Game } from './game.entity'

@ObjectType()
export class Tag {
    @Field(() => Int)
    id: TagDB['id']

    @Field(() => String)
    name: TagDB['name']

    @Field(() => [Game], { nullable: true })
    games?: Game[]
}
