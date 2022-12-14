import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '../users/user.module'

import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'


@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
					secret: configService.get<string>('jwt.access_secret'),
        			signOptions: { 
						expiresIn: '30m',
						issuer: 'PollubDSC'
					},
				}
            }
		}),
        UserModule
	],
	providers: [AuthResolver, AuthService]
})
export class AuthModule {}