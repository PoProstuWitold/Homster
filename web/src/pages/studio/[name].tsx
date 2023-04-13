import { useGetStudioQuery } from '@/generated/graphql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import { formatString } from '@/utils/formatString'
import dayjs from 'dayjs'
import { withUrqlClient } from 'next-urql'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NotFound from '../404'
import Image from 'next/image'
import studio from '.'

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
                <div className="flex flex-col min-h-screen">
                    {data && data.studio &&
                        <>
                        {/* PROFILE PAGE HEADER */}
                        <div className='bg-base-200'>
                            <Image className='absolute w-full object-cover h-60' src={data.studio.cover!} width={840} height={360} alt="gowno"/>
                            <div 
                                className="flex lg:flex-row flex-col gap-6 lg:px-10 mt-16 lg:items-end lg:justify-start lg:text-left justify-center items-center text-center my-4"
                            >
                                <div className="avatar z-40">
                                    <div className="w-64 rounded-2xl">
                                        <Image src={data.studio.avatar!}  width={256} height={256} alt={"studio image"}/>
                                    </div>
                                </div>
                                <div className="flex lg:flex-row flex-col gap-2 lg:gap-6 items-center w-full">
                                    <div className='z-40 min-w-fit'>
                                        <h1 className="text-4xl font-bold">{data.studio.name}</h1>
                                        <h3 className="text-lg">{formatString(data.studio.type)}</h3>
                                    </div>
                                    <span className='divider lg:divider-horizontal m-0 p-0'></span>
                                    <div className='font-bold flex z-40 gap-4 btn-group flex-grow flex-auto md:mx-2 md:px-10 mx-5 px-5 lg:mx-0 lg:px-0 w-full text-center items-center justify-center lg:justify-start'>
                                        <p>Games <span className='badge badge-secondary ml-1 mr-2 w-10'>{data.studio._count?.games}</span></p>
                                        <p>Employees<span className='badge badge-secondary ml-1 w-10'>{data.studio._count?.employees}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* MAIN CONTENT */}
                        </>
                    }
                </div>
            </main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true, staleWhileRevalidate: true })(StudioName)
