interface StoreNavbarProps {
    className?: string
}

export const StoreNavbar: React.FC<StoreNavbarProps> = ({ className }) => {
    return (
        <>
            <div className={`md:pt-14 xl:mx-[10rem] sm:mx-4 mx-0 ${className}`}>
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
        </>
    )
}