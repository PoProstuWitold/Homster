import { withUrqlClient } from 'next-urql'
import Head from 'next/head'

import { 
	useGetAllUsersQuery
} from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { useState } from 'react'

function Home() {
	const [variables, setVariables] = useState({
		take: 10,
		cursor: '',
		field: 'createdAt',
		type: 'asc'
	})

	const [{ data, fetching, error }] = useGetAllUsersQuery({
		variables
	})
	
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
					{data && data.users && data.users.users && data.users.users.map((user, index) => {
						return (
							<p key={index}>name: {user.fullName}</p>
						)
					})}
					{data && data.users && data.users.hasMore &&
						<button onClick={() => setVariables({
							take: variables.take,
							//@ts-ignore
							cursor: data.users.users[data.users.users.length - 1].id ? data.users.users[data.users.users.length - 1].id : '',
							field: 'createdAt',
							type: 'asc'
						})} className="btn btn-primary"></button>

					}
				</div>
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)