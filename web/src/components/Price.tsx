import React from 'react'
import { Game } from '@/generated/graphql'

interface PriceProps {
    game: Partial<Game>
}

export const Price: React.FC<PriceProps> = ({
    game
}) => {
    return (
        <>
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
        </>
    )
}