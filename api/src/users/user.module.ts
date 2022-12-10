import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from '../common/entities'

import { UserResolver } from './user.resolver'
import { UserService } from './user.service'


@Module({
	imports: [
		TypeOrmModule.forFeature([User])
	],
	providers: [UserResolver, UserService]
})
export class UserModule {}