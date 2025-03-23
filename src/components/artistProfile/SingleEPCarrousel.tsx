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
        <div className="w-[95%] h-fit flex flex-col flex-wrap gap-2">
            <p className="font-bold text-2xl">Single y EPs</p>        

            <Carousel className="w-full relative">
                <CarouselContent>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                    <CarouselItem className=" basis-auto"><SingleEP></SingleEP></CarouselItem>
                </CarouselContent>
                <CarouselPrevious className='max-sm:hidden'/>
                <CarouselNext className='max-sm:hidden'/>
            </Carousel>
        </div>


    )
}