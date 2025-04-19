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
import { TrendingSongsResult } from '@/hooks/trending/TrendingSongsContext'
import { ProductProvider } from '@/hooks/product/ProductProvider'
import { useTrendingSongs } from "@/hooks/trending/useTrendingSongs"

export const IndexPopularCarousel = () => {
    const { getTrendingSongs } = useTrendingSongs()
    const [trendingSongs, setTrendingSongs] = useState<TrendingSongsResult[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        let isMounted = true;

        const fetchSongs = async () => {
            try {
                setIsLoading(true)
                const songs = await getTrendingSongs()

                if (isMounted && songs && songs.length > 0) {
                    setTrendingSongs(songs)
                }
            } catch (error) {
                console.error("Error in fetchSongs:", error)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }
        fetchSongs().catch(console.error)

        return () => {
            isMounted = false;
        }
    }, [getTrendingSongs])

    const showSkeletons = isLoading || !trendingSongs || trendingSongs.length === 0;

    return (
        <div className='w-5/6 h-fit'>
            <h2 className='text-xl font-medium mb-2'>Popular ahora</h2>
            <Carousel opts={{
                align: 'center',
                dragFree: true
            }} className='w-full relative'>
                <CarouselContent className='w-full'>
                    {!showSkeletons ? (
                        <>
                            {trendingSongs.map((song, index) => (
                                <CarouselItem key={song.id || `song-${index}`} className='basis-auto'>
                                    <ProductProvider>
                                        <IndexPopularCarouselItem
                                            song={song}
                                            position={index + 1}
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