import { memo } from 'react'
import { getStudios } from '@/utils/getStudios'
import Link from 'next/link'
import { formatString } from '@/utils/formatString'
import dayjs from 'dayjs'
dayjs().format()

export const GameCard = memo(({game, index}: any) => {
	GameCard.displayName = 'GameItem'
    const [developers, publishers] = getStudios(game.studios)
	return (
	  <div key={`${game.id}:${Math.random()}`} className="flex flex-col p-5 w-[24rem] bg-base-300 m-5 h-86 gap-3 rounded-xl">
		<div className="flex flex-row items-center justify-between border-b-2 pb-2 border-base-100">
			<h3 className="text-2xl h-10">{game.name}</h3>
			{game.adultOnly &&
				<span className="mx-1 p-2 text-sm bg-error font-extrabold rounded-[100%]">
					+18
				</span>
			}
		</div>
        <p className="text-base h-16">{game.description}</p>
		<div className="flex flex-row text-sm">
			<div className="w-1/2">
				<p className="font-semibold">developers:</p>
				<div className="flex flex-row flex-wrap">
					{developers.map((developer: any, index: number) => <div key={`${developer.id}:${Math.random()}`}>
						<Link href={`/studio/${developer.name.replace(/ /g, "_")}`} className="link link-hover link-primary font-semibold" key={`${developer.id}:${Math.random()}`}>{developer.name}</Link>
						<span className="mr-1">{index < developers.length - 1 ? ', ' : null}</span>
					</div>)}
				</div>
			</div>
			<div className="w-1/2">
				<p className="font-semibold">publishers:</p>
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
					{dayjs(new Date(game.releasedAt)).format('DD MMMM YYYY')}
				</div>
			</div>
		</div>
		<div className="flex flex-col text-sm gap-2 my-2">
			<div className="flex flex-col flex-wrap">
				<p className="font-semibold my-1">genres:</p>
				{!game.genres.length && <p className="italic">No genres assigned</p>}
				<div className="flex flex-row flex-wrap gap-2">
					{game.genres && game.genres.map((genre: any) => <Link href={`/genres/${genre.name.replace(/ /g, "_")}`} className="font-semibold badge badge-outline min-w-fit rounded-sm hover:badge-primary hover:badge-outline" key={`${genre.id}:${Math.random()}`}>{genre.name}</Link>)}
				</div>
			</div>
			<div className="flex flex-col flex-wrap my-2">
				<p className="font-semibold my-1">tags:</p>
				{!game.tags.length && <p className="italic">No tags assigned</p>}
				<div className="flex flex-row flex-wrap gap-2">
					{game.tags && game.tags.map((tag: any) => <Link href={`/tags/${tag.name.replace(/ /g, "_")}`} className="font-semibold badge badge-outline min-w-fit rounded-sm hover:badge-primary hover:badge-outline" key={`${tag.id}:${Math.random()}`}>{tag.name}</Link>)}
				</div>
			</div>
		</div>
		<div className="flex justify-between mt-auto">
			<div>
				<Link href={`/app/${game.id}/${game.name.replace(/ /g, "_")}`} className="btn btn-outline btn-secondary rounded-sm">Visit Store page</Link>
			</div>
			<div className="flex flex-col justify-center">
				<div className="flex flex-col justify-center">
					{game.price === 0 && game.price === game.basicPrice && <p className="font-semibold">Free to play</p>}
					{game.price !== 0 && game.price === game.basicPrice && <p className="font-semibold">{game.price} USD</p>}
					{game.price !== 0 && game.price !== game.basicPrice && <>
						<p className="line-through text-sm">Basic price: {game.basicPrice} USD</p>
						<p className="font-semibold">Current price: {game.price} USD</p>
					</>}
					{game.price === 0 && game.price !== game.basicPrice && <>
						<p className="line-through text-sm">Basic price: {game.basicPrice} USD</p>
						<p className="font-semibold">Current price: FREE</p>
					</>}
				</div>
			</div>
		</div>
	  </div>
	)
})