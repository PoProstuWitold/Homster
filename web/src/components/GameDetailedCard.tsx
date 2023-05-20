import Image from 'next/image'
import Link from 'next/link'

import { Game } from '@/generated/graphql'
import { getStudios } from '@/utils/getStudios'
import { Price } from './Price'
import { formatString } from '@/utils/formatString'
import dayjs from 'dayjs'
import { useState } from 'react'

interface GameDetailedCardProps {
	game: Game
}

export const GameDetailedCard: React.FC<GameDetailedCardProps> = ({ game }) => {
	const [currentMedia, setCurrentMedia] = useState(game.media && game.media[0])

	const [developers, publishers] = getStudios(game.studios as any[])

	return (
		<>
			<div className={`w-full flex flex-col md:flex-row gap-6 h-fit`}>
				<div className="md:w-1/3 flex flex-col justify-between bg-base-300 md:order-last">
					<div className="flex md:flex-col flex-row py-2 md:py-0 text-sm">
						<Image
							placeholder="blur"
							blurDataURL={game.coverImage!}
							width={200} height={80}
							src={game.coverImage!}
							alt={`${game.name} image`}
							className="object-cover w-full hidden md:block"
						/>
						<div className='mx-2 flex flex-col'>
							<p className='text-base line-clamp-3 py-2 mb-4 max-h-20'>
								{game.description}
							</p>
							<div className="flex flex-row flex-wrap">
								<p className="font-semibold mr-2 w-24">developers:</p>
								{developers && developers.map((developer: any, index: number) => <div key={`${developer.id}:${Math.random()}`}>
									<Link href={`/studio/${developer.name.replace(/ /g, "_")}`} className="link link-hover link-primary font-semibold" key={`${developer.id}:${Math.random()}`}>{developer.name}</Link>
									<span className="mr-1">{index < developers.length - 1 ? ', ' : null}</span>
								</div>)}
							</div>
							<div className="flex flex-row flex-wrap">
								<p className="font-semibold mr-2 w-24">publishers:</p>
								{publishers && publishers.map((publisher: any, index: number) => <div key={`${publisher.id}:${Math.random()}`}>
									<Link href={`/studio/${publisher.name.replace(/ /g, "_")}`} className="link link-hover link-primary font-semibold" key={`${publisher.id}:${Math.random()}`}>{publisher.name}</Link>
									<span className="mr-1">{index < publishers.length - 1 ? ', ' : null}</span>
								</div>)}
							</div>
							<div className="flex flex-row flex-wrap">
								<p className="font-semibold mr-2 w-24">status:</p>
								<div>
									{formatString(game.status)}
								</div>
							</div>
							<div className="flex flex-row flex-wrap">
								<p className="font-semibold mr-2 w-24">release date:</p>
								<div>
									{dayjs(new Date(game.releaseDate)).format('DD MMMM YYYY')}
								</div>
							</div>
							<div className="flex flex-col text-sm gap-2 my-2">
								<div className="flex flex-col flex-wrap">
									<p className="font-semibold my-1">genres:</p>
									{!game.genres || !game.genres.length && <p className="italic">No genres assigned</p>}
									<div className="flex flex-row flex-wrap gap-2">
										{game.genres && game.genres.map((genre: any) => <Link href={`/genres/${genre.name.replace(/ /g, "_")}`} className="font-semibold badge badge-outline min-w-fit rounded-sm hover:badge-primary hover:badge-outline" key={`${genre.id}:${Math.random()}`}>{genre.name}</Link>)}
									</div>
								</div>
								<div className="flex flex-col flex-wrap my-2">
									<p className="font-semibold my-1">tags:</p>
									{!game.tags || !game.tags.length && <p className="italic">No tags assigned</p>}
									<div className="flex flex-row flex-wrap gap-2">
										{game.tags && game.tags.map((tag: any) => <Link href={`/tags/${tag.name.replace(/ /g, "_")}`} className="font-semibold badge badge-outline min-w-fit rounded-sm hover:badge-primary hover:badge-outline" key={`${tag.id}:${Math.random()}`}>{tag.name}</Link>)}
									</div>
								</div>
							</div>

							<div className="flex flex-row px-1">
								<div className="flex flex-col justify-center">
									<Price game={game as Game} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col md:w-2/3 ">
					<div className='relative'>
						{currentMedia?.type == 'Image' ?
							<>
								<Image
									placeholder="blur"
									blurDataURL={currentMedia?.url!}
									width={400} height={160}
									src={currentMedia?.url!}
									alt={`${currentMedia?.name} ${currentMedia?.type?.toLocaleLowerCase()}`}
									className="object-cover w-full"
								/>
							</>
							:
							<>
								<video
									width={400} height={160}
									src={currentMedia?.url!}
									className="object-cover w-full"
								/>
							</>
						}
						<div className='bg-base-300 p-4'>
							<p className='text-md font-semibold'>{currentMedia?.name}</p>
							<p className='text-sm'>{currentMedia?.description}</p>
						</div>
					</div>
					<div className="w-full flex overflow-x-scroll mb-auto">
						{game.media && game.media.map((media: any, index: any) => (
							<button
								key={index}
								onClick={() => setCurrentMedia(media)}
								className={`duration-400 delay-100 ease-in-out transition-all  cursor-pointer ${currentMedia?.id === media.id ? 'opacity-100' : 'opacity-40 hover:opacity-80 '}`}
							>
								{media.type === 'Image' &&
									<Image
										width={100}
										height={100}
										src={media.url}
										alt=""
										className={`object-cover w-96`}
									/>
								}
								{media.type !== 'Image' &&
									<video
										width={100}
										height={100}
										src={media.url}
										className="object-cover w-96"
									/>
								}
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	)
}