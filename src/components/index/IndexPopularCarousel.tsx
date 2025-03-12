import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'

interface IndexPopularCarouselItemProps {
    title: string,
    artist: string,
    popularNo: number,
    imgUrl: string
}

const IndexPopularCarouselItem = ({ title, artist, popularNo, imgUrl }: IndexPopularCarouselItemProps) => {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <div className='flex flex-none items-center'>
            <p className='font-bold text-9xl -mr-6 -mt-16 select-none'>{popularNo}</p>
            <div className='text-center'>
                <Skeleton hidden={imgLoaded} className='w-48 h-48' />
                <img 
                    hidden={!imgLoaded}
                    className='w-48 h-48 rounded-xl hover:brightness-50 transition hover:cursor-pointer'
                    onLoad={() => setImgLoaded(true)}
                    src={imgUrl}
                />
                
                <Skeleton hidden={imgLoaded} className='w-full h-4 mt-1' />
                <Skeleton hidden={imgLoaded} className='w-full h-4 mt-1' />

                <p hidden={!imgLoaded} className='font-medium'>{title}</p>
                <p hidden={!imgLoaded}>{artist}</p>
            </div>
        </div>
    )
}

export const IndexPopularCarousel = () => (
    <div className='w-5/6 h-fit'>
        <h2 className='text-xl font-medium mb-2'>Popular ahora</h2>
        <Carousel opts={{
            align: 'center',
            dragFree: true
        }} className='w-full relative'>
            <CarouselContent className='w-full'>
                {Array.from({ length: 10 }).map((_, index) => (
                    <CarouselItem key={index} className='basis-auto'>
                        <IndexPopularCarouselItem
                            title='Titulo'
                            artist='Artista'
                            popularNo={index + 1}
                            imgUrl='https://picsum.photos/200'
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className='max-sm:hidden' />
            <CarouselNext className='max-sm:hidden' />
        </Carousel>
    </div>
)