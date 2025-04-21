import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { SingleEP } from "./SingleEP";

interface SingleEPCarrouselProps {
    singles: {
        id: string;
        title: string;
        imgUrl: string;
        artist: string;
        artistId: string;
        releaseYear: number;
        type: string;
    }[];
}

export function SingleEPCarrousel({ singles }: SingleEPCarrouselProps) {
    if (!singles || singles.length === 0) {
        return null;
    }

    return (
        <div className="w-[95%] h-fit flex flex-col flex-wrap gap-2">
            <p className="font-bold text-2xl">Singles y EPs</p>

            <Carousel className="w-full relative">
                <CarouselContent>
                    {singles.map((single) => (
                        <CarouselItem key={single.id} className="basis-auto">
                            <SingleEP
                                id={single.id}
                                title={single.title}
                                artist={single.artist}
                                artistId={single.artistId}
                                imgUrl={single.imgUrl}
                                releaseYear={single.releaseYear}
                                type={single.type}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className='max-sm:hidden'/>
                <CarouselNext className='max-sm:hidden'/>
            </Carousel>
        </div>
    );
}