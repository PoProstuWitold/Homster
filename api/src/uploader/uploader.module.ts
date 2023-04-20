import { Module } from '@nestjs/common'
import { BullModule, BullModuleOptions } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UploaderResolver } from './uploader.resolver'
import { UploaderService } from './uploader.service'
import { UploadsProcessor } from './upload.processor'

@Module({
	imports: [
		BullModule.registerQueueAsync({
            name: 'files',
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<BullModuleOptions> => ({
                redis: {
                    host: configService.get('redis.host') || 'localhost',
                    port: configService.get('redis.port') || 6379
                }
            })
        }),
	],
	providers: [UploaderResolver, UploaderService, UploadsProcessor],
	exports: [UploaderService]
})
export class UploaderModule {}