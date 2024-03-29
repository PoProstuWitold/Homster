import { useEffect, useMemo, useRef, useState } from 'react'

import { useGetAllGamesQuery } from '@/generated/graphql'
import { GameCard } from './GameCard'

interface InfiniteGameFeedProps {

}

export const InfiniteGameFeed: React.FC<InfiniteGameFeedProps> = () => {
    const scrollRef = useRef<HTMLDivElement>(null)

	const [mounted, setMounted] = useState<boolean>(false)
	const [games, setGames] = useState<any>([])
	const [cursor, setCursor] = useState<string>('')
	const [variables, setVariables] = useState({
		pagination: {
			take: 6,
			cursor: '',
			field: 'name',
			type: 'desc'
		}
	})
	const [hasNextPage, setHasNextPage] = useState<boolean>(false)

	const [{ data, fetching }] = useGetAllGamesQuery({
		variables
	})

	useEffect(() => {
		async function firstLoad() {
			if (data && data.games.edges) {
				setCursor(data.games.pageInfo.nextCursor)
				setHasNextPage(data.games.pageInfo.hasNext)
				setGames(data.games.edges)
				console.log(data.games.edges)
				// it has to be slowed down a bit so we can avoid duplicate data on first load
				await new Promise(resolve => setTimeout(resolve, 250))
				setMounted(true)
			}
		}
		firstLoad()
	}, [])

	useEffect(() => {
		if (data && data.games.edges && mounted) {
			setCursor(data.games.pageInfo.nextCursor)
			setHasNextPage(data.games.pageInfo.hasNext)
			if(cursor) {
				//@ts-ignore
				setGames((prevGames) => [...prevGames, ...data.games.edges])
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
		return games.map((game: any) => (
			<GameCard key={`${game.id}:${Math.random()}`} game={game} />
		))
	}, [games])

    return (
        <>
            <main>
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-scretch"
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