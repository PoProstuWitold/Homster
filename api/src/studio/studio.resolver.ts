import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Role } from '@prisma/client'

import { SessionGuard, Roles, RolesGuard } from '../common/guards'
import { GetStudioArgs, Studio } from '../common/entities'
import { CreateStudioInput } from '../common/dtos'
import {
    CursorPaginatedStudios, 
    CursorPaginationOptions 
} from '../common/types'
import { StudioService } from './studio.service'
import { Request } from 'express'

@Resolver(() => Studio)
export class StudioResolver {
    constructor(
        private readonly studioService: StudioService
    ) {}

    @Roles(Role['DEVELOPER'], Role['ADMIN'], Role['MOD'])
    @UseGuards(SessionGuard, RolesGuard)
    @Mutation(() => Studio)
    public async createStudio(
        @Args('createStudioInput') data: CreateStudioInput,
        @Context('req') req: Request
    ): Promise<any> {
        try {
            const studio = await this.studioService.create(data, req.session.user)
            
            return studio
        } catch (err) {
            throw err
        }
    }

    @Query(() => CursorPaginatedStudios, { name: 'studios' })
    public async getStudios(@Args('paginationOptions') paginationOptions: CursorPaginationOptions): Promise<CursorPaginatedStudios> {
        try {
            const { edges, pageInfo } = await this.studioService.findAll(paginationOptions)
            
            return {
                edges,
                pageInfo
            }
        } catch (err) {
            throw err
        }
    }

    @Query(() => Studio, { name: 'studio' })
    public async getStudio(
        @Args('getStudioArgs') data: GetStudioArgs
    ): Promise<any> {
        try {
            const studio = await this.studioService.findOne(data)
            return studio
        } catch (err) {
            throw err
        }
    }
}