import { Injectable, NotFoundException } from '@nestjs/common'
import { GameStudio, StudioType } from '@prisma/client'

import { PrismaService } from '../../database/prisma.service'
import { CreateGameInput } from '../common/dtos'
import { PaginationOptions } from '../common/types'
import { isUniqueError } from '../common/utils'

@Injectable()
export class GameService {
    constructor(
        private prisma: PrismaService
    ) {}
    
    public async create(data: CreateGameInput) {
        try {
            const {
                name, description, status, type, releasedAt,
                developers, publishers
            } = data

            const studios = [...developers, ...publishers]
            const devs = []
            const publ = []
            const devsAndPubl = []

            for(const studio of studios) {
                const result = await this.prisma.studio.findUnique({
                    where: {
                        name: studio
                    },
                })

                if(!result) {
                    throw new NotFoundException(`Studio with name ${studio} not found`)
                }
 
                if(result) {
                    if(developers.includes(result.name) && !publishers.includes(result.name)) {
                        console.log(`Studio ${result.name} is developer of this game`)
                        devs.push({
                            contribution: StudioType['Developer'],
                            studioId: result.id
                        })
                    }

                    if(!developers.includes(result.name) && publishers.includes(result.name)) {
                        console.log(`Studio ${result.name} is publisher of this game`)
                        publ.push({
                            contribution: StudioType['Publisher'],
                            studioId: result.id
                        })
                    }

                    if(developers.includes(result.name) && publishers.includes(result.name)) {
                        console.log(`Studio ${result.name} is developer & publisher of this game`)
                        devsAndPubl.push({
                            contribution: StudioType['DeveloperAndPublisher'],
                            studioId: result.id
                        })
                    }
                }
            }

            const allStudios = [...devs, ...publ, ...devsAndPubl]

            const game = await this.prisma.game.create({
                data: {
                    name, description, status, type, releasedAt,
                    // basicPrice,
                }
            })

            const updatedStudios: GameStudio[] = allStudios.map((studio) => ({
                ...studio,
                gameId: game.id,
            }))

            await this.prisma.gameStudio.createMany({
                skipDuplicates: true,
                data: updatedStudios
            })

            const result = await this.prisma.game.findUnique({
                where: {
                    id: game.id
                }
            })

            return result
        } catch (err) {
            isUniqueError(err)
            throw err
        }
    }

    public async findAll(paginationOptions?: PaginationOptions) {
        try {
            const { take, cursor, field, type } = paginationOptions
            const edges = await this.prisma.game.findMany({
                take,
                orderBy: {
                    [field]: type
                },
                ...(cursor && {
                    skip: 1, // Do not include the cursor itself in the query result.
                    cursor: {
                      id: cursor,
                    }
                }),
                include: {
                    studios: {
                        include: {
                            studio: true
                        }
                    },
                    tags: true,
                    users: true
                }
            })
            
            const hasNext = edges.length === take
            const hasPrevious = Boolean(cursor)
            const nextCursor = hasNext ? edges[edges.length -1].id : ''
            const previousCursor = ''
            const pageInfo = {
                hasNext,
                hasPrevious,
                nextCursor,
                previousCursor
            }
            return {
                edges,
                pageInfo
            }
        } catch (err) {
            throw err
        }
    }
}