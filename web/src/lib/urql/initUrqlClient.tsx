import {
    Client,
    Exchange,
    createClient,
    dedupExchange,
    fetchExchange,
    ssrExchange
} from 'urql'
import { retryExchange, RetryExchangeOptions } from '@urql/exchange-retry'
import { 
    cacheExchange, 
    CacheExchangeOpts 
} from '@urql/exchange-graphcache'
import { NextUrqlClientConfig } from 'next-urql'
import { betterUpdateQuery } from './betterUpdateQuery'
import { 
    LoginMutation, LogoutMutation, 
    MeDocument, MeQuery, 
    RegisterMutation, UpdateUserMutation 
} from '@/generated/graphql'

let urqlClient: Client | null = null
let ssrCache: ReturnType<typeof ssrExchange> | null = null
const isServer = typeof window === 'undefined'

const retryOptions: RetryExchangeOptions = {
    initialDelayMs: 1000,
    maxDelayMs: 1000,
    randomDelay: true,
    retryIf: (err: any) => err && err.networkError,
}

const cacheOptions: CacheExchangeOpts = {
    keys: {
        CursorPaginatedUsers: _ => null,
        CursorPaginatedGames: _ => null,
        GameStudio: _ => null,
        Count: _ => null,
        CursorPaginatedStudios: _ => null,
        AuthResult: (data: any) => data.profile ? data.profile.id : null
    },
    updates: {
        Mutation: {
            login: (_result, args, cache, info) => {
                betterUpdateQuery<LoginMutation, MeQuery>(
                    cache, 
                    { query: MeDocument },
                    _result,
                    (result, query) => {
                        console.log('result', result)
                        console.log('query', query)
                        if(result.login.statusCode !== 200) {
                            return query
                        } else {
                            return {
                                me: result.login
                            }
                        }
                    }
                )
            },
            register: (_result, args, cache, info) => {
                betterUpdateQuery<RegisterMutation, MeQuery>(
                    cache, 
                    { query: MeDocument },
                    _result,
                    (result, query) => {
                        if(result.register.statusCode !== 200) {
                            return query
                        } else {
                            return {
                                me: result.register
                            }
                        }
                    }
                )
            },
            logout: (_result, args, cache, info) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                    cache,
                    { query: MeDocument },
                    _result,
                    (result, query) => {
                        return {
                            me: result.logout
                        }
                    }
                )
            },
            updateUser: (_result, args, cache, info) => {
                betterUpdateQuery<UpdateUserMutation, MeQuery>(
                    cache,
                    { query: MeDocument },
                    _result,
                    (result, query) => {
                        return {
                            me: {
                                ...query.me,
                                message: 'Profile updated',
                                profile: result.updateUser
                            }
                        }
                    }
                )
            }
        }
    }
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
                cacheExchange(cacheOptions) as Exchange,
                ssrCache, // Add `ssr` in front of the `fetchExchange`
                retryExchange(retryOptions) as Exchange,
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
		cacheExchange(cacheOptions) as Exchange,
		ssrExchange,
        retryExchange(retryOptions) as Exchange,
		fetchExchange
	],
	fetchOptions: () => {
		return {
			credentials: 'include' as const
		}
	},
})