/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { 
	useGetAllGamesQuery
} from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { GameCard } from '@/components/GameCard'

function Home() {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [games, setGames] = useState<any>([])
	const [cursor, setCursor] = useState<string>('')
	const [variables, setVariables] = useState({
		pagination: {
			take: 5,
			cursor: '',
			field: 'createdAt',
			type: 'desc'
		}
	})
	const [hasNextPage, setHasNextPage] = useState<boolean>(false)

	const [{ data, fetching }] = useGetAllGamesQuery({
		variables
	})


	useEffect(() => {
		if (data && data.games.edges) {
			setCursor(data.games.pageInfo.nextCursor)
			setHasNextPage(data.games.pageInfo.hasNext)
			if(cursor) {
				console.log('data', data.games)
				setGames([...games, ...data.games.edges])
			}
		}
	}, [data])

	useEffect(() => {
		if (hasNextPage && scrollRef.current) {
			const element = scrollRef.current
			const observer = new IntersectionObserver((entries) => {
				if (data && entries[0].isIntersecting) {
					setCursor(data.games.pageInfo.nextCursor)
					setHasNextPage(data.games.pageInfo.hasNext)
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

	const gameCards = useMemo(() => {
		return games.map((game: any, index: any) => (
			<GameCard key={`${game.id}:${Math.random()}`} game={game} index={index} />
		))
	}, [games])

	return (
		<>
			<Head>
				<title>Store</title>
			</Head>
			<main>
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center"
				>
					{/* SSR, replace with CSR when paginating */}
					{!games.length && data && data.games.edges && data.games.edges.map((game: any) => {
						return (
							<GameCard key={`${game.id}:${Math.random()}`} game={game} />
						)
					})}
					{/* Replacement for CSR */}
					{gameCards}
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