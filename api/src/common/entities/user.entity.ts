import { Field, ObjectType } from '@nestjs/graphql'
import { User as UserDB, Role } from '@prisma/client'

import { BaseEntity } from './base.entity'
import { Game } from './game.entity'
import { StudioEmployee } from './studio.entity'

@ObjectType()
export class User extends BaseEntity {
    @Field(() => String)
    displayName: UserDB['displayName']

    @Field(() => String)
    fullName: UserDB['fullName']

    @Field()
    role: Role

    @Field(() => String)
    email: UserDB['email']

    @Field(() => [Game], { nullable: true })
    games?: Game[]

    @Field(() => [StudioEmployee], { nullable: true })
    employments?: StudioEmployee[]
}