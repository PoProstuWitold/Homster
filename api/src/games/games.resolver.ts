import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Role } from '@prisma/client'

import { Roles, RolesGuard, SessionGuard } from '../common/guards'
import { GqlContext, GqlFastifyContext } from '../common/decorators'
import { Game } from '../common/entities'
import { PaginatedGames, PaginationOptions } from '../common/types'
import { CreateGameInput } from '../common/dtos'
import { GameService } from './games.service'

@Resolver(() => Game)
export class GameResolver {
    constructor(
        private readonly gameService: GameService
    ) {}

    @Roles(Role['ADMIN'], Role['MOD'])
    @UseGuards(SessionGuard, RolesGuard)
    @Mutation(() => Game)
    public async createGame(
        @Args('createGameInput') data: CreateGameInput,
        @GqlContext() ctx: GqlFastifyContext
    ): Promise<any> {
        try {
            const game = await this.gameService.create(data)
            
            return game
        } catch (err) {
            throw err
        }
    }

    @Query(() => PaginatedGames, { name: 'games' })
    public async getGames(@Args('paginationOptions') paginationOptions: PaginationOptions): Promise<any> {
        try {
            const { edges, pageInfo } = await this.gameService.findAll(paginationOptions)
            
            return {
                edges,
                pageInfo
            }
        } catch (err) {
            throw err
        }
    }
}