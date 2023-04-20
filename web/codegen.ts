import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:4000/graphql',
	documents: ['src/graphql/**/*.graphql'],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./src/generated/graphql.ts': {
      		plugins: [
				'typescript',
				'typescript-operations',
				'typescript-urql'
			]
		},
		'src/generated/schema.ts': {
			plugins: ['urql-introspection']
		}
	},
	config: {
		scalars: {
			Upload: "File"
		}
	}
}

export default config