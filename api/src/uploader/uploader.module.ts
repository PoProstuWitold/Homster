import { Module } from '@nestjs/common'

import { UploaderResolver } from './uploader.resolver'
import { UploaderService } from './uploader.service'

@Module({
	imports: [],
	providers: [UploaderResolver, UploaderService],
	exports: [UploaderService]
})
export class UploaderModule {}