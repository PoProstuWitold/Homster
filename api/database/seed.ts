import { EmploymentType, GameMedia, GameStatus, GameType, Genre, PrismaClient, Role, Studio, StudioType, Tag, User } from '@prisma/client'
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

const covers = [
    'cover1.png',
    'cover2.jpg',
    'cover3.jpg',
    'cover4.jpg',
]

const media = [
    'media1.png',
    'media2.png',
    'media3.jpg',
    'media4.jpg'
]

interface FakeUserData {
    role?: Role,
    email?: string,
    password?: string,
    fullName?: string,
    displayName?: string
}

const fakerUser = (data?: FakeUserData): any => {
    let displayName = data?.displayName || faker.internet.userName()
    
    return {
        email: data?.email || faker.internet.email(),
        password: data?.password || faker.internet.password(),
        fullName: data?.fullName || faker.person.fullName(),
        displayName,
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${displayName}`,
        cover: `http://localhost:4000/public/images/covers/user-banner.jpg`,
        role: data?.role || Role['USER']
    }
}

const fakerGame = () => {
    const { basicPrice, price } = Seeder.getRandomPrices(100)

    const status = Seeder.getRandomType<GameStatus>(GameStatus)
    let releaseDate: Date
    if(status !== GameStatus['Released']) {
        releaseDate = new Date(Seeder.getRandomDate('2023-03-10', '2023-12-31'))
    } else {
        releaseDate = new Date(Seeder.getRandomDate('2011-01-01', '2023-12-31'))
    }

    return {
        name: faker.lorem.words(3),
        description: faker.lorem.words(40),
        basicPrice,
        price,
        status,
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        type: Seeder.getRandomType<GameType>(GameType),
        releaseDate,
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
    {
        name: 'Simulation',
        description: 'Emulate real-world activities or systems, such as driving, flying, or city-building'
    },
    {
        name: 'Sports',
        description: 'Compete in athletic events, such as football, basketball, or tennis'
    },
    {
        name: 'Racing',
        description: 'Compete in high-speed races, either on land, water, or air'
    },
    {
        name: 'Fighting',
        description: 'Engage in one-on-one battles, either in real-time or turn-based'
    },
    {
        name: 'Platformer',
        description: 'Jump and run through a series of obstacles and challenges'
    },
    {
        name: 'FPS',
        description: 'Engage in combat using ranged weapons, either in first-person or third-person perspective'
    },
    {
        name: 'Survival',
        description: 'Stay alive in a hostile environment, often with limited resources'
    },
    {
        name: 'Puzzle',
        description: 'Solve logical or spatial challenges, such as jigsaw puzzles or Sudoku'
    },
    {
        name: 'Educational',
        description: 'Teach players about a particular subject or skill, such as math, history, or language'
    },
    {
        name: 'Party',
        description: 'Play with a group of friends or family, often involving mini-games and social activities'
    },
    {
        name: 'Music',
        description: 'Create and play music using a variety of instruments and styles'
    },
    {
        name: 'VR',
        description: 'Immerse yourself in a fully-realized virtual environment using a VR headset'
    },
    {
        name: 'Artistic',
        description: 'Express your creativity through digital art or design'
    },
    {
        name: 'MOBA',
        description: 'Compete in team-based battles, often with a focus on strategy and teamwork'
    },
    {
        name: 'MMO',
        description: 'Play with massive communities in huge virtual worlds'
    },
    {
        name: 'Open World',
        description: 'A game world that allows the player to explore without restrictions, often with non-linear gameplay'
    },
    {
        name: 'Sandbox',
        description: 'A game world that allows players to manipulate and create objects, often with a focus on player-driven content'
    },
    {
        name: 'RTS',
        description: 'Real Time Strategy! Make strategic decisions in real-time, often with a focus on resource management and base-building'
    },
    {
        name: 'Tower Defense',
        description: 'Build defenses to protect against waves of enemies, often using tower structures'
    },
    {
        name: 'Dating Sim',
        description: 'A genre focused on building relationships and romantic pursuits'
    },
    {
        name: 'Rogue-like',
        description: 'A subgenre of RPGs with procedurally generated levels, permadeath, and randomized loot'
    },
    {
        name: 'City Simulation',
        description: 'Manage the resources and development of a city, often with a focus on economic management and growth'
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
    {
        name: 'Multiplayer',
        description: 'Play with other people, often competitively or cooperatively'
    },
    {
        name: 'Platformer',
        description: 'Jump and run through levels, often with a focus on precision and timing'
    },
    {
        name: 'Puzzle',
        description: 'Solve challenges, often with a focus on logic, spatial reasoning, or creativity'
    },
    {
        name: 'SCI-FUN',
        description: 'Explore imaginary or futuristic worlds, often with a focus on technology and space exploration'
    },
    {
        name: 'Fantasy',
        description: 'Explore mythical or magical worlds, often with a focus on creatures, spells, and enchanted objects'
    },
    {
        name: 'Historical',
        description: 'Explore real or fictionalized historical periods, often with a focus on accuracy and immersion'
    },
    {
        name: 'Turn-Based',
        description: 'Take turns making decisions or moves, often with a focus on strategy and planning'
    },
    {
        name: 'Tactical',
        description: 'Make strategic decisions in combat or other scenarios, often with a focus on positioning and resource management'
    },
    {
        name: 'Adventure',
        description: 'Explore worlds and solve puzzles, often with a focus on storytelling and immersive environments'
    },
    {
        name: 'Comedy',
        description: 'Use humor to entertain and engage players, often with a focus on parody and satire'
    },
    {
        name: 'Fantasy RPG',
        description: 'Assume the roles of characters in a fantasy world and engage in narrative-driven gameplay with RPG mechanics'
    },
    {
        name: 'Historical RPG',
        description: 'Assume the roles of characters in a historical period and engage in narrative-driven gameplay with RPG mechanics'
    },
    {
        name: 'Stealth',
        description: 'Avoid detection and complete objectives without being seen'
    },
    {
        name: 'First Person',
        description: 'See the world from the perspective of your character, often with a focus on immersion and realism'
    },
]

const userSeed = [
    fakerUser({
        email: 'witold@email.com',
        password: 'password123',
        fullName: 'Witold Zawada',
        displayName: 'PoProstuWitold',
        role: Role['ADMIN'],
    }),
    fakerUser({
        email: 'john@email.com',
        password: 'password321',
        fullName: 'John Doe',
        displayName: 'JohnDoe1337',
        role: Role['MOD'],
    }),
    fakerUser({
        email: 'pawel@gmail.com',
        password: 'keyboardcat',
        fullName: 'Pawel Kovalsky',
        displayName: 'Koval',
        role: Role['DEVELOPER'],
    }),
    fakerUser({
        email: 'chomcio@gmail.com',
        password: 'chomcio123',
        fullName: 'Chomcio Homster',
        displayName: 'Chomciasta',
        role: Role['DEVELOPER'],
    }),
    fakerUser({
        role: Role['DEVELOPER']
    }),
    fakerUser({
        role: Role['DEVELOPER']
    }),,
    fakerUser({
        role: Role['DEVELOPER']
    }),,
    fakerUser({
        role: Role['DEVELOPER']
    }),,
    fakerUser({
        role: Role['DEVELOPER']
    }),,
    fakerUser({
        role: Role['DEVELOPER']
    }),,
    fakerUser({
        role: Role['DEVELOPER']
    }),
]

for(let i = 0; i < 50; i++) {
    userSeed.push(fakerUser())
}

interface FakerStudioData {
    name: string,
    type: StudioType,
}

const fakerStudio = (data?: FakerStudioData): any => {
    const {
        name,
        type
    } = data
    return {
        name,
        type,
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${data.name}`,
        cover: `http://localhost:4000/public/images/covers/studio-banner.jpg`,
    }
}

const studioSeed = [
    fakerStudio({
        name: 'Chomciex',
        type: StudioType['DeveloperAndPublisher'],
    }),
    fakerStudio({
        name: 'Witq Games',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Potato Projekt',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Vishapia',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Wooden Spear',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Wendia',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Pixel Playground',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Digital Dreamland',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Cosmic Crusaders',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Cosmic Crusaders',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Code Kingdom',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Retro Rocket',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Wildcard Workshop',
        type: StudioType['DeveloperAndPublisher']
    }),
    fakerStudio({
        name: 'Elemental Empires Entertainment',
        type: StudioType['DeveloperAndPublisher']
    })
]

const gameSeed = [
    {
        name: 'Rex Tremendae',
        description: `Story about paladin that once was given a quest to visit the infamous City of the Dead to remove the curse and give city back to the living.`,
        basicPrice: 15,
        price: 0,
        status: GameStatus['EarlyAccess'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2023-12-20'),
        adultOnly: true
    },
    {
        name: 'Homsterix',
        description: `Adventures of little hamster named Natalka in this cruel world`,
        basicPrice: 0,
        price: 0,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2023-02-07'),
    },
    {
        name: 'Homsterix 2',
        description: `Amazing continuation of hamster Natalka adventures!`,
        basicPrice: 7,
        price: 5,
        status: GameStatus['NotReleased'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2023-04-26'),
    },
    {
        name: 'Galactic Quest',
        description: 'Travel through space to complete a series of challenging missions and save the galaxy',
        basicPrice: 15,
        price: 10,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2022-11-01'),
    },
    {
        name: 'Sands of Time',
        description: 'Explore ancient ruins and uncover the secrets of a lost civilization',
        basicPrice: 25,
        price: 25,
        status: GameStatus['Beta'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2023-07-15'),
    },
    {
        name: 'Escape from Atlantis',
        description: 'Survive the sinking island of Atlantis by gathering resources and building a raft',
        basicPrice: 20,
        price: 20,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2022-06-12'),
    },
    {
        name: 'Cyber City',
        description: 'Infiltrate a high-tech city to uncover a dangerous conspiracy',
        basicPrice: 30,
        price: 25,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2022-09-20'),
    },
    {
        name: 'Dragonfire',
        description: 'Train and ride a dragon to become the ultimate dragon rider and save the kingdom',
        basicPrice: 40,
        price: 40,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2021-12-08'),
    },
    {
        name: 'Survivor Island',
        description: 'Stranded on an island, gather resources and build shelter to survive and escape',
        basicPrice: 15,
        price: 10,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2022-04-23'),
    },
    {
        name: 'Superhero Academy',
        description: 'Attend a school for superheroes and train your powers to save the world',
        basicPrice: 50,
        price: 50,
        status: GameStatus['EarlyAccess'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2023-09-01'),
    },
    {
        name: 'Mythical Quests',
        description: 'Embark on epic quests to find mythical artifacts and defeat legendary creatures',
        basicPrice: 30,
        price: 30,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2022-02-28'),
    },
    {
        name: 'Underwater Adventures',
        description: 'Explore the depths of the ocean to discover ancient ruins and hidden treasures',
        basicPrice: 20,
        price: 20,
        status: GameStatus['Released'],
        type: GameType['Game'],
        coverImage: `http://localhost:4000/public/images/covers/${Seeder.getRandomRecords(covers, 1)}`,
        releaseDate: new Date('2022-01-15'),
    },
    fakerGame()
]

for(let i = 0; i < 100; i++) {
    gameSeed.push(fakerGame())
}


const fakerGameMedia = () => {
    return {
        name: faker.lorem.words(5),
        description: faker.lorem.words(12),
        url: `http://localhost:4000/public/images/media/${Seeder.getRandomRecords<string>(media, 1)}`,
        type: 'Image',
    }
}

const gameMediaSeed = [
    fakerGameMedia()
]

for(let i = 0; i<50; i++) {
    gameMediaSeed.push(fakerGameMedia())
}

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

        console.log('Seeding game medias...')
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
                
                const randomGameMedia = Seeder.getRandomRecords<GameMedia>(gameMediaSeed, 4).map((gameMedia) => ({
                    id: gameMedia.id,
                    name: gameMedia.name,
                    description: gameMedia.description,
                    url: gameMedia.url,
                    type: gameMedia.type,
                    gameId: game.id,
                }))

                await tx.gameMedia.createMany({
                    data: randomGameMedia,
                    skipDuplicates: false
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