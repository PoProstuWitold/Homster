import { useGetStudioQuery } from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { formatString } from '@/utils/formatString'
import dayjs from 'dayjs'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NotFound from '../404'

function StudioName() {
	const router = useRouter()
	const name: string = (router.query['name'] as string).replace(/_/g, " ")


    const [{
        data, fetching
    }] = useGetStudioQuery({
        variables: {
            studio: {
                name
            }
        },
        pause: !name
    })

    if(!data && !fetching) {
        return <NotFound/>
    }

	return (
		<>
			<Head>
				<title>{`${name}`}</title>
			</Head>
			<main>
                {data && data.studio &&
                    <div className="flex flex-col min-h-screen md:p-10 p-4">
                        {/* PROFILE PAGE HEADER */}
                        <div className="flex md:flex-row flex-col md:justify-between justify-center gap-6">
                            <div className="">
                                <h1 className="text-4xl font-bold">{name}</h1>
                                <h3 className="text-lg">{formatString(data.studio.type)}</h3>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-10">
                            <div className='p-5 bg-base-300 rounded-lg shadow-2xl col-span-2'>
                            <h4 className='text-2xl'>About</h4>
                            <p>ID: {data.studio.id}</p>
                            </div>
                            <span className='text-xl p-5 bg-base-300 rounded-lg shadow-2xl'>
                                Created: {dayjs(new Date(data.studio.createdAt)).format('DD MMMM YYYY')}
                            </span>
                            <span className='text-xl p-5 bg-base-300 rounded-lg shadow-2xl'>
                                Last active: {dayjs(new Date(data.studio.updatedAt)).format('DD MMMM YYYY')}
                            </span>
                            <div className='md:col-span-1 col-span-2 p-5 bg-base-300 rounded-lg shadow-2xl text-xl'>
                                <h4>Games ({data.studio._count?.games})</h4>
                            </div>
                            <div className='md:col-span-1 col-span-2 p-5 bg-base-300 rounded-lg shadow-2xl text-xl'>
                                <h4>Employees ({data.studio._count?.employees})</h4>
                            </div>
                        </div>
                    </div>
                }
            </main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true, staleWhileRevalidate: true })(StudioName)
