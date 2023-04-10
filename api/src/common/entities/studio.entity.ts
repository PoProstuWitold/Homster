import { Field, GraphQLISODateTime, InputType, Int, ObjectType } from '@nestjs/graphql'
import { 
    Studio as StudioDB, 
    StudioType,
    StudioEmployee as StudioEmployeeDB,
    GameStudio as GameStudioDB
} from '@prisma/client'

import { BaseEntity } from './base.entity'
import { Game } from './game.entity'
import { User } from './user.entity'


@ObjectType()
export class Count {
    @Field(() => Int, { nullable: true })
    games?: number

    @Field(() => Int, { nullable: true })
    employees?: number
}

@ObjectType()
export class Studio extends BaseEntity {
	@Field(() => String)
    name: StudioDB['name']

	@Field(() => String)
    type: StudioType

    @Field(() => String, { nullable: true })
    avatar: StudioDB['avatar']

    @Field(() => String, { nullable: true })
    cover: StudioDB['cover']

	@Field(() => [GameStudio], { nullable: true })
    games?: GameStudio[]

	@Field(() => [StudioEmployee], { nullable: true })
    employees?: StudioEmployee[]

    @Field(() => Count, { nullable: true })
    _count?: Count
}

@ObjectType()
export class StudioEmployee {
	@Field(() => GraphQLISODateTime)
    assignedAt: Date

    @Field(() => String)
    assignedBy: StudioEmployeeDB['assignedBy']

    @Field(() => String)
    employeeId: StudioEmployeeDB['employeeId']

    @Field(() => User, { nullable: true })
    employee?: User

    @Field(() => String)
    employmentType: StudioEmployeeDB['employmentType']

    @Field(() => String)
    studioId: StudioEmployeeDB['studioId']

    @Field(() => Studio, { nullable: true })
    studio?: Studio
}

@ObjectType()
export class GameStudio {
    @Field(() => String)
    gameId: GameStudioDB['gameId']

    @Field(() => Game, { nullable: true })
    game?: Game

    @Field(() => String)
    studioId: GameStudioDB['studioId']

    @Field(() => Studio, { nullable: true })
    studio?: Studio

    @Field(() => String)
    contribution: GameStudioDB['contribution']
}

@InputType()
export class GetStudioArgs {
    @Field(() => String)
    name: StudioDB['name']
}
