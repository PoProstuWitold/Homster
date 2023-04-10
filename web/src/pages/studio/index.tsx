/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { 
	useGetAllStudiosQuery
} from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { StudioCard } from '@/components/StudioCard'
import Link from 'next/link'
import { AiOutlineArrowRight } from 'react-icons/ai'

function Studios() {
	const scrollRef = useRef<HTMLDivElement>(null)

	const [mounted, setMounted] = useState<boolean>(false)
	const [studios, setStudios] = useState<any>([])
	const [cursor, setCursor] = useState<string>('')
	const [variables, setVariables] = useState({
		pagination: {
			take: 10,
			cursor: '',
			field: 'name',
			type: 'desc'
		}
	})
	const [hasNextPage, setHasNextPage] = useState<boolean>(false)

	const [{ data, fetching }] = useGetAllStudiosQuery({
		variables
	})

	useEffect(() => {
		async function firstLoad() {
			if (data && data.studios.edges) {
				setCursor(data.studios.pageInfo.nextCursor)
				setHasNextPage(data.studios.pageInfo.hasNext)
				setStudios(data.studios.edges)
				// it has to be slowed down a bit so we can avoid duplicate data on first load
				await new Promise(resolve => setTimeout(resolve, 250))
				setMounted(true)
			}
		}
		firstLoad()
	}, [])

	useEffect(() => {
		if (data && data.studios.edges && mounted) {
			setCursor(data.studios.pageInfo.nextCursor)
			setHasNextPage(data.studios.pageInfo.hasNext)
			if(cursor) {
				//@ts-ignore
				setStudios((prevGames) => [...prevGames, ...data.studios.edges])
			}
		}
	}, [data])

	useEffect(() => {
		if (hasNextPage && scrollRef.current) {
			const element = scrollRef.current
			const observer = new IntersectionObserver((entries) => {
				if (data && entries[0].isIntersecting) {
					setCursor(data.studios.pageInfo.nextCursor)
					setHasNextPage(data.studios.pageInfo.hasNext)
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
		return studios.map((studio: any, index: any) => (
			<StudioCard key={`${studio.id}:${Math.random()}`} studio={studio}  />
		))
	}, [studios])

	return (
		<>
			<Head>
				<title>Studios</title>
			</Head>
			<main>
				<div className="flex md:flex-row flex-col md:justify-between mb-4 bg-base-200 p-5 gap-6 items-center">
					<section>
						<h1 className='italic'>
							Are you developer and want to publish games? Click 
							<Link className='mx-1 link font-semibold' href={'/support#studio'}>here</Link>
							for more informations
						</h1>
					</section>
                    <div className="flex flex-row gap-2">
						<Link className='btn btn-secondary' href={'/studio/create'}>
							Create studio
							<AiOutlineArrowRight className='ml-3 w-5 h-5' />
						</Link>
                    </div>
                </div>
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center"
				>
					{/* SSR, replace with CSR when paginating */}
					{!studios.length && data && data.studios.edges && data.studios.edges.map((studio: any) => {
						return (
							<StudioCard key={`${studio.id}:${Math.random()}`} studio={studio} />
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

export default withUrqlClient(urqlClientSsr, { ssr: true })(Studios)