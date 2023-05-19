/* eslint-disable react-hooks/exhaustive-deps */
import { withUrqlClient } from 'next-urql'
import Image from 'next/image'

import { SpecialOffer } from '@/components/SpecialOffer'
import { StoreNavbar } from '@/components/StoreNavbar'
import { InfiniteGameFeed } from '@/components/InfiniteGameFeed'
import { Featured } from '@/components/Featured'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { Game, useGetSpecialOffersQuery } from '@/generated/graphql'

import CoverImage from '../../public/images/homster0.jpg'

function MainPage() {

	const [{ data: offers }] = useGetSpecialOffersQuery()

	return (
		<>
			<main className='mb-10'>
				{/* MAIN IMAGE & SEARCH BAR */}
				<section className="relative h-0 md:h-full mb-[28rem] md:mb-2">
					<Image 
						className="z-[-5]"
						src={CoverImage}
						alt="layout bg"
						placeholder='blur'
						fill
						priority
						style={{
							objectFit: 'cover',
							objectPosition: 'center'
						}}
					/>
					<div className="text-neutral-content">
						<StoreNavbar/>
						<div className="flex flex-col relative w-full h-60 lg:h-96">
							<div className="md:hidden md:top-0 p-0 m-0 -z-10 w-full">
								<Image
									src={CoverImage}
									alt="layout bg"
									fill
									placeholder='blur'
									style={{
										objectFit: 'cover'
									}}
									quality={100}
								/>
							</div>
							<div className="h-96 relative flex pt-4 lg:px-[11rem] px-4 md:flex-row flex-col md:rounded-xl gap-4 justify-end">
									<div className='absolute my-1 bottom-2 md:left-4 left-2 flex bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 p-5 max-w-fit'>
										<div className='text-white'>
											<h1 className='font-bold md:text-5xl text-xl'>Homster</h1>
											<p className='font-semibold md:text-xl text-sm'>Library of games for humans and hamsters</p>
										</div>
									</div>
									
							</div>
						</div>
					</div>
                </section>

				{/* FEATURED & RECOMMENDED */}
				<Featured />
				<article className='justify-items-center justify-between mx-3 md:mx-4 lg:mx-5 my-20'>
					<h2 className='text-2xl font-bold my-4'>Special offers</h2>
					<div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 justify-items-center'>
						{offers && offers.specialOffers.map((game) => {
							return (
								<SpecialOffer game={game as Game} key={`${game.id}`} />
							)
						})}
					</div>
				</article>
				<article className='justify-items-center justify-between'>
					<h2 className='text-2xl font-bold my-4 mx-3 md:mx-4 lg:mx-5'>All games (1252+)</h2>
					<InfiniteGameFeed />
				</article>
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(MainPage)