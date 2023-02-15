import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma  = new PrismaClient()

const fakerUser = (): any => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.name.fullName(),
    displayName: faker.internet.userName()
})
    
async function main() {
    const fakerRounds = 40
    console.log('Seeding...')
    /// --------- Users ---------------
    for (let i = 0; i < fakerRounds; i++) {
        await prisma.user.create({ data: fakerUser() })
    }
}
    
      
    
main()
    .catch((e) => console.error(e))
    .finally(async () => {
        console.log('Seed succed. Disconnecting database...')
        await prisma.$disconnect()
        console.log('Database disconnected')
    })