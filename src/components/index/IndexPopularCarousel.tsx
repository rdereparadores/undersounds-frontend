import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'
import { IndexPopularCarouselItem } from './IndexPopularCarouselItem'
import { ProductProvider } from '@/hooks/product/ProductProvider'
import { useTrendingSongs } from "@/hooks/trending/useTrendingSongs"
import { TrendingSong } from '@/hooks/trending/TrendingSongsContext'

export const IndexPopularCarousel = () => {
    const trendingSongs = useTrendingSongs()
    const [songs, setSongs] = useState<TrendingSong[] | undefined>(undefined)

    useEffect(() => {
        trendingSongs.getTrendingSongs().then(result => setSongs(result))
    }, [trendingSongs])


    return (
        <div className='w-5/6 h-fit'>
            <h2 className='text-xl font-medium mb-2'>Popular ahora</h2>
            <Carousel opts={{
                align: 'center',
                dragFree: true
            }} className='w-full relative'>
                <CarouselContent className='w-full'>
                    {songs !== undefined ? (
                        <>
                            {songs.map((song, index) => (
                                <CarouselItem key={index} className='basis-auto'>
                                    <ProductProvider>
                                        <IndexPopularCarouselItem
                                            song={song}
                                            position={index+1}
                                        />
                                    </ProductProvider>
                                </CarouselItem>
                            ))}
                        </>
                    ) : (
                        <>
                            {Array(10).fill(0).map((_, index) => (
                                <CarouselItem key={`skeleton-${index}`} className='basis-auto'>
                                    <Skeleton className='w-48 h-56' />
                                </CarouselItem>
                            ))}
                        </>
                    )}
                </CarouselContent>
                <CarouselPrevious className='max-sm:hidden' />
                <CarouselNext className='max-sm:hidden' />
            </Carousel>
        </div>
    )
}