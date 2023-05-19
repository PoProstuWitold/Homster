import { memo } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import Image from 'next/image'

import { formatString } from '@/utils/formatString'
import { getStudios } from '@/utils/getStudios'
import { Game } from '@/generated/graphql'
import { Price } from './Price'

export const GameCard = memo(({game}: { game: Game }) => {
	GameCard.displayName = 'GameItem'
    const [developers, publishers] = getStudios(game.studios as any[])
	return (
	  <div key={`${game.id}:${Math.random()}`} className="flex flex-col p-5 bg-base-300 m-5 h-86 gap-3 rounded-xl cursor-default hover:shadow-2xl duration-500 hover:cursor-pointer">
		<div className="flex flex-row items-center justify-between border-b-2 pb-2 border-base-100">
			<h3 className="text-2xl h-[2.4rem] line-clamp-1">{game.name}</h3>
			{game.adultOnly &&
				<span className="mx-1 p-2 text-sm bg-error font-extrabold rounded-[100%]">
					+18
				</span>
			}
		</div>
		{game && game.coverImage &&
			<Image className='w-full h-40 border-b-2 my-2 border-base-100' src={game.coverImage} alt="game image" width={900} height={400} style={{ objectFit: 'cover' }}/>
		}
        <p className="text-base h-[4.5rem] line-clamp-3">{game.description}</p>
		<div className="flex flex-row text-sm">
			<div className="w-1/2">
				<p className="font-semibold line-clamp-2">developers:</p>
				<div className="flex flex-row flex-wrap">
					{developers.map((developer: any, index: number) => <div key={`${developer.id}:${Math.random()}`}>
						<Link href={`/studio/${developer.name.replace(/ /g, "_")}`} className="link link-hover link-primary font-semibold" key={`${developer.id}:${Math.random()}`}>{developer.name}</Link>
						<span className="mr-1">{index < developers.length - 1 ? ', ' : null}</span>
					</div>)}
				</div>
			</div>
			<div className="w-1/2">
				<p className="font-semibold line-clamp-2">publishers:</p>
				<div className="flex flex-row flex-wrap">
					{publishers.map((publisher: any, index: number) => <div key={`${publisher.id}:${Math.random()}`}>
						<Link href={`/studio/${publisher.name.replace(/ /g, "_")}`} className="link link-hover link-primary font-semibold" key={`${publisher.id}:${Math.random()}`}>{publisher.name}</Link>
						<span className="mr-1">{index < publishers.length - 1 ? ', ' : null}</span>
					</div>)}
				</div>
			</div>
		</div>
		<div className="flex flex-row text-sm">
			<div className="w-1/2">
				<p className="font-semibold">status:</p>
				<div className="flex flex-row flex-wrap">
					{formatString(game.status)}
				</div>
			</div>
			<div className="w-1/2">
				<p className="font-semibold">release date:</p>
				<div className="flex flex-row flex-wrap">
					{dayjs(new Date(game.releaseDate)).format('DD MMMM YYYY')}
				</div>
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
		<div className="flex justify-between mt-auto">
			<div>
				<a href={`/app/${game.id}/${game.name.replace(/ /g, "_")}`} className="btn btn-outline btn-secondary rounded-sm">Visit Store page</a>
			</div>
			<div className="flex flex-col justify-center">
				<Price game={game} />
			</div>
		</div>
	  </div>
	)
})