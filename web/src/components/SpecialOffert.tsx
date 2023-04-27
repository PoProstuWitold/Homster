import React from 'react'

interface SpecialOffertProps {

}

export const SpecialOffert: React.FC<SpecialOffertProps> = ({}) => {
    return (
        <>
        <div>
            <div
                className="group 
            overflow-hidden
            relative shadow-lg max-w-xs"
            >
                <a href="/app/ba456c8a-8093-432c-99d6-8fadeae1ea6c/Homsterix_2" className="absolute z-10 top-0 bottom-0 left-0 right-0" />
                <a>
                <img
                    className="block group-hover:opacity-40 transition-opacity duration-700 h-[20rem]"
                    src="/images/homster2.jpg"
                />
                <div className="absolute bg-black flex items-center group-hover:-top-0 group-hover:opacity-100 duration-700 top-full right-0 w-full opacity-0 h-1/2 transition-all">
                    <div
                    className=""
                    style={{
                        backgroundImage:
                        'url("https://cdn.cloudflare.steamstatic.com/steam/apps/230410/ss_2d79448091149a8cc790b62e7422615a011d015a.600x338.jpg?t=1637183731")'
                    }}
                    >
                    <iframe width="320" height="315"
                        src="https://www.youtube.com/embed/uLKuXchbQYQ?autoplay=1&mute=1">
                    </iframe>
                    </div>
                </div>
                </a>
                <div
                className="absolute  bg-gradient-to-br duration-700 from-green-800 to-blue-800 text-white block left-0 right-0 top-full text-base h-1/2 w-full opacity-50 
                transition-all group-hover:top-1/2 group-hover:opacity-100"
                >
                <a></a>
                <div className="py-4 text-xs px-7">
                    <a>
                    <div className="text-xl font-bold">Homsterix 2</div>
                    </a>
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                        <span className="uppercase whitespace-nowrap text-xs md:text-sm">
                            Developers:{" "}
                        </span>
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                            <a href="/studio/Vishapia">
                            Vishapia
                            </a>
                        </span>
                    </div>
                    <div className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                        <span className="uppercase whitespace-nowrap text-xs md:text-sm">
                            Publishers:{" "}
                        </span>
                        <span className="whitespace-nowrap overflow-hidden overflow-ellipsis relative z-20">
                            <a href="/studio/Witq_Games">
                            Witq Games
                            </a>
                        </span>
                    </div>
                </div>
                <div className="absolute left-0 pl-7">
                    <div>
                        <a href={`/app/2ffa7156-3a97-47fc-be16-f41c0a271579/yearningly_World_Account`} className="btn btn-outline btn-secondary rounded-sm">Visit Store page</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

        </>
    )
}