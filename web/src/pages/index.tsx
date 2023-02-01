import { withUrqlClient } from 'next-urql'
import Head from 'next/head'

import { 
	useGetAllUsersQuery
} from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'

function Home() {
	const [{ data, fetching, error }] = useGetAllUsersQuery()
	
	if(fetching) return <div>Fetching</div>
	if(error) return <div>Error</div>
	if(!data) return <div>No data</div>

	return (
		<>
			<Head>
				<title>Hamster - library of games</title>
			</Head>
			<main>
				<div>
					{data.users.map((user, index) => {
						return (
							<p key={index}>name: {user.fullName}</p>
						)
					})}
				</div>
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)