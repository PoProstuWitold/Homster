import { useMemo } from 'react'

import { initUrqlClient } from './initUrqlClient'

/**
 * Simple hook to initialize the client with the pageProps.
 * @param pageProps - props of page
 * @returns urqlClient
 */
export const useClient = (pageProps: any) => {
    const urqlData = pageProps.URQL_DATA

    const { urqlClient } = useMemo(() => {
        return initUrqlClient('http://localhost:4000/graphql', urqlData)
    }, [urqlData])

    return urqlClient
}