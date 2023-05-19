import { Game } from '@/generated/graphql'
import { getStudios } from '@/utils/getStudios'
import Image from 'next/image'

interface SpecialOfferProps {
    game: Game
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ game }) => {
    const [developers, publishers] = getStudios(game.studios as any[])

    return (
        <>
        <div>
            <div
                className="group 
            overflow-hidden
            relative rounded-2xl"
            >
                <Image
                    className="block group-hover:opacity-40 transition-opacity duration-500 h-[24rem] w-[22rem]"
                    src="/images/homster2.jpg"
                    alt="homster"
                    width={470}
                    height={500}
                    style={{
                        objectFit: 'cover'
                    }}
                />
                <div className='duration-500 absolute z-20 top-[1rem] left-[-2.6rem] group-hover:opacity-0 rotate-[-45deg] min-w-[10rem]'>
                    <div className='bg-accent p-2 items-center text-center'>
                        {game.price === 0 &&
                            <span className='text-md font-semibold'>Now free</span>
                        }
                        {game.price < game.basicPrice && game.price !== 0 &&
                            <div className='flex flex-col m-0 p-0'>
                                <span className='text-xs font-semibold'>DISCOUNTED!</span>
                                <span className='text-xs font-semibold'>{game.price}USD</span>
                            </div>
                        }
                    </div>
                </div>
                <div className='duration-500 absolute z-20 bottom-0 right-0 group-hover:bottom-full '>
                    <div className='p-2 h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30'>
                        <h2 className='text-2xl font-bold text-white'>{game.name}</h2>
                    </div>
                </div>
                <div className="absolute justify-center bg-black flex items-center group-hover:-top-0 group-hover:opacity-100 duration-500 top-full right-0 w-full opacity-0 h-1/2 transition-all">
                    <div
                    className=""
                    style={{
                        backgroundImage:
                        'url("https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_2d79448091149a8cc790b62e7422615a011d015a.600x338.jpg?t=1637183731")'
                    }}
                    >
                    <iframe width="340" height="170" title={`${game.name} trailer`}
                        src="https://www.youtube.com/embed/5hs1xQRkzsw">
                    </iframe>
                    </div>
                </div>
                <div
                className="absolute duration-500 bg-base-300 block left-0 right-0 top-full text-base h-1/2 w-full opacity-10 
                transition-all group-hover:top-1/2 group-hover:opacity-100"
                >
                <div className="py-5 text-xs px-5">
                    <span className="text-xl font-bold">{game.name}</span>
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                        <span className="whitespace-nowrap font-semibold">
                            developers:{" "}
                        </span>
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                            {publishers && publishers.map((publisher, index) => {
                                return (
                                    <span key={publisher.id}>
                                        <a className='link link-hover link-primary font-semibold' href={`/studio/${publisher.name.replace(/ /g, "_")}`}>
                                            {publisher.name.replace(/ /g, "_")}
                                        </a>
                                        <span className="mr-[0.01rem]">{index < developers.length ? ', ' : null}</span>
                                    </span>
                                )
                            })}
                        </span>
                    </div>
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                        <span className="whitespace-nowrap font-semibold">
                            publishers:{" "}
                        </span>
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                            {developers && developers.map((developer, index) => {
                                return (
                                    <span key={developer.id}>
                                        <a className='link link-hover link-primary font-semibold' href="/studio/Retro_Rocket">
                                            {developer.name.replace(/ /g, "_")}
                                        </a>
                                        <span className="mr-[0.01rem]">{index < developers.length ? ', ' : null}</span>
                                    </span>
                                )
                            })}
                        </span>
                    </div>
                    <div className='absolute bottom-[1rem]'>
                        <a href={`/app/${game.id}/${game.name.replaceAll(' ', '_')}`} className="btn btn-outline btn-secondary rounded-sm">Visit Store page</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        </>
    )
}