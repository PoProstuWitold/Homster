import { Field, ObjectType } from '@nestjs/graphql'
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
export class Studio extends BaseEntity {
	@Field(() => String)
    name: StudioDB['name']

	@Field(() => String)
    type: StudioType

	@Field(() => [GameStudio], { nullable: true })
    games?: GameStudio[]

	@Field(() => [StudioEmployee], { nullable: true })
    employees?: StudioEmployee[]
}

@ObjectType()
export class StudioEmployee {
	@Field(() => String)
    assignedAt: StudioEmployeeDB['assignedAt']

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