import { isServer } from '@/utils'
import { NextUrqlClientConfig } from 'next-urql'
import { dedupExchange, cacheExchange, fetchExchange, Exchange } from 'urql'

export const urqlClient: NextUrqlClientConfig = (ssrExchange: Exchange) => ({
	url: 'http://localhost:4000/graphql',
	requestPolicy: 'cache-and-network',
	exchanges: [
		dedupExchange,
		cacheExchange,
		ssrExchange,
		fetchExchange
	],
	fetchOptions: () => {
		return {
			credentials: 'include'
		}
	},
})