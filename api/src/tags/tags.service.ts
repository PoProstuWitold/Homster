import { Injectable } from '@nestjs/common'

import { OffsetPaginationOptions } from '../common/types'
import { CreateTagInput } from '../common/dtos'
import { isPrismaError } from '../common/utils'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class TagService {
    constructor(
        private prisma: PrismaService
    ) {}
    
    public async create(data: CreateTagInput) {
        try {
            const tag = await this.prisma.tag.create({ data })
            return tag
        } catch (err) {
            isPrismaError(err)
            throw err
        }
    }

    public async findAll(paginationOptions?: OffsetPaginationOptions) {
        try {
            const { take, skip, field, type } = paginationOptions
            const edges = await this.prisma.tag.findMany({
                orderBy: { 
                    [field]: type 
                },
                skip,
                take,
            })

            const totalCount = await this.prisma.tag.count()

            return {
                edges,
                pageInfo: {
                    currentPage: Math.floor(skip / take) + 1,
                    totalPages: Math.ceil(totalCount / take),
                    totalCount
                }
            }

        } catch (err) {
            
        }
    }
}