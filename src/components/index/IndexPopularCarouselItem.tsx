import { Skeleton } from '@/components/ui/skeleton'
import { TrendingSongsResult } from '@/hooks/trending/TrendingSongsContext'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

export const IndexPopularCarouselItem = ({ song, position }: { song: TrendingSongsResult, position: number }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const [imgError, setImgError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setImgLoaded(false)
        setImgError(false)
    }, [song.id])

    const imageUrl = song?.imgUrl || '/placeholder.jpg';

    return (
        <div className='flex flex-none items-center'>
            <p className='font-bold text-9xl -mr-6 -mt-16 select-none z-10 drop-shadow-[8px_8px_8px_rgba(255,255,255,1)]'>{position}</p>
            <div className='text-center'>
                {(!imgLoaded && !imgError) && <Skeleton className='w-48 h-48' />}

                <img
                    alt={`Imagen de ${song?.title || 'una canción'}`}
                    hidden={!imgLoaded || imgError}
                    className='w-48 h-48 rounded-xl hover:brightness-50 transition hover:cursor-pointer'
                    onLoad={() => setImgLoaded(true)}
                    onError={() => {
                        setImgError(true);
                        setImgLoaded(false);
                    }}
                    src={imageUrl}
                    onClick={() => { navigate(`/song/${song?.id}`) }}
                />

                {imgError && (
                    <div
                        className='w-48 h-48 rounded-xl bg-gray-200 flex items-center justify-center cursor-pointer'
                        onClick={() => { navigate(`/song/${song?.id}`) }}
                    >
                        <span className="text-gray-500">No image</span>
                    </div>
                )}

                {(!imgLoaded && !imgError) && <Skeleton className='w-full h-4 mt-1' />}
                {(!imgLoaded && !imgError) && <Skeleton className='w-full h-4 mt-1' />}

                <p hidden={!imgLoaded && !imgError} className='font-medium'>
                    <Link to={`/song/${song?.id}`}>
                        {song?.title || 'Unknown Song'}
                    </Link>
                </p>
                <p hidden={!imgLoaded && !imgError}>
                    <Link to={`/profile/artist/${song?.artist?.id || '#'}`}>
                        {song?.artist?.name || 'Unknown Artist'}
                    </Link>
                </p>
            </div>
        </div>
    )
}