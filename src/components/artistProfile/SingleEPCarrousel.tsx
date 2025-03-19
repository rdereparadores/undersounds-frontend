import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { SingleEP } from "./SingleEP"

export function SingleEPCarrousel() {
    return (
        <div className="w-[90%] h-fit flex flex-col flex-wrap gap-2">
            <p className="font-bold text-2xl">Single y EPs</p>        

            <Carousel className="w-full relative">
                <CarouselContent>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className="md:basis-1/2 lg:basis-1/4 basis-auto"><SingleEP></SingleEP></CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>


    )
}