/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { 
	useGetAllGamesQuery
} from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { getStudios } from '@/utils/getStudios'

const GameItem = memo(({game, index}: any) => {
	GameItem.displayName = 'GameItem'
    const [developers, publishers] = getStudios(game.studios)
	return (
	  <div key={game.id} className="p-5">
		<p>{index}</p>
		<p>id: {game.id}</p>
		<p>name: {game.name}</p>
        <p>description: {game.description}</p>
        <p>developers: {developers.join(', ')}</p>
        <p>publishers: {publishers.join(', ')}</p>
	  </div>
	)
})

function Home() {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [games, setGames] = useState<any>([])
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

	const [{ data, fetching, error }] = useGetAllGamesQuery({
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
	
	const userItems = useMemo(() => {
		return games.map((game: any, index: any) => (
			<GameItem key={`${game.id}:${index}`} game={game} index={index} />
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
					>
						{/* SSR, replace with CSR when paginating */}
						{!games.length && data && data.games.edges && data.games.edges.map((game: any, index: any) => {
							return (
								<GameItem key={`${game.id}:${index}`} game={game} index={index} />
							)
						})}
						{/* Replacement for CSR */}
						{userItems}
						{data && data.games && data.games.pageInfo.hasNext &&
						<button onClick={() => {
							setCursor(data.games.pageInfo.nextCursor)
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