import { Injectable } from '@nestjs/common'

import { isPrismaError } from '../common/utils'
import { OffsetPaginationOptions } from '../common/types'
import { CreateGenreInput } from '../common/dtos'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class GenreService {
    constructor(
        private prisma: PrismaService
    ) {}
    
    public async create(data: CreateGenreInput) {
        try {
            const genre = await this.prisma.genre.create({ data })
            return genre
        } catch (err) {
            isPrismaError(err)
            throw err
        }
    }

    public async findAll(paginationOptions?: OffsetPaginationOptions) {
        try {
            const { take, skip, field, type } = paginationOptions
            const edges = await this.prisma.genre.findMany({
                orderBy: { 
                    [field]: type 
                },
                skip,
                take,
            })

            const totalCount = await this.prisma.genre.count()

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