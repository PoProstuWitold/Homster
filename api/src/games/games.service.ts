import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { GameStudio, StudioType } from '@prisma/client'
import { isUUID } from 'class-validator'

import { PrismaService } from '../../database/prisma.service'
import { AssignOrRevokeToGameInput, CreateGameInput } from '../common/dtos'
import { PaginationOptions } from '../common/types'
import { isPrismaError } from '../common/utils'

@Injectable()
export class GameService {
    constructor(
        private prisma: PrismaService
    ) {}
    
    public async create(data: CreateGameInput) {
        try {
            let {
                name, description, status, type, releasedAt, basicPrice,
                developers, publishers,
                tags, genres
            } = data

            const [dbTags, dbGenres] = await this.checkIfAssigmentsExist(tags, genres)
            const allStudios = await this.checkIfStudiosExist(developers, publishers)

            const game = await this.prisma.game.create({
                data: {
                    name, description, status, type, releasedAt,
                    ...(basicPrice && {
                        basicPrice,
                        price: basicPrice
                    }),
                    ...(tags && {
                        tags: {
                            connect: dbTags
                        }
                    }),
                    ...(genres && {
                        genres: {
                            connect: dbGenres
                        }
                    }),
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
                },
                include: {
                    studios: {
                        include: {
                            studio: true
                        }
                    },
                    tags: true,
                    genres: true
                }
            })

            return result
        } catch (err) {
            isPrismaError(err)
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
                    genres: true,
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

    public async assignOrRevoke(data: AssignOrRevokeToGameInput) {
        try {
            let {
                activity, game, genres, tags
            } = data

            if((!genres || !genres.length) && (!tags || !tags.length)) {
                throw new BadRequestException('No tags & genres provided!')
            }

            const isUuid = isUUID(game)
            const [dbTags, dbGenres] = await this.checkIfAssigmentsExist(tags, genres)

            const gameDb = await this.prisma.game.update({
                where: {
                    ...(isUuid && {
                        id: game
                    }),
                    ...(!isUuid && {
                        name: game
                    }),
                },
                data: {
                    ...(dbTags && activity === 'assign' && {
                        tags: {
                            connect: dbTags
                        }
                    }),
                    ...(dbGenres && activity === 'assign' && {
                        genres: {
                            connect: dbGenres
                        }
                    }),
                    ...(dbTags && activity === 'revoke' && {
                        tags: {
                            disconnect: dbTags
                        }
                    }),
                    ...(dbGenres && activity === 'revoke' && {
                        genres: {
                            disconnect: dbGenres
                        }
                    }),
                },
                include: {
                    tags: true,
                    genres: true,
                    studios: {
                        include: {
                            studio: true
                        }
                    }
                }
            })

            return gameDb
        } catch (err) {
            isPrismaError(err)
            throw err
        }
    }

    private async checkIfStudiosExist(developers, publishers) {
        try {
            const studios = [...developers, ...publishers]
            const devs = []
            const publ = []
            const devsAndPubl = []
            console.log(studios)
            for(const studio of studios) {
                console.log(studio)
                const result = await this.prisma.studio.findUnique({
                    where: {
                        name: studio
                    },
                })

                if(!result) {
                    throw new NotFoundException(`Studio with name '${studio}' not found`)
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

            return allStudios
        } catch (err) {
            throw err
        }
    }

    private async checkIfAssigmentsExist(tags: string[], genres: string[]) {
        try {
            const dbTags = []
            const dbGenres = []

            if(tags) {
                for(const tag of tags) {
                    const result = await this.prisma.tag.findUnique({
                        where: {
                            name: tag
                        }
                    })

                    if(!result) {
                        throw new NotFoundException(`Tag with name '${tag}' not found`)
                    }

                    dbTags.push({ name: result.name })
                }
            }

            if(genres) {
                for(const genre of genres) {
                    const result = await this.prisma.genre.findUnique({
                        where: {
                            name: genre
                        }
                    })

                    if(!result) {
                        throw new NotFoundException(`Genre with name '${genre}' not found`)
                    }

                    dbGenres.push({ name: result.name })
                }
            }

            return [
                dbTags,
                dbGenres
            ]
        } catch (err) {
            throw err
        }
    }
}