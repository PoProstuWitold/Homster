import { NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyHelmet } from '@fastify/helmet'
import fastifyCookie from '@fastify/cookie'
import fastifySecureSession from '@fastify/secure-session'
import { useContainer } from 'class-validator'

import { CustomValidationPipe } from './common/pipes'

import { AppModule } from './app.module'


export async function bootstrap(): Promise<NestFastifyApplication> {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({
            logger: true
        })
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
            configService.get('NODE_ENV') === 'development' ? 'http://localhost/' : productionDomain
		],
        optionsSuccessStatus: 200,
		methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE']
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
        cookieName: 'dsc_session',
        cookie: {
            secure: configService.get('NODE_ENV') === 'production' ? true : false,
            httpOnly: true,
            sameSite: 'lax',
            path: '/'
        }
    })

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

    app.useGlobalPipes(
        new CustomValidationPipe()
    )

    useContainer(app.select(AppModule), { fallbackOnErrors: true })

    const port = Number(configService.get('api.port')) || 4000

    await app.listen(port)
    
    return app
}

void bootstrap().catch((err) => {
	console.error(err)
	process.exit(1)
})
