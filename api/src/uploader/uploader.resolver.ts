import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal'

import { CreateUploadInput, UploadResult } from './uploader.types'
import { Mimetype, UploaderService } from './uploader.service'

@Resolver()
export class UploaderResolver {
    constructor(
        private readonly uploaderService: UploaderService
    ) {}

    @Mutation(() => UploadResult)
    async uploadFile(
        @Args('values') values: CreateUploadInput,
        // @Args({name: 'files', type: () => [UploadScalar], nullable: true}) files: FileUpload[],
        @Args({name: 'file', type: () => GraphQLUpload, nullable: true}) file: FileUpload,
    ): Promise<UploadResult> {
        try {
            // const upload = await this.uploaderService.uploadFiles(values, files, [Mimetype.PNG, Mimetype.JPG])
            const upload = await this.uploaderService.uploadFile(values, file, [Mimetype.PNG, Mimetype.JPG])
            return upload
        } catch (err) {
            throw err
        }
    }
}