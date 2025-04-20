import { Skeleton } from '@/components/ui/skeleton'
import { TrendingSong } from '@/hooks/trending/TrendingSongsContext'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export const IndexPopularCarouselItem = ({ song, position }: { song: TrendingSong, position: number }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='flex flex-none items-center'>
            <p className='font-bold text-9xl -mr-6 -mt-16 select-none z-10 drop-shadow-[8px_8px_8px_rgba(255,255,255,1)]'>{position}</p>
            <div className='text-center'>
                {(!imgLoaded) && <Skeleton className='w-48 h-48' />}

                <img
                    alt={`Imagen de ${song?.title || 'una canción'}`}
                    hidden={!imgLoaded}
                    className='w-48 h-48 rounded-xl hover:brightness-50 transition hover:cursor-pointer'
                    onLoad={() => setImgLoaded(true)}
                    src={song.imgUrl}
                    onClick={() => { navigate(`/song/${song._id}`) }}
                />

                <p className='font-medium'>
                    <Link to={`/song/${song._id}`}>
                        {song.title}
                    </Link>
                </p>
                <p>{song.author.artistName}</p>
            </div>
        </div>
    )
}