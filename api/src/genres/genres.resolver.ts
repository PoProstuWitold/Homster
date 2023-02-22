import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Role } from '@prisma/client'

import { SessionGuard, Roles, RolesGuard } from '../common/guards'
import { Genre } from '../common/entities'
import { CreateGenreInput } from '../common/dtos'
import { 
    OffsetPaginationOptions, OffsetPaginatedGenres 
} from '../common/types'
import { GenreService } from './genres.service'

@Resolver(() => Genre)
export class GenreResolver {
    constructor(
        private readonly genreService: GenreService
    ) {}

    @Roles(Role['ADMIN'], Role['MOD'])
    @UseGuards(SessionGuard, RolesGuard)
    @Mutation(() => Genre)
    public async createGenre(
        @Args('createGenreInput') data: CreateGenreInput
    ): Promise<any> {
        try {
            const genre = await this.genreService.create(data)
            
            return genre
        } catch (err) {
            throw err
        }
    }

    @Query(() => OffsetPaginatedGenres, { name: 'genres' })
    public async getGenres(@Args('paginationOptions') paginationOptions: OffsetPaginationOptions): Promise<any> {
        const { edges, pageInfo } = await this.genreService.findAll(paginationOptions)
            
        return {
            edges,
            pageInfo
        }
    }

}