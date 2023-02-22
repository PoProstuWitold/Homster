import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Role } from '@prisma/client'

import { SessionGuard, Roles, RolesGuard } from '../common/guards'
import { Tag } from '../common/entities'
import { CreateTagInput } from '../common/dtos'
import { 
    OffsetPaginationOptions, 
    OffsetPaginatedTags 
} from '../common/types'
import { TagService } from './tags.service'

@Resolver(() => Tag)
export class TagResolver {
    constructor(
        private readonly tagService: TagService
    ) {}

    @Roles(Role['DEVELOPER'], Role['ADMIN'], Role['MOD'])
    @UseGuards(SessionGuard, RolesGuard)
    @Mutation(() => Tag)
    public async createTag(
        @Args('createTagInput') data: CreateTagInput
    ): Promise<any> {
        try {
            const tag = await this.tagService.create(data)
            
            return tag
        } catch (err) {
            throw err
        }
    }

    @Query(() => OffsetPaginatedTags, { name: 'tags' })
    public async getTags(@Args('paginationOptions') paginationOptions: OffsetPaginationOptions): Promise<OffsetPaginatedTags> {
        try {
            const { edges, pageInfo } = await this.tagService.findAll(paginationOptions)

            return {
                edges,
                pageInfo
            }
        } catch (err) {
            throw err
        }
    }

}