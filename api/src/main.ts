import { NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { useContainer } from 'class-validator'
import { ConfigService } from '@nestjs/config'
import { fastifyHelmet } from '@fastify/helmet'

import { CustomValidationPipe } from './common/pipes'

import { AppModule } from './app.module'


export async function bootstrap(): Promise<NestFastifyApplication> {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	)
	
	const configService = app.get<ConfigService>(ConfigService)
    const reflector = app.get(Reflector)

    // GLOBAL MIDDLEWARES
    app.enableCors({
        credentials: true,
        origin: [
			configService.get('web.origin')
		],
        optionsSuccessStatus: 200,
		methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE']
    })

    // app.register(fastifyHelmet)

    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

    app.useGlobalPipes(
        new CustomValidationPipe()
    )

    useContainer(app.select(AppModule), { fallbackOnErrors: true })
    await app.listen(Number(configService.get('api.port')))
    
    return app
}

void bootstrap().catch((err) => {
	console.error(err)
	process.exit(1)
})
