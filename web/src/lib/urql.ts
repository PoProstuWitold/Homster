import { NextUrqlClientConfig } from 'next-urql'
import { dedupExchange, cacheExchange, fetchExchange, Exchange } from 'urql'

export const urqlClient: NextUrqlClientConfig = (ssrExchange: Exchange) => ({
	url: 'http://localhost:4000/graphql',
	requestPolicy: 'cache-and-network',
	exchanges: [
		dedupExchange,
		cacheExchange,
		fetchExchange,
		ssrExchange
	],
	fetchOptions: () => {
		return {
			credentials: 'include'
		}
	},
})