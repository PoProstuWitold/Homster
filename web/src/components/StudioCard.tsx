import { memo } from 'react'
import dayjs from 'dayjs'
import { formatString } from '@/utils/formatString'
import { Studio, useMeQuery } from '@/generated/graphql'
import Link from 'next/link'
import { isUserStudioEmployee } from '@/utils/isUserStudioEmployee'

export const StudioCard = memo(({ studio }: { studio: Studio }) => {
	const [{
		data: authData
	}] = useMeQuery({
		requestPolicy: 'cache-first'
	})

	StudioCard.displayName = 'StudioItem'

	return (
		<div key={`${studio.id}:${Math.random()}`} className="flex flex-col p-5 w-[24rem] bg-base-300 m-5 h-86 gap-3 rounded-xl cursor-default">
			<div className="flex flex-row items-center justify-between border-b-2 pb-2 border-base-100">
				<Link href={`/studio/${studio.name.replace(/ /g, "_")}`}>
					<h3 className="text-2xl h-[2.4rem] line-clamp-1">{studio.name}</h3>
				</Link>
				{authData && authData.me && authData.me.profile && isUserStudioEmployee(studio, authData.me.profile) &&
					<span className="text-xs italic min-w-fit">
						(you work here)
					</span>
				}
			</div>
			<div className="flex flex-row text-sm">
				<div className="w-1/2">
					<p className="font-semibold">Games:</p>
					<div className="flex flex-row flex-wrap">
						{studio._count?.games}
					</div>
				</div>
				<div className="w-1/2">
					<p className="font-semibold">Employees:</p>
					<div className="flex flex-row flex-wrap">
						{studio._count?.employees}
					</div>
				</div>
			</div>
			<div className="flex flex-row text-sm">
				<div className="w-1/2">
					<p className="font-semibold">Status:</p>
					<div className="flex flex-row flex-wrap">
						{formatString(studio.type)}
					</div>
				</div>
				<div className="w-1/2">
					<p className="font-semibold">Created:</p>
					<div className="flex flex-row flex-wrap">
						{dayjs(new Date(studio.createdAt)).format('DD MMMM YYYY')}
					</div>
				</div>
			</div>
		</div>
	)
})