import { Module } from '@nestjs/common'

import { PrismaModule } from '../../database/prisma.module'
import { GameResolver } from './games.resolver'
import { GameService } from './games.service'

@Module({
	imports: [PrismaModule],
	providers: [GameResolver, GameService]
})
export class GamesModule {}