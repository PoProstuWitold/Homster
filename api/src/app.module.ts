import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'


import { UserModule } from './users/user.module'


@Module({
	imports: [
		ConfigModule.forRoot({
            isGlobal: true
        }),
		GraphQLModule.forRoot<MercuriusDriverConfig>({
			driver: MercuriusDriver,
			graphiql: true,
			autoSchemaFile: true,
			sortSchema: true,
		}),
		UserModule
	],
	providers: [AppService]
})
export class AppModule {}
