import { NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { fastifyHelmet } from '@fastify/helmet'
import { useContainer } from 'class-validator'

import { CustomValidationPipe } from './common/pipes'

import { AppModule } from './app.module'


export async function bootstrap(): Promise<NestFastifyApplication> {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)
	
	const configService = app.get<ConfigService>(ConfigService)
    const reflector = app.get(Reflector)

    const productionDomain = configService.get('web.production_origin')

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

    app.register(fastifyHelmet)

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
