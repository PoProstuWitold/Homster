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
	const [scrollTo, setScrollTo] = useState<boolean>(false)
	const [variables, setVariables] = useState({
		pagination: {
			take: 5,
			cursor: '',
			field: 'createdAt',
			type: 'desc'
		}
	})

	const [{ data }] = useGetAllGamesQuery({
		variables
	})


	useEffect(() => {
		if(data && data.games.edges) {
			console.log('triggered')
			setCursor(data.games.pageInfo.nextCursor)
			if(cursor) {
				console.log('data', data.games)
				setGames([...games, ...data.games.edges])
				if(scrollTo) {
					scrollRef.current?.scrollIntoView({
						block: 'end'
					})
				}
			}
			
		}
	}, [data])
	
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
						ref={scrollRef}
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center"
					>
						{/* SSR, replace with CSR when paginating */}
						{!games.length && data && data.games.edges && data.games.edges.map((game: any, index: any) => {
							return (
								<GameCard key={`${game.id}:${Math.random()}`} game={game} index={index} />
							)
						})}
						{/* Replacement for CSR */}
						{gameCards}
						
					</div>	
					{data && data.games && data.games.pageInfo.hasNext &&
						<button 
							onClick={() => {
								setCursor(data.games.pageInfo.nextCursor)
								setVariables({
									...variables,
									pagination: {
										...variables.pagination,
										cursor
									}
								})
								setScrollTo(true)
							}} 
							className="flex btn btn-primary mx-auto my-5"
						>
						next
						</button>
					}	
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)