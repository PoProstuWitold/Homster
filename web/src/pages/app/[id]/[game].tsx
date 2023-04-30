import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { useGetOneGameQuery } from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { StoreNavbar } from '@/components/StoreNavbar'

function Game()  {
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
            <main>
            <StoreNavbar/>
            <div className="md:hidden flex flex-col relative w-full h-60 lg:h-96">
				<div className="md:top-0 p-0 m-0 -z-10 w-full">
					<Image
						src="/images/homster0.jpg"
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
                <div className="text-sm breadcrumbs xl:mx-[10rem] sm:mx-4 mx-0 py-5">
                    <ul>
                        <li><a href={`/store`}>All games</a></li> 
                        <li><a>{data.game.name}</a></li>
                    </ul>
                </div>
                <div className="xl:mx-[10rem] sm:mx-4 mx-0">
                    <h1>{data.game.name}</h1>
                    <p>{data.game.description}</p>
                </div>
            </>}
            </main>
        </>
    )
}

export default withUrqlClient(urqlClientSsr, { ssr: true, staleWhileRevalidate: true })(Game)