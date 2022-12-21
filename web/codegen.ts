
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
	overwrite: true,
	schema: 'http://localhost:4000/graphql',
	generates: {
		'src/generated/graphql.ts': {
			plugins: ['typescript', 'typescript-document-nodes']
		},
		'src/generated/schema.ts': {
			plugins: ['urql-introspection']
		}
	}
}

export default config
