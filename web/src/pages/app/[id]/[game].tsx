import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { Game, useGetOneGameQuery } from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { StoreNavbar } from '@/components/StoreNavbar'
import { GameDetailedCard } from '@/components/GameDetailedCard'

function GamePage() {
	const router = useRouter()

	const [{
		data
	}] = useGetOneGameQuery({
		variables: {
			data: {
				...(router.query['id'] && {
					id: router.query['id'] as string
				}),
				...(router.query['game'] && {
					name: (router.query['game'] as string).replaceAll('_', ' ')
				}),
			}
		}
	})


	return (
		<>
			<main className='min-h-screen md:mb-20 mb-40'>
				<StoreNavbar />
				<div className="md:hidden flex flex-col relative w-full h-60 lg:h-96">
					<div className="md:top-0 p-0 m-0 -z-10 w-full">
						<Image
							src={data?.game.coverImage!}
							alt="layout bg"
							fill
							style={{
								objectFit: 'cover'
							}}
							quality={100}
						/>
					</div>
				</div>
				{data && data.game &&
					<>
						<div className="text-sm breadcrumbs xl:mx-[10rem] sm:mx-4 mx-2 py-5">
							<ul>
								<li><a href={`/store`}>All games</a></li>
								<li><a>{data.game.name}</a></li>
							</ul>
						</div>
						<div className="xl:mx-[10rem] sm:mx-4 mx-2 flex flex-col gap-4">
							<h1 className='font-semibold text-2xl'>{data.game.name}</h1>
							<GameDetailedCard game={data.game as Game}/>
						</div>
					</>}
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true, staleWhileRevalidate: true })(GamePage)