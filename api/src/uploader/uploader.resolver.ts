import { join } from 'path'
import { createWriteStream } from 'fs'
import { randomUUID } from 'crypto'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { FileUpload, GraphQLUpload } from './uploader.types'
import { UploaderService } from './uploader.service'

@Resolver()
export class UploaderResolver {
    constructor(
        private readonly uploaderService: UploaderService
    ) {}

    @Mutation(() => String)
    async uploadFile(
        @Args({name: 'file', type: () => GraphQLUpload}) file: FileUpload): Promise<string> {
        try {
            const { createReadStream, filename } = file
            const id = randomUUID()
            
            const path = join('public', 'uploads', `${id}__${filename}`)

            await new Promise((res, rej) =>
              createReadStream()
                .pipe(
                  createWriteStream(path) /* upload to a file service or something in this line */
                ) 
                .on('finish', res)
                .on('error', rej),
            )
            return file.filename
        } catch (err) {
            throw err
        }
    }
}