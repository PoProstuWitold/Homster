import { Module } from '@nestjs/common'

import { PrismaModule } from '../../database/prisma.module'
import { TagResolver } from './tags.resolver'
import { TagService } from './tags.service'

@Module({
	imports: [PrismaModule],
	providers: [TagResolver, TagService]
})
export class TagModule {}