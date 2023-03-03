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
    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    imageRaw?: string;

    @Field(() => String, { nullable: true })
    imageFormatted?: string;

    @Field(() => String, { nullable: true })
    url?: string;
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
    async parseValue(value: FileUploadRaw): Promise<FileUpload> {
        if(value.file) {
            return value.file
        }
    },
    parseLiteral(ast) { 
        throw new GraphQLError('Upload literal unsupported.', ast)
    },
    serialize() {
        throw new GraphQLError('Upload serialization unsupported.')
    },
})