import { createWriteStream, unlink } from 'node:fs'
import { join } from 'node:path'
import { BadRequestException, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import { randomUUID } from 'crypto'
import { Readable } from 'stream'

import { CreateUploadInput, FileUploadDto } from './uploader.types'
import { FileUpload } from 'graphql-upload-minimal'
import { pipeline } from 'node:stream/promises'

export enum Mimetype {
    PNG = 'image/png',
    JPG = 'image/jpeg',
    GIF = 'image/gif',
    SVG = 'image/svg+xml',
    TEXT = 'text/plain',
    PDF = 'application/pdf',
    OCTET_STREAM = 'application/octet-stream'
}

@Injectable()
export class UploaderService {

    constructor(
        // private url = `http://localhost:4000/public/uploads/hello`
    ) {}

    public async uploadFiles(values: CreateUploadInput, files: FileUpload[], mimetype: Mimetype[]) {
        return {
            name: values.name,
            description: values.description,
            imageRaw: files.join(', '),
            imageFormatted: files.join(', '),
            url: `http://localhost:4000/public/uploads/`
        }
    }

    public async uploadFile(values: CreateUploadInput, file: FileUpload, mimetype: Mimetype[]) {
        try {
            const { createReadStream, filename } = file;
        const stream = createReadStream();

        const id = randomUUID(); 
        const imageFormatted = `${id}__${filename}`;
        const imagePath = join('public', 'uploads', imageFormatted);

        await pipeline(stream, createWriteStream(imagePath));

        return {
            name: values.name,
            description: values.description,
            imageRaw: filename,
            imageFormatted,
            url: `http://localhost:4000/public/uploads/${imageFormatted}`
        }
        } catch (err) {
            throw err
        }
    }

    private async streamToBuffer(stream: Readable): Promise<Buffer> {
        const buffer = []
    
        return new Promise((resolve, reject) =>
            stream
                .on('error', (error) => reject(error))
                .on('data', (data) => buffer.push(data))
                .on('end', () => resolve(Buffer.concat(buffer)))
        )
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