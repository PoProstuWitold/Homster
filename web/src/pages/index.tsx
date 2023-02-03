/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { 
	useGetAllUsersQuery
} from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'


function Home() {
	const [users, setUsers] = useState<any>([])
	const [cursor, setCursor] = useState<string>('')
	const [variables, setVariables] = useState({
		pagination: {
			take: 10,
			cursor: '',
			field: 'createdAt',
			type: 'desc'
		}
	})

	const [{ data, fetching, error }] = useGetAllUsersQuery({
		variables
	})

	useEffect(() => {
		if(data && data.users.users) {
			console.log('triggered')
			setCursor(data.users.pageInfo.nextCursor)
			if(cursor) {
				console.log('data', data.users)
				setUsers([...users, ...data.users.users])
			}
		}
	}, [data])
	
	
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
						{/* SSR, replace with CSR when paginating */}
						{!users.length && data && data.users.users && data.users.users.map((user: any, index: any) => {
							return (
								<div key={index} className="p-5">
									<p>{index}</p>
									<p>id: {user.id}</p>
									<p>fullName: {user.fullName}</p>
									<p>displayName: {user.displayName}</p>
								</div>
							)
						})}
						{/* Replacement for CSR */}
						{users && users.map((user: any, index: any) => {
							return (
								<div key={index} className="p-5">
									<p>{index}</p>
									<p>id: {user.id}</p>
									<p>fullName: {user.fullName}</p>
									<p>displayName: {user.displayName}</p>
								</div>
							)
						})}
					</div>
					{data.users && data.users.pageInfo.hasNext &&
						<button onClick={() => {
							setCursor(data.users.pageInfo.nextCursor)
							setVariables({
								pagination: {
									take: 10, 
									field: 'createdAt',
									type: 'desc',
									cursor
								}
							})
						}} className="btn btn-primary">next</button>
					}
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)