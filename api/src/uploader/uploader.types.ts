import { GraphQLError, GraphQLScalarType } from 'graphql'
import { Readable } from 'stream'

export interface FileUpload {
    filename: string
    mimetype: string
    encoding: string
    createReadStream: () => Readable
}

export interface FileUploadRaw {
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