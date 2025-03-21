import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'
import { ApiContextSongProps } from '@/hooks/api/ApiContext'
import { useApi } from '@/hooks/api/useApi'
import { IndexPopularCarouselItem } from './IndexPopularCarouselItem'

export const IndexPopularCarousel = () => {
    const api = useApi()
    const [top10Songs, setTop10Songs] = useState<undefined | ApiContextSongProps[]>(undefined)

    useEffect(() => {
        api.getTop10Songs().then(songs => setTop10Songs(songs))
    }, [api])

    return (
        <div className='w-5/6 h-fit'>
            <h2 className='text-xl font-medium mb-2'>Popular ahora</h2>
            <Carousel opts={{
                align: 'center',
                dragFree: true
            }} className='w-full relative'>
                <CarouselContent className='w-full'>
                    {top10Songs !== undefined ?
                        top10Songs?.map((song, index) => (
                            <CarouselItem key={index} className='basis-auto'>
                                <IndexPopularCarouselItem
                                    title={song.title}
                                    artist={song.artist}
                                    popularNo={song.popularNo}
                                    coverUrl={song.coverUrl}
                                    songId={song.songId}
                                />
                            </CarouselItem>
                        ))
                    :
                        <Skeleton className='w-full h-56' />
                    }
                </CarouselContent>
                <CarouselPrevious className='max-sm:hidden' />
                <CarouselNext className='max-sm:hidden' />
            </Carousel>
        </div>
    )
}