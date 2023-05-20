/* eslint-disable react-hooks/exhaustive-deps */
import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Price } from './Price'
import { Game, useGetRecommendationsQuery } from '@/generated/graphql'
import LogoHomster from '../../public/images/Logo_Homster.png'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const Featured: React.FC = () => {

	const [{ data: featured }] = useGetRecommendationsQuery({
		variables: {
			userId: ''
		}
	})

	const [active, setActive] = useState<number | undefined>(0)
	const counterRef = useRef(0)


	useEffect(() => {
		if (featured) {
			const intervalId = setInterval(() => {
				counterRef.current = (counterRef.current + 1) % featured.recommendations.length
				setActive(counterRef.current)
			}, 5000)

			return () => clearInterval(intervalId)
		}
	}, [active])
	if (!featured) {
		return <></>
	}
	return (
		<>
			<section>
				<div className='grid lg:grid-cols-4 grid-cols-1 gap-4 justify-items-center justify-between mx-3 md:mx-4 lg:mx-5'>
					<article>
						<h2 className='text-2xl font-bold my-4'>About Homster</h2>
						<p>
							Welcome to Homster - the ultimate game library for gamers! Discover a vast collection of games from all genres, and easily browse, purchase and download them straight to your computer. With Homster, you can keep track of your favorite games, access exclusive content and connect with other gamers from around the world. Join our community today and take your gaming experience to the next level!
						</p>
						<Image src={LogoHomster} className='w-44 h-44 mx-auto' alt="homster logo" width={180} height={180} />
					</article>
					<article className='lg:col-span-3'>
						<h2 className='text-2xl font-bold my-4'>Featured & Recommended</h2>
						<div className="overflow-hidden">
							{/* Featured */}
							<div className="w-full">
								<Tab.Group as={'div'} selectedIndex={active}>
									<Tab.Panels className="mt-2 group delay-1000 transition-all">
										{featured.recommendations.map((game, idx) => {
											return (
												<Tab.Panel
													key={idx}
												>
													<div className={`h-full md:h-[26rem] w-full flex flex-col md:flex-row`}>
														<div className="w-full h-full flex md:w-2/3">
															<Image placeholder="blur" blurDataURL={game.coverImage!} width={400} height={160} src={game.coverImage!} alt={`${game.name} image`} className="object-cover w-full" />
														</div>
														<div className="px-5 h-full w-full md:w-1/3 flex flex-col justify-between bg-base-300">
															<div className="flex flex-col">
																<a href={`/app/${game.id}/${game.name.replaceAll(' ', '_')}`} className="text-2xl h-[2.4rem] line-clamp-1 mt-4 font-semibold border-b-2 border-base-100">
																	{game.name}
																</a>
																<p className='text-base line-clamp-3 py-2 mb-4 max-h-20'>
																	{game.description}
																</p>
																<div className="w-full flex flex-wrap gap-5 justify-between">
																	{game.media && game.media.map((image: any, index: any) => (
																		<Image
																			key={index}
																			width={100}
																			height={100}
																			src={image.url}
																			alt=""
																			className="object-cover w-[44%]"
																		/>
																	))}
																</div>
															</div>
															<div className="flex flex-row my-2">
																<div className="flex flex-col justify-center">
																	<Price game={game as Game} />
																</div>
															</div>
														</div>
													</div>
												</Tab.Panel>
											)
										})}
									</Tab.Panels>
									<Tab.List className="flex justify-center w-full py-2 gap-2">
										{featured.recommendations.map((game, index) => (
											<Tab
												key={game.id}
												className={({ selected }) =>
													classNames(
														'btn btn-xs duration-200 transition-all delay-50',
														selected
															? 'bg-primary opacity-100'
															: 'bg-base-300 hover:bg-primary opacity-80'
													)
												}
												onClick={() => setActive(index)}
											>
												{index + 1}
											</Tab>
										))

										}
									</Tab.List>
								</Tab.Group>
							</div>
						</div>
					</article>
				</div>
			</section>
		</>
	)
}