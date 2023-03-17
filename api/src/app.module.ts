import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { GraphQLError, GraphQLFormattedError } from 'graphql'
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
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            buildSchemaOptions: {
                dateScalarMode: 'isoDate'
            },
            autoTransformHttpErrors: false,
            includeStacktraceInErrorResponses: false,
            formatError: (error: GraphQLError) => {
                const graphQLFormattedError: GraphQLFormattedError = {
                    //@ts-ignore
                    message: error.extensions?.message || error.message || 'Internal server error',
                    statusCode: error.extensions?.statusCode || error.extensions.code || 500,
                    errors: error.extensions?.errors || {}
                };
                return graphQLFormattedError;
            },
            introspection: true,
            playground: true,
            csrfPrevention: false
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
