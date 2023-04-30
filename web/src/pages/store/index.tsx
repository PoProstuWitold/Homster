/* eslint-disable react-hooks/exhaustive-deps */
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { InfiniteGameFeed } from '@/components/InfiniteGameFeed'

function Home() {
	const router = useRouter()

	useEffect(() => {
		router.replace('/')
	}, [])

	return (
		<>
			<Head>
				<title>Store</title>
			</Head>
			<InfiniteGameFeed />
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)