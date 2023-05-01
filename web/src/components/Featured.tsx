import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Price } from './Price'
import { Game } from '@/generated/graphql'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Featured: React.FC = () => {
	const [active, setActive] = useState<number | undefined>(0)
	const counterRef = useRef(0)

	let [featured] = useState<any[]>([
		{
			id: 'dwadasdwagadasda',
			name: 'Homsterix 2',
			description: 'Amazing continuation of hamster Natalka adventures!',
			coverImage: '/images/homster1.jpg',
			price: 0,
			basicPrice: 7,
			media: [
				{
					url: '/images/homster1.jpg'
				},
				{
					url: '/images/homster1.jpg'
				},
				{
					url: '/images/homster1.jpg'
				},
				{
					url: '/images/homster1.jpg'
				},
			]
		},
		{
			id: 'dasdasadawda',
			name: 'Homsterix 3',
			description: 'The greatest evil arrived to homster village. Will our heroine fight or flee?',
			coverImage: '/images/homster3.jpg',
			price: 10,
			basicPrice: 20,
			media: [
				{
					url: '/images/homster3.jpg'
				},
				{
					url: '/images/homster3.jpg'
				},
				{
					url: '/images/homster3.jpg'
				},
				{
					url: '/images/homster3.jpg'
				},
			]
		},
		{
			id: 'gasfawdadadwa',
			name: 'Homsterix 4',
			description: 'Newest game about hamster Natalka. Built in Unreal Engine 5',
			coverImage: '/images/homster4.jpg',
			price: 40,
			basicPrice: 40,
			media: [
				{
					url: '/images/homster4.jpg'
				},
				{
					url: '/images/homster4.jpg'
				},
				{
					url: '/images/homster4.jpg'
				},
				{
					url: '/images/homster4.jpg'
				},
			]
		},
		{
			id: 'hlamdjwandjhhabhjdwa',
			name: 'Rex Tremendae',
			description: 'Story about paladin that once was given a quest to visit the infamous City of the Dead to remove the curse and give city back to the living.',
			coverImage: '/images/homster4.jpg',
			price: 40,
			basicPrice: 40,
			media: [
				{
					url: '/images/homster4.jpg'
				},
				{
					url: '/images/homster4.jpg'
				},
				{
					url: '/images/homster4.jpg'
				},
				{
					url: '/images/homster4.jpg'
				},
			]
		},
	])

	useEffect(() => {
		const intervalId = setInterval(() => {
			counterRef.current = (counterRef.current + 1) % featured.length;
			setActive(counterRef.current);
		}, 5000)
		
		return () => clearInterval(intervalId)
	}, [active])

    return (
        <>
            <section>
					<div className='grid lg:grid-cols-4 grid-cols-1 gap-4 justify-items-center justify-between mx-3 md:mx-4 lg:mx-5'>
						<article>
							<h2 className='text-2xl font-bold my-4'>About Homster</h2>
							<p>
							Welcome to Homster - the ultimate game library for gamers! Discover a vast collection of games from all genres, and easily browse, purchase and download them straight to your computer. With Homster, you can keep track of your favorite games, access exclusive content and connect with other gamers from around the world. Join our community today and take your gaming experience to the next level!
							</p>
							<img src={'/images/Logo_Homster.png'} className='w-44 h-44 mx-auto'/>
						</article>
						<article className='lg:col-span-3'>
							<h2 className='text-2xl font-bold my-4'>Featured & Recommended</h2>
							<div className="overflow-hidden">
							{/* Featured */}
							
								<div className="w-full">
									<Tab.Group as={'div'} selectedIndex={active}>
										<Tab.Panels className="mt-2">
										{Object.values(featured).map((game, idx) => (
											<Tab.Panel
												key={idx}
											>
												<div className="h-full md:h-[26rem] w-full flex flex-col  md:flex-row">
																<div className="w-full h-full flex md:w-2/3">
																	<Image placeholder="blur" blurDataURL={game.coverImage} width={400} height={160} src={game.coverImage} alt="" className="object-cover w-full" />
																</div>
																<div className="px-5 h-full w-full md:w-1/3 flex flex-col justify-between bg-base-300">
																	<div className="flex flex-col">
																		<a href={`/app/${game.id}/${game.name.replaceAll(' ', '_')}`} className="text-2xl h-[2.4rem] line-clamp-1 mt-4 font-semibold border-b-2 border-base-100">
																			{game.name}
																		</a>
																		<p className='text-base line-clamp-2 py-2'>
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
																		<Price game={game} />
																	</div>
																	</div>
																</div>
												</div>
											</Tab.Panel>
											))}
										</Tab.Panels>
										<Tab.List className="flex justify-center w-full py-2 gap-2">
										{featured.map((game, index) => (
											<Tab
												key={game.id}
												className={({ selected }) =>
													classNames(
													'btn btn-xs duration-200',
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