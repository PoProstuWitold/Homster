import { BadRequestException, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { join } from 'path'

import { CreateUploadInput, FileUpload, FileUploadDto } from './uploader.types'

enum Mimetypes {
    PNG = 'image/png',
    JPG = 'image/jpg',
    GIF = 'image/gif',
    SVG = 'image/svg+xml',
    TEXT = 'text/plain',
    PDF = 'application/pdf',
    OCTET_STREAM = 'application/octet-stream'
}
  
const mimetypes = [
    ...Object.values(Mimetypes),
]

@Injectable()
export class UploaderService {
    async uploadFile(values: CreateUploadInput, file: FileUpload) {
        try {
            await this.validateFile(file, Mimetypes.PNG)
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
            return {
                name: values.name,
                description: values.description,
                image: file.filename
            }
        } catch (err) {
            throw err
        }
    }

    private async validateFile(file: FileUpload, mimetype: Mimetypes) {
        try { 
            // Check if there is any file
            if(!file) {
                throw new BadRequestException('No valid file provided')
            }

            // Check and compare mimetypes
            if(!mimetypes.includes(mimetype) || mimetype !== file.mimetype) {
                throw new BadRequestException(`Mimetype of ${file.mimetype} is not allowed`)
            }

            // Validate file against schema
            const newFile = this.createTestFile(file)
            const validation = await validate(newFile)
            if(validation.length !== 0) {
                throw new BadRequestException('No valid file provided')
            }

            return validation
        } catch (err) {
            throw err
        }
    }

    private createTestFile(file: FileUpload) {
        const newFile = new FileUploadDto()
            newFile.filename = file.filename
            newFile.encoding = file.encoding
            newFile.mimetype = file.mimetype

        return newFile
    }
}