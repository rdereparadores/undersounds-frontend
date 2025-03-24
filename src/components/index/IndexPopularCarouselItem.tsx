import { Skeleton } from '@/components/ui/skeleton'
import { ProductContextResultShortProps } from '@/hooks/product/ProductContext'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export const IndexPopularCarouselItem = ({ song, position }: { song: ProductContextResultShortProps, position: number }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='flex flex-none items-center'>
            <p className='font-bold text-9xl -mr-6 -mt-16 select-none z-10 drop-shadow-[8px_8px_8px_rgba(255,255,255,1)]'>{position}</p>
            <div className='text-center'>
                <Skeleton hidden={imgLoaded} className='w-48 h-48' />
                <img
                    alt="Imagen de una canción"
                    hidden={!imgLoaded}
                    className='w-48 h-48 rounded-xl hover:brightness-50 transition hover:cursor-pointer'
                    onLoad={() => setImgLoaded(true)}
                    src={song?.imgUrl}
                    onClick={() => { navigate(`/song/${song?.id}`) }}
                />

                <Skeleton hidden={imgLoaded} className='w-full h-4 mt-1' />
                <Skeleton hidden={imgLoaded} className='w-full h-4 mt-1' />

                <p hidden={!imgLoaded} className='font-medium'>
                    <Link to={`/song/${song?.id}`}>
                        {song?.title}
                    </Link>
                </p>
                <p hidden={!imgLoaded}>
                    <Link to={`/profile/artist/${song?.artists[0].id}`}>
                        {song?.artists[0].name}
                    </Link>
                </p>
            </div>
        </div>
    )
}