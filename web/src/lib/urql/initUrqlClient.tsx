import {
    cacheExchange,
    Client,
    createClient,
    dedupExchange,
    fetchExchange,
    ssrExchange,
    Exchange
} from 'urql'
import { retryExchange } from '@urql/exchange-retry'
import { NextUrqlClientConfig } from 'next-urql' 

let urqlClient: Client | null = null
let ssrCache: ReturnType<typeof ssrExchange> | null = null
const isServer = typeof window === 'undefined'

const options = {
    initialDelayMs: 1000,
    maxDelayMs: 1000,
    randomDelay: true,
    retryIf: (err: any) => err && err.networkError,
}

/**
* Function to initialize urql client. can be used both on client and server
* @param initialState -  usually the data from the server returned as props
* @param url - graphql endpoint
* @returns and object with urqlClient and ssrCache
*/
export function initUrqlClient(url: string, initialState?: any) {
    if (!urqlClient) {
        //fill the client with initial state from the server.
        ssrCache = ssrExchange({ initialState, isClient: !isServer })
    
        urqlClient = createClient({
            url: url,
            requestPolicy: 'cache-and-network',
            exchanges: [
                dedupExchange,
                cacheExchange,
                ssrCache, // Add `ssr` in front of the `fetchExchange`
                retryExchange(options),
                fetchExchange,
            ],
            fetchOptions: () => {
                return {
                    credentials: 'include' as const
                }
            },
        })
    } else {
        //when navigating to another page, client is already initialized.
        //lets restore that page's initial state
        ssrCache?.restoreData(initialState)
    }
  
    // Return both the Client instance and the ssrCache.
    return { urqlClient, ssrCache }
}


export const urqlClientSsr: NextUrqlClientConfig = (ssrExchange: Exchange) => ({
	url: 'http://localhost:4000/graphql',
	requestPolicy: 'cache-and-network',
	exchanges: [
		dedupExchange,
		cacheExchange,
		ssrExchange,
        retryExchange(options),
		fetchExchange
	],
	fetchOptions: () => {
		return {
			credentials: 'include'
		}
	},
})