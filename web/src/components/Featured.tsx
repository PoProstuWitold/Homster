export const Featured: React.FC = () => {
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
							<div className="h-full md:h-[26rem] w-full flex flex-col  md:flex-row">
								<div className="w-full h-full flex md:w-2/3">
									<img src={'/images/homster1.jpg'} alt="" className="object-cover w-full" />
								</div>
								<div className="px-5 h-full w-full md:w-1/3 flex flex-col justify-between bg-base-300">
									<div className="flex flex-col">
										<a href={`/app/ba456c8a-8093-432c-99d6-8fadeae1ea6c/Homsterix_2`} className="text-2xl h-[2.4rem] line-clamp-1 mt-4 font-semibold border-b-2 border-base-100">Homsterix 2</a>
										<p className='text-base line-clamp-2 py-2'>
										Amazing continuation of hamster Natalka adventures!
										</p>
										<div className="w-full flex flex-wrap gap-5 justify-between">
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
									<div className="flex flex-row my-2">
									<div className="flex flex-col justify-center">
										<p className="line-through text-sm">Basic price: 7 USD</p>
										<p className="font-semibold">Current price: 5 USD</p>
									</div>
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
					</div>
			</section>
        </>
    )
}