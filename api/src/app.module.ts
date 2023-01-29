import { HttpException, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'
import { join } from 'path'

import { User } from './common/entities'
import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('db.host') || 'localhost',
                    port: configService.get('db.port') || 5432,
                    username: configService.get('db.user'),
                    password: configService.get('db.password'),
                    database: configService.get('db.database') || 'postgres',
                    entities: [
						User
					],
                    synchronize: true
                } as TypeOrmModuleAsyncOptions
            }
        }),
		ConfigModule.forRoot({
            isGlobal: true
        }),
		GraphQLModule.forRoot<MercuriusDriverConfig>({
			driver: MercuriusDriver,
			graphiql: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            subscription: true,
            errorFormatter: execution => {
                const [error] = execution.errors // take first error
                const originalError = error?.originalError
                if (originalError instanceof HttpException)
                    return {
                        statusCode: originalError.getStatus(),
                        response: { 
                            data: {
                                error: originalError.getResponse() as any
                            }
                        }
                    }
                    
                return { statusCode: 500, response: execution }
            }
		}),
        AuthModule,
		UserModule
	]
})
export class AppModule {}
