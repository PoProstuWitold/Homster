import { Module } from '@nestjs/common'

import { PrismaModule } from '../../database/prisma.module'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'
import { UploaderModule } from '../uploader/uploader.module'

@Module({
	imports: [PrismaModule, UploaderModule],
	providers: [UserResolver, UserService],
	exports: [UserService]
})
export class UserModule {}