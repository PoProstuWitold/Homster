import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import { IsMimeType, IsNotEmpty, IsString } from 'class-validator'
import { GraphQLError, GraphQLScalarType } from 'graphql'
import { Readable } from 'stream'

@InputType()
export class CreateUploadInput {
    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Field(() => String)
    description: string;
}

@ObjectType()
export class UploadResult {
    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => String)
    image: string;
}

export interface FileUpload {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => Readable
}

@InputType()
export class FileUploadDto implements FileUpload {
    @IsString()
    filename: string;

    @IsString()
    @IsMimeType()
    mimetype: string;

    @IsString()
    encoding: string;

    @Exclude()
    createReadStream: () => Readable;
}

export class FileUploadRaw {
    file: {
        filename: string
        mimetype: string
        encoding: string
        createReadStream: () => Readable
    }
}

export const GraphQLUpload = new GraphQLScalarType({
    name: 'Upload',
    description: 'The `Upload` scalar type represents a file upload.',
    async parseValue(value: Promise<FileUploadRaw>): Promise<FileUpload> {
        const upload = await value
        const filename = upload.file.filename
        const mimetype = upload.file.mimetype
        const encoding = upload.file.encoding
        const createReadStream = () => upload.file.createReadStream()

        const fileUpload = {
            filename,
            mimetype,
            encoding,
            createReadStream
        }

        return fileUpload
    },
    parseLiteral(ast) {
        throw new GraphQLError('Upload literal unsupported.', ast)
    },
    serialize() {
        throw new GraphQLError('Upload serialization unsupported.')
    },
})