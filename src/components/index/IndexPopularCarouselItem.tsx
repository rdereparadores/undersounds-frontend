import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
import { ApiContextSongProps } from '@/hooks/api/ApiContext'
import { useNavigate } from 'react-router'

export const IndexPopularCarouselItem = ({ title, artist, popularNo, coverUrl, songId }: ApiContextSongProps) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='flex flex-none items-center'>
            <p className='font-bold text-9xl -mr-6 -mt-16 select-none'>{popularNo}</p>
            <div className='text-center'>
                <Skeleton hidden={imgLoaded} className='w-48 h-48' />
                <img
                    hidden={!imgLoaded}
                    className='w-48 h-48 rounded-xl hover:brightness-50 transition hover:cursor-pointer'
                    onLoad={() => setImgLoaded(true)}
                    src={coverUrl}
                    onClick={() => { navigate(`/song/${songId}`) }}
                />

                <Skeleton hidden={imgLoaded} className='w-full h-4 mt-1' />
                <Skeleton hidden={imgLoaded} className='w-full h-4 mt-1' />

                <p hidden={!imgLoaded} className='font-medium'>{title}</p>
                <p hidden={!imgLoaded}>{artist}</p>
            </div>
        </div>
    )
}