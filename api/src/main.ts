import { join } from 'path'
import { NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UserInputError } from '@nestjs/apollo'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyHelmet } from '@fastify/helmet'
import fastifyCookie from '@fastify/cookie'
import fastifySecureSession from '@fastify/secure-session'
import { ValidationError } from 'class-validator'
import { processRequest } from 'graphql-upload-minimal'

import { AppModule } from './app.module'

export async function bootstrap(): Promise<NestFastifyApplication> {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
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
    app.useStaticAssets({
        root: path,
        prefix: '/public/'
    })

    await app.register(fastifyCookie, {
        secret: configService.get('cookie.secret'),
        parseOptions: {
            secure: configService.get('NODE_ENV') === 'production' ? true : false,
            httpOnly: true
        }
    })
    
    await app.register(fastifyHelmet, { 
        contentSecurityPolicy: (process.env.NODE_ENV === 'production') ? undefined : false 
    })

    await app.register(fastifySecureSession, {
        key: [
            Buffer.from(key1, 'hex'),
            Buffer.from(key2, 'hex')
        ],
        cookieName: 'homster_session',
        cookie: {
            secure: configService.get('NODE_ENV') === 'production' ? true : false,
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        }
    })

    // Format the request body to follow graphql-upload's
    await app.getHttpAdapter().getInstance()
        .addContentTypeParser('multipart', (request, payload, done) => {
            request.isMultipart = true
            done()
        })
    
    await app.getHttpAdapter().getInstance()
        .addHook('preValidation', async function (request, reply) {
            if (!request.isMultipart) {
                return
            }
            request.body = await processRequest(request.raw, reply.raw, { maxFileSize: 50000000, maxFiles: 10 })
        })

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
