import { Module } from '@nestjs/common'

import { PrismaModule } from '../../database/prisma.module'
import { StudioResolver } from './studio.resolver'
import { StudioService } from './studio.service'

@Module({
	imports: [PrismaModule],
	providers: [StudioResolver, StudioService]
})
export class StudioModule {}