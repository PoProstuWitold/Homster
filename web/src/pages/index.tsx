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
	const [hasNextPage, setHasNextPage] = useState<boolean>(false)

	const [{ data, fetching }] = useGetAllUsersQuery({
		variables
	})

	useEffect(() => {
		if (data && data.users.edges) {
			setCursor(data.users.pageInfo.nextCursor)
			setHasNextPage(data.users.pageInfo.hasNext)
			if(cursor) {
				console.log('data', data.users)
				setUsers([...users, ...data.users.edges])
			}
		}
	}, [data])

	useEffect(() => {
		if (hasNextPage && scrollRef.current) {
			const element = scrollRef.current
			const observer = new IntersectionObserver((entries) => {
				if (data && entries[0].isIntersecting) {
					setCursor(data.users.pageInfo.nextCursor)
					setHasNextPage(data.users.pageInfo.hasNext)
					setVariables({
						...variables,
						pagination: {
							...variables.pagination,
							cursor
						}
					})
				}
			})
			observer.observe(element)

			return () => {
				observer.unobserve(element)
			}
		}
	}, [hasNextPage, cursor, scrollRef.current])
	
	const userItems = useMemo(() => {
		return users.map((user: any, index: any) => (
			<UserItem key={`${user.id}:${index}`} user={user} index={index} />
		))
	}, [users])

	return (
		<>
			<Head>
				<title>Hamster - library of games</title>
			</Head>
			<main>
					<div>
						{/* SSR, replace with CSR when paginating */}
						{!users.length && data && data.users.edges && data.users.edges.map((user: any, index: any) => {
							return (
								<UserItem key={`${user.id}:${index}`} user={user} index={index} />
							)
						})}
						{/* Replacement for CSR */}
						{userItems}
					</div>	
					{hasNextPage && (
						<div ref={scrollRef} className="w-full h-1">
							{/* A small div used to observe when the user scrolls to the bottom of the page */}
						</div>
					)}
					{!hasNextPage && !fetching && (
						<div className="w-full mx-auto p-4 flex justify-center italic">
							No more data to load
						</div>
					)}	
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)