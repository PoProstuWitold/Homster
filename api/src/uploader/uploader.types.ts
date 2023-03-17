import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { Exclude } from 'class-transformer'
import { IsMimeType, IsNotEmpty, IsString } from 'class-validator'
import { GraphQLScalarType } from 'graphql'
import { Readable } from 'stream'
import { GraphQLUpload } from 'graphql-upload-minimal'

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

export const UploadScalar = new GraphQLScalarType({
    name: 'Upload',
    description: 'The `Upload` scalar type represents a file upload',

    parseValue(value) {
        return GraphQLUpload.parseValue(value);
    },
    
    serialize(value) {
        return GraphQLUpload.serialize(value);
    },
    
    parseLiteral(ast) {
        //@ts-ignore
        return GraphQLUpload.parseLiteral(ast, ast.value);
    }
})