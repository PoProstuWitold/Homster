import { Injectable } from '@nestjs/common'

import { CursorPaginationOptions } from '../common/types'
import { CreateStudioInput } from '../common/dtos'
import { isPrismaError } from '../common/utils'
import { GetStudioArgs, Studio, User } from '../common/entities'
import { PrismaService } from '../../database/prisma.service'

@Injectable()
export class StudioService {
    constructor(
        private prisma: PrismaService
    ) {}
    
    public async create(data: CreateStudioInput, user: User) {
        try {
            const { name, type } = data

            const studio = await this.prisma.studio.create({ 
                data: {
                    name,
                    avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${data.name}`,
                    cover: `https://random.imagecdn.app/820/360`,
                    type
                }
            })

            if(data.makeOwner) {
                await this.prisma.studioEmployee.create({
                    data: {
                        studio: {
                            connect: {
                                id: studio.id
                            }
                        },
                        employee: {
                            connect: {
                                id: user.id
                            }
                        },
                        employmentType: 'Owner',
                        assignedBy: user.id,
                        assignedAt: new Date()
                    }
                })
            }

            const result = await this.prisma.studio.findUnique({
                where: {
                    id: studio.id
                },
                include: {
                    employees: {
                        select: {
                            assignedAt: true,
                            assignedBy: true,
                            employee: {
                                include: {
                                    employments: {
                                        include: {
                                            employee: true,
                                            studio: true
                                        }
                                    }
                                }
                            },
                            employeeId: true,
                            employmentType: true,
                            studio: true,
                            studioId: true
                        }
                    },
                    games: true
                }
            })
            
            return result
        } catch (err) {
            isPrismaError(err)
            throw err
        }
    }

    public async findAll(paginationOptions?: CursorPaginationOptions) {
        try {
            const { take, cursor, field, type } = paginationOptions
            const edges = await this.prisma.studio.findMany({
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
                    employees: {
                        select: {
                            assignedAt: true,
                            assignedBy: true,
                            employee: {
                                include: {
                                    employments: true
                                }
                            },
                            employeeId: true,
                            employmentType: true,
                            studio: true,
                            studioId: true
                        }
                    },
                    games: {
                        include: {
                            game: {
                                include: {
                                    studios: {
                                        include: {
                                            studio: true
                                        }
                                    }
                                }
                            },
                            studio: true
                        }
                    },
                    _count: {
                        select: {
                            employees: true,
                            games: true
                        }
                    }
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

    public async findOne(data: GetStudioArgs): Promise<Studio> {
        try {
            const studio = await this.prisma.studio.findUniqueOrThrow({
                where: {
                    name: data.name
                },
                include: {
                    _count: {
                        select: {
                            employees: true,
                            games: true
                        }
                    },
                    employees: {
                        include: {
                            employee: true
                        }
                    },
                    games: {
                        include: {
                            game: true
                        }
                    }
                }
            })

            return studio
        } catch (err) {
            throw err
        }
    }
}