import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsMimeType, IsNotEmpty, IsString } from 'class-validator'
import { GraphQLScalarType } from 'graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal'
import { ReadStream } from 'node:fs'

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
    url?: string | URL;
}

export class FileUploadDto implements FileUpload {
    @IsString()
    filename: string;

    @IsString()
    @IsMimeType()
    mimetype: string;

    @IsString()
    encoding: string;

    @IsString()
    fieldName: string

    createReadStream!: () => ReadStream;
}

// export const UploadScalar = new GraphQLScalarType({
//     name: 'Upload',
//     description: 'The `Upload` scalar type represents a file upload',

//     parseValue(value) {
//         return GraphQLUpload.parseValue(value);
//     },
    
//     serialize(value) {
//         return GraphQLUpload.serialize(value);
//     },
    
//     parseLiteral(ast) {
//         //@ts-ignore
//         return GraphQLUpload.parseLiteral(ast, ast.value);
//     }
// })