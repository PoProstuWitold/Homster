/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { 
	useGetAllUsersQuery
} from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'

const UserItem = memo(({user, index}: any) => {
	UserItem.displayName = 'UserItem'

	return (
	  <div key={user.id} className="p-5">
		<p>{index}</p>
		<p>id: {user.id}</p>
		<p>fullName: {user.fullName}</p>
		<p>displayName: {user.displayName}</p>
	  </div>
	)
})

function Home() {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [users, setUsers] = useState<any>([])
	const [cursor, setCursor] = useState<string>('')
	const [scrollTo, setScrollTo] = useState<boolean>(false)
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


	const onScroll = () => {
		console.log('scrolling')
	}

	useEffect(() => {
		scrollRef.current?.addEventListener('scroll', onScroll, {
			passive: true
		})
		return () => scrollRef.current?.removeEventListener('scroll', onScroll)
	}, [])

	useEffect(() => {
		if(data && data.users.users) {
			console.log('triggered')
			setCursor(data.users.pageInfo.nextCursor)
			if(cursor) {
				console.log('data', data.users)
				setUsers([...users, ...data.users.users])
				if(scrollTo) {
					scrollRef.current?.scrollIntoView({
						block: 'end'
					})
				}
			}
			
		}
	}, [data])
	
	const userItems = useMemo(() => {
		return users.map((user: any, index: any) => (
			<UserItem key={`${user.id}:${index}`} user={user} index={index} />
		))
	}, [users])
	
	if(fetching) return <div>Fetching</div>
	if(error) return <div>Error</div>
	if(!data) return <div>No data</div>

	return (
		<>
			<Head>
				<title>Hamster - library of games</title>
			</Head>
			<main>
					<div 
						ref={scrollRef}
					>
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
						{userItems}
						{data.users && data.users.pageInfo.hasNext &&
						<button onClick={() => {
							setCursor(data.users.pageInfo.nextCursor)
							setVariables({
								...variables,
								pagination: {
									...variables.pagination,
									cursor
								}
							})
							setScrollTo(true)
						}} className="btn btn-primary">next</button>
					}
					</div>		
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)