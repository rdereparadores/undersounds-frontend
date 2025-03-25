import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import { Skeleton } from '@/components/ui/skeleton'
import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/api/useApi'
import { IndexPopularCarouselItem } from './IndexPopularCarouselItem'
import { useGlobalStats } from '@/hooks/globalStats/useGlobalStats'
import { ProductContextResultShortProps } from '@/hooks/product/ProductContext'
import { ProductProvider } from '@/hooks/product/ProductProvider'

export const IndexPopularCarousel = () => {
    const api = useApi()
    const globalStats = useGlobalStats()
    const [top10Songs, setTop10Songs] = useState<undefined | ProductContextResultShortProps[]>(undefined)

    useEffect(() => {
        globalStats.top10Songs().then((songs) => {
            setTop10Songs(songs)
        })
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
                                <ProductProvider>
                                    <IndexPopularCarouselItem
                                        song={song}
                                        position={index + 1}
                                    />
                                </ProductProvider>
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