import { Module } from '@nestjs/common'

import { PrismaModule } from '../../database/prisma.module'
import { GenreResolver } from './genres.resolver'
import { GenreService } from './genres.service'

@Module({
	imports: [PrismaModule],
	providers: [GenreResolver, GenreService]
})
export class GenreModule {}