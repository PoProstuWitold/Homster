import { HttpException, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius'
import { join } from 'path'

import { UserModule } from './users/user.module'
import { AuthModule } from './auth/auth.module'
import { StudioModule } from './studio/studio.module'
import { GamesModule } from './games/games.module'
import { TagModule } from './tags/tags.module'
import { GenreModule } from './genres/genres.module'
import { UploaderModule } from './uploader/uploader.module'

@Module({
	imports: [
		ConfigModule.forRoot({
            isGlobal: true
        }),
		GraphQLModule.forRoot<MercuriusDriverConfig>({
			driver: MercuriusDriver,
			graphiql: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            subscription: true,
            buildSchemaOptions: {
                dateScalarMode: 'isoDate'
            },
            errorFormatter: execution => {
                const [error] = execution.errors
                const originalError = error?.originalError
                if (originalError instanceof HttpException) {
                    return {
                        statusCode: originalError.getStatus(),
                        response: {
                            data: {
                                error: originalError.getResponse() as any
                            }
                        }
                    }
                }         
                    
                return { statusCode: 500, response: execution }
            }
		}),
        AuthModule,
		UserModule,
        StudioModule,
        GamesModule,
        TagModule,
        GenreModule,
        UploaderModule
	]
})
export class AppModule {}
