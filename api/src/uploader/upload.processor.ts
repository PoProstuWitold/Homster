import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { Mimetype, UploaderService } from './uploader.service'
import { CreateUploadInput } from './uploader.types'
import { FileUpload } from 'graphql-upload-minimal'

@Processor('files')
export class UploadsProcessor {
    private readonly logger = new Logger(this.constructor.name)

    constructor(
        private readonly uploaderService: UploaderService
    ) {}

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`)
    }

    @OnQueueCompleted()
    onComplete(job: Job, result: any) {
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`)
    } 

    @OnQueueFailed() 
    onError(job: Job<any>, error: any) {
        this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack)
    }

    @Process('upload')  
    async uploadFile(job: Job<{ values: CreateUploadInput, file: FileUpload, mimetype: Mimetype[] }>) {
        try {
            console.log('henlo')
            const {
                values, file, mimetype
            } = job.data

            const result = await this.uploaderService.uploadFile(values, file, mimetype)
            
        } catch (err) {
            console.log(err)
        }
    }
}