import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Album } from "./Album"

export function AlbumCarrousel() {
    return (
        <div className="w-[95%] h-fit flex flex-col flex-wrap gap-2">
            <p className="font-bold text-2xl">Álbumes</p>        

            <Carousel className="w-full relative">
                <CarouselContent>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className=" basis-auto"><Album></Album></CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='max-sm:hidden'/>
                <CarouselNext className='max-sm:hidden'/>
            </Carousel>
        </div>


    )
}