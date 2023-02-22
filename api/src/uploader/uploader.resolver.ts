import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CreateUploadInput, FileUpload, GraphQLUpload, UploadResult } from './uploader.types'
import { Mimetype, UploaderService } from './uploader.service'

@Resolver()
export class UploaderResolver {
    constructor(
        private readonly uploaderService: UploaderService
    ) {}

    @Mutation(() => UploadResult)
    async uploadFile(
        @Args('values') values: CreateUploadInput,
        @Args({name: 'file', type: () => GraphQLUpload, nullable: true}) file?: FileUpload,
    ): Promise<UploadResult> {
        try {
            const upload = await this.uploaderService.uploadFile(values, file, [Mimetype.PNG, Mimetype.JPG])
            return upload
        } catch (err) {
            throw err
        }
    }
}