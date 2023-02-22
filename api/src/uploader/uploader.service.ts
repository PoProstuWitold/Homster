import { BadRequestException, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { randomUUID } from 'crypto'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { Readable } from 'stream'

import { CreateUploadInput, FileUpload, FileUploadDto } from './uploader.types'

export enum Mimetype {
    PNG = 'image/png',
    JPG = 'image/jpg',
    GIF = 'image/gif',
    SVG = 'image/svg+xml',
    TEXT = 'text/plain',
    PDF = 'application/pdf',
    OCTET_STREAM = 'application/octet-stream'
}

@Injectable()
export class UploaderService {
    public async uploadFile(values: CreateUploadInput, file: FileUpload, mimetype: Mimetype[]) {
        try {
            await this.validateFile(file, mimetype)
            const { createReadStream, filename } = file
            
            const size = await this.calculateFileSize(createReadStream())
            console.log(`size: ${this.bytesForHuman(size)}`)

            const id = randomUUID() 
            
            const path = join('public', 'uploads', `${id}__${filename}`)

            let uploaded = 0

            await new Promise((res, rej) =>
              createReadStream()
                .on('data', (chunk) => {
                    uploaded += chunk.length
                    // this.progress(uploaded, size)
                })
                .pipe(
                     /* upload to a file service or something in this line */
                    createWriteStream(path)
                ) 
                .on('finish', res)
                .on('error', rej)
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

    private async calculateFileSize(readStream: Readable): Promise<number> {
        let size = 0
        for await (const chunk of readStream) {
            size += chunk.length
        }
        return size
    }

    private progress(uploaded: number, size: number): void {
        const percent = Math.round(uploaded / size * 100)
        console.log(`${percent}%`)
    }

    private bytesForHuman(bytes: number) {
        let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
    
        let i = 0
        
        for (i; bytes > 1024; i++) {
            bytes /= 1024;
        }
    
        return bytes.toFixed(1) + ' ' + units[i]
    }

    private async validateFile(file: FileUpload, mimetype: Mimetype[]) {
        try { 
            // Check if there is any file
            if(!file) {
                throw new BadRequestException('No file provided')
            }
           
            // Check and compare mimetypes
            if(!mimetype.includes(file.mimetype as Mimetype)) {
                if(mimetype.length === 1) {
                    throw new BadRequestException(`Mimetypes must be ${mimetype.join(', ')}. Found ${file.mimetype}`)
                } else {
                    throw new BadRequestException(`Mimetypes must be one of: ${mimetype.join(', ')}. Found ${file.mimetype}`)
                }
            }

            // Validate file against schema
            const newFile = this.createTestFile(file)
            const validation = await validate(newFile)
            if(validation.length !== 0) {
                throw new BadRequestException('Invalid file provided')
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