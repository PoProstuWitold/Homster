import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Role } from '@prisma/client'

import { SessionGuard, Roles, RolesGuard } from '../common/guards'
import { GqlContext, GqlFastifyContext } from '../common/decorators'
import { Studio } from '../common/entities'
import { CreateStudioInput } from '../common/dtos'
import { PaginatedStudios, PaginationOptions } from '../common/types'
import { StudioService } from './studio.service'

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
        @GqlContext() ctx: GqlFastifyContext
    ): Promise<any> {
        try {
            const studio = await this.studioService.create(data, ctx.req.session.get('user'))
            
            return studio
        } catch (err) {
            throw err
        }
    }

    @Query(() => PaginatedStudios, { name: 'studios' })
    public async getStudios(@Args('paginationOptions') paginationOptions: PaginationOptions): Promise<any> {
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

}