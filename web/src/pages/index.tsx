/* eslint-disable react-hooks/exhaustive-deps */
import { withUrqlClient } from 'next-urql'
import { urqlClientSsr } from '@/lib/urql/initUrqlClient'
import Image from 'next/image'
import { SpecialOffert } from '@/components/SpecialOffert'

function Home() {

	return (
		<>
			<main className='mb-10'>
				{/* MAIN IMAGE & SEARCH BAR */}
				<section className="relative h-0 md:h-full mb-[28rem] md:mb-2">
					<Image 
						className="z-[-5]"
						src="/images/homster0.jpg"
						alt="layout bg"
						fill
						priority
						style={{
							objectFit: 'cover',
							objectPosition: 'center'
						}}
					/>
					<div className="text-neutral-content">
						<div className="md:pt-14 xl:mx-[10rem] sm:mx-4 mx-0">
							<div className='h-full w-full md:rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70  bg-secondary flex md:flex-row flex-col justify-between'>
								<ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-2 mx-1 p-1">
									<li>
										<button className="btn btn-ghost btn-sm">Your store</button>
									</li>
									<li>
										<button className="btn btn-ghost btn-sm">New & Trending</button>
									</li>
									<li>
										<button className="btn btn-ghost btn-sm">Genres</button>
									</li>
									<li>
										<button className="btn btn-ghost btn-sm">Tags</button>
									</li>
								</ul>
								<input
									type="search"
									placeholder="Search"
									className="input input-secondary mx-2 my-1 input-sm"
								/>
							</div>
						</div> 
						<div className="flex flex-col relative w-full h-60 lg:h-96">
							<div className="md:hidden md:top-0 p-0 m-0 -z-10 w-full">
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
				<section>
					<div className='grid lg:grid-cols-4 grid-cols-1 gap-4 justify-items-center justify-between mx-3 md:mx-4 lg:mx-5'>
						<article>
							<h2 className='text-2xl font-bold my-4'>About Homster</h2>
							<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur lacus id venenatis aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere mollis nulla eget consequat. Vestibulum suscipit viverra eros, eget malesuada odio efficitur vel. Duis pulvinar elit non lorem porta malesuada. Cras tincidunt, leo sed dapibus porta, odio nisl viverra enim, eu pretium arcu diam vitae elit. Curabitur elementum ut metus vitae tincidunt.
							</p>
							<img src={'/images/Logo_Homster.png'} className='w-44 h-44 mx-auto'/>
						</article>
						<article className='lg:col-span-3'>
							<h2 className='text-2xl font-bold my-4'>Featured & Recommended</h2>
							<div className="overflow-hidden">
						{/* Featured */}
							<div className="h-full md:h-[26rem] w-full flex flex-col  md:flex-row">
								<div className="w-full h-full flex md:w-2/3">
									<img src={'/images/homster1.jpg'} alt="" className="object-cover w-full" />
								</div>
								<div className="px-5 h-full w-full md:w-1/3 flex flex-col justify-between bg-base-300">
									<div className="flex flex-col gap-5">
										<h3 className="text-2xl h-[2.4rem] line-clamp-1 mt-4 font-semibold border-b-2 border-base-100">Homsterix</h3>
										<div className="w-full h-[24rem] md:h-[14rem] flex flex-wrap gap-1 justify-between">
										<p className='text-base h-[4.5rem] line-clamp-3'>
										Adventures of little hamster named Natalka in this cruel world
										</p>
										<img
											src={'/images/homster1.jpg'}
											alt=""
											className="object-cover w-[44%]"
											/>
											<img
											src={'/images/homster1.jpg'}
											alt=""
											className="object-cover w-[44%]"
											/>
											<img
											src={'/images/homster1.jpg'}
											alt=""
											className="object-cover w-[44%]"
											/>
											<img
											src={'/images/homster1.jpg'}
											alt=""
											className="object-cover w-[44%]"
											/>
										</div>
									</div>
									<div className="flex flex-row my-4">
										<p className="font-semibold">30USD</p>
									</div>
								</div>
							</div>
							<div className="flex justify-center w-full py-2 gap-2">
								<a href="#item1" className="btn btn-xs">1</a> 
								<a href="#item2" className="btn btn-xs">2</a> 
								<a href="#item3" className="btn btn-xs">3</a> 
								<a href="#item4" className="btn btn-xs">4</a>
							</div>
						</div>
						</article>
						<article className='lg:col-span-4'>
							<h2 className='text-2xl font-bold my-4'>Special offerts</h2>
							<div className='flex flex-wrap gap-10 justify-center'>
								<SpecialOffert />
								<SpecialOffert />
								<SpecialOffert />
								<SpecialOffert />
							</div>
						</article>
					</div>
				</section>
			</main>
		</>
	)
}

export default withUrqlClient(urqlClientSsr, { ssr: true })(Home)