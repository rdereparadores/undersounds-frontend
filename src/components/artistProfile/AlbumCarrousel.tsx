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
        <div className="w-[90%] h-fit flex flex-col flex-wrap gap-2">
            <p className="font-bold text-2xl">Álbumes</p>        

            <Carousel className="w-full relative">
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><Album></Album></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>


    )
}