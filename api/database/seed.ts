import { EmploymentType, GameStatus, GameType, Genre, PrismaClient, Role, Studio, StudioType, Tag, User } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'

const prisma  = new PrismaClient()

class Seeder {
    constructor() {}

    public static getRandomRecords<T>(array: any[], count: number): T[] {
        const shuffled = array.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }

    public static getRandomType<T>(values: { [key: string]: T }): T {
        const types = Object.values(values)
        const randomIndex = Math.floor(Math.random() * types.length)
        return types[randomIndex]
    }

    public static getRandomDate(startDate: string, endDate: string) {
        const start = new Date(startDate).getTime()
        const end = new Date(endDate).getTime()
        const randomTime = start + Math.random() * (end - start)
        const randomDate = new Date(randomTime)
        return randomDate.toISOString().split('T')[0]
    }

    public static getRandomPrices(maxPrice: number) {
        const minPrice = 0
        const probability = Math.random()
        let basicPrice = 0
        let price = 0

        // 30% probability for both prices to be 0
        if (probability < 0.3) {
            basicPrice = minPrice
            price = minPrice
        } else {
            // 50% probability for both prices to be equal
            if (probability < 0.8) {
                basicPrice = this.getRandomPrice(minPrice, maxPrice)
                price = basicPrice
            } else {
                // 20% probability for price to be lower than basic price
                basicPrice = this.getRandomPrice(minPrice, maxPrice)
                price = this.getRandomPrice(minPrice, basicPrice)
            }
        }

        return { basicPrice: this.roundPrice(basicPrice), price: this.roundPrice(price) }
    }

    private static getRandomPrice(minPrice: number, maxPrice: number) {
        return minPrice + Math.random() * (maxPrice - minPrice);
    }

    private static roundPrice(price) {
        return Math.round(price * 100) / 100;
    }

    public static getRandomBoolean() {
        return Math.random() < 0.8 ? false : true
    }
}

const fakerUser = (role?: Role): any => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.name.fullName(),
    displayName: faker.internet.userName(),
    role
})

const fakerGame = () => {
    const { basicPrice, price } = Seeder.getRandomPrices(50)

    const status = Seeder.getRandomType<GameStatus>(GameStatus)
    let releasedAt: Date
    if(status !== GameStatus['Released']) {
        releasedAt = new Date(Seeder.getRandomDate('2023-03-10', '2023-12-31'))
    } else {
        releasedAt = new Date(Seeder.getRandomDate('2011-01-01', '2023-12-31'))
    }

    return {
        name: faker.random.words(3),
        description: faker.random.words(40),
        basicPrice,
        price,
        status,
        type: Seeder.getRandomType<GameType>(GameType),
        releasedAt,
        adultOnly: Seeder.getRandomBoolean()
    }
}


const genreSeed = [
    {
        name: 'Action',
        description: 'Physical challenges, often involving combat or exploration'
    },
    {
        name: 'Adventure',
        description: 'Story, exploration, and puzzle-solving'
    },
    {
        name: 'Strategy',
        description: 'Make strategic decisions, often in real-time, with the goal of outmaneuvering opponents'
    },
    {
        name: 'Role-playing',
        description: 'Assume the roles of fictional characters and engage in narrative-driven gameplay'
    },
    {
        name: 'Horror',
        description: 'Evoke fear and suspense through atmospheric design, puzzles, and narrative'
    },
    {
        name: 'Fantasy',
        description: 'Meet mythical creatures, world full of magic and unimaginable places'
    },
]

const tagSeed = [
    {
        name: 'Story rich',
        description: 'Narrative and storytelling, often with complex characters and multiple endings'
    },
    {
        name: 'Survival',
        description: 'Manage limited resources and survive in a hostile environment'
    },
    {
        name: 'Open world',
        description: 'Explore huge world with no barries'
    },
    {
        name: 'Anime',
        description: 'Play as your favorite characters in anime-like style'
    },
    {
        name: 'Third person',
        description: 'See the world from behind of your character'
    },
]

const userSeed = [
    {
        email: 'witold@email.com',
        password: 'password123',
        fullName: 'Witold Zawada',
        displayName: 'PoProstuWitold',
        role: Role['ADMIN'],
    },
    {
        email: 'john@email.com',
        password: 'password321',
        fullName: 'John Doe',
        displayName: 'JohnDoe1337',
        role: Role['MOD'],
    },
    {
        email: 'pawel@gmail.com',
        password: 'keyboardcat',
        fullName: 'Pawel Kovalsky',
        displayName: 'Koval',
        role: Role['DEVELOPER'],
    },
    {
        email: 'chomcio@gmail.com',
        password: 'chomcio123',
        fullName: 'Chomcio Homster',
        displayName: 'Chomciasta',
        role: Role['DEVELOPER'],
    },
    fakerUser(Role['DEVELOPER']),
    fakerUser(Role['DEVELOPER']),
    fakerUser(Role['DEVELOPER']),
    fakerUser(Role['DEVELOPER']),
    fakerUser(Role['DEVELOPER']),
    fakerUser(Role['DEVELOPER']),
    fakerUser(Role['DEVELOPER']),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
    fakerUser(),
]

