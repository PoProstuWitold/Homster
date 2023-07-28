import { join } from 'path'
import { NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserInputError } from '@nestjs/apollo'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import { ValidationError } from 'class-validator'
import { AppModule } from './app.module'
import { graphqlUploadExpress } from 'graphql-upload-minimal'


import 'express-session'
import { Profile } from './common/entities'
declare module 'express-session' {
	interface SessionData {
		user: Profile
	}
}

export async function bootstrap(): Promise<NestExpressApplication> {
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule,
		new ExpressAdapter()
	)
	
	const configService = app.get<ConfigService>(ConfigService)
    const reflector = app.get(Reflector)

    const productionDomain = configService.get('web.production_origin')

    const keys = {
        key1: configService.get('session.key1'),
        key2: configService.get('session.key2')
    }

    const { key1, key2 } = keys

    // GLOBAL MIDDLEWARES
    app.enableCors({
        credentials: true,
        origin: [
			configService.get('web.origin'),
            configService.get('NODE_ENV') === 'development' ? 'http://localhost:3000' : productionDomain
		],
        optionsSuccessStatus: 200,
		methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE']
    })

    const path = join(process.cwd(), 'public')
	app.useStaticAssets(path, {
		prefix: '/public/',
		
	})

	app.use(cookieParser(
		configService.get('cookie.secret')
	))
    
    app.use(helmet({
		crossOriginEmbedderPolicy: false,
		contentSecurityPolicy: {
			directives: {
				imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
				scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
				manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
				frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
			},
		},
	}))

	app.use(
		session({
			secret: [
				Buffer.from(key1, 'hex').toString(),
            	Buffer.from(key2, 'hex').toString()
			],
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: configService.get('NODE_ENV') === 'production' ? true : false,
				httpOnly: true,
				sameSite: 'lax',
            	path: '/',
			},
			name: 'homster-session'
		})
	)

	app.use(graphqlUploadExpress({
		maxFiles: 10
	}))

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            stopAtFirstError: false,
            exceptionFactory: (errors: ValidationError[]) => {
                const result = {}

                errors.forEach(error => {
                    const constraints = Object.values(error.constraints)
                    result[error.property] = constraints[0]
                })

                throw new UserInputError('VALIDATION_ERROR', {
                    extensions: {
                        statusCode: 400,
                        message: 'Input data validation failed',
                        errors: result,
                    }
                })
            }
        })
    )

    const port = Number(configService.get('api.port')) || 4000

    await app.listen(port)
    
    return app
}

void bootstrap().catch((err) => {
	console.error(err)
	process.exit(1)
})