const studioSeed = [
    {
        name: 'Chomciex',
        type: StudioType['DeveloperAndPublisher']
    },
    {
        name: 'Witq Games',
        type: StudioType['DeveloperAndPublisher']
    },
    {
        name: 'Potato Projekt',
        type: StudioType['DeveloperAndPublisher']
    },
    {
        name: 'Vishapia',
        type: StudioType['Developer']
    },
    {
        name: 'Wooden Spear',
        type: StudioType['Publisher']
    },
]

const gameSeed = [
    {
        name: 'Rex Tremendae',
        description: `Story about paladin that once was given a quest to visit the infamous City of the Dead to remove the curse and give city back to the living.`,
        basicPrice: 15,
        price: 0,
        status: GameStatus['EarlyAccess'],
        type: GameType['Game'],
        releasedAt: new Date('2023-12-20'),
        adultOnly: true
    },
    {
        name: 'Homsterix',
        description: `Adventures of little hamster named Natalka in this cruel world`,
        basicPrice: 0,
        price: 0,
        status: GameStatus['Released'],
        type: GameType['Game'],
        releasedAt: new Date('2023-02-07'),
    },
    {
        name: 'Homsterix 2',
        description: `Amazing continuation of hamster Natalka adventures!`,
        basicPrice: 7,
        price: 5,
        status: GameStatus['NotReleased'],
        type: GameType['Game'],
        releasedAt: new Date('2023-04-26'),
    },
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
    fakerGame(),
]

async function main() {
    await prisma.$transaction(async (tx) => {
        // Tags
        console.log('Seeding Tags...')
        await tx.tag.createMany({
            skipDuplicates: true,
            data: tagSeed
        })
        const tags = await tx.tag.findMany()
        
        // Genres
        console.log('Seeding Genres...')
        await tx.genre.createMany({
            skipDuplicates: true,
            data: genreSeed
        })
        const genres = await tx.genre.findMany()

        // Users
        const userSeedHash = await Promise.all(userSeed.map(async(user)=> ({
            ...user,
            password: await hash(user.password)
        })))

        console.log('Seeding Users...')
        await tx.user.createMany({
            data: userSeedHash,
            skipDuplicates: true
        })

        // Only higher roles 
        const users = await tx.user.findMany({
            where: {
                OR: [
                    {
                        role: Role['ADMIN']
                    },
                    {
                        role: Role['DEVELOPER']
                    },
                    {
                        role: Role['MOD']
                    },
                ]
            }
        })

        // Studios
        console.log('Seeding Studios...')
        await tx.studio.createMany({
            data: studioSeed,
            skipDuplicates: true
        })
        const studios = await tx.studio.findMany()

        console.log('Seeding Studio Employees...')
        for(const studio of studios) {
            const randomDevs = Seeder.getRandomRecords<User>(users, 4)

            const studioEmployees: any[] = randomDevs.map((dev) => ({
                studioId: studio.id,
                employeeId: dev.id,
                assignedBy: dev.id,
                employmentType: Seeder.getRandomType<EmploymentType>(EmploymentType)
            }))

            await tx.studioEmployee.createMany({
                skipDuplicates: true,
                data: studioEmployees
            })
        }

        console.log('Seeding Games...')
        const gamesDb = await prisma.game.findMany()

        for(const gameData of gameSeed) {
            const gameExists = gamesDb.some(game => game.name === gameData.name)
            if(!gameExists) {
                const randomTags = Seeder.getRandomRecords<Tag>(tags, 5).map((randomTag) => ({
                    id: randomTag.id
                }))
    
                const randomGenres = Seeder.getRandomRecords<Genre>(genres, 3).map((randomGenre) => ({
                    id: randomGenre.id
                }))
    
                const game = await tx.game.create({
                    data:  {
                        ...gameData,
                        genres: {
                            connect: randomGenres
                        },
                        tags: {
                            connect: randomTags
                        }
                    }
                })
    
                const randomStudios = Seeder.getRandomRecords<Studio>(studios, 3).map((studio) => ({
                    studioId: studio.id,
                    gameId: game.id,
                    contribution: Seeder.getRandomType<StudioType>(StudioType)
                }))
    
                await tx.gameStudio.createMany({
                    skipDuplicates: true,
                    data: randomStudios
                })
            }
        }
    })
}
      
    
main()
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        console.log('Database disconnected')
        process.exit(1)
    })
    .finally(async () => {
        console.log('Seed succed. Disconnecting database...')
        await prisma.$disconnect()
        console.log('Database disconnected')
        process.exit()
    })