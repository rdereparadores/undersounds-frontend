import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Album } from "./Album";

interface AlbumCarrouselProps {
    albums: {
        id: string;
        title: string;
        imgUrl: string;
        artist: string;
        artistId: string;
        releaseYear: number;
    }[];
}

export function AlbumCarrousel({ albums }: AlbumCarrouselProps) {
    if (!albums || albums.length === 0) {
        return null;
    }

    return (
        <div className="w-[95%] h-fit flex flex-col flex-wrap gap-2">
            <p className="font-bold text-2xl">Álbumes</p>

            <Carousel className="w-full relative">
                <CarouselContent>
                    {albums.map((album) => (
                        <CarouselItem key={album.id} className="basis-auto">
                            <Album
                                id={album.id}
                                title={album.title}
                                artist={album.artist}
                                artistId={album.artistId}
                                imgUrl={album.imgUrl}
                                releaseYear={album.releaseYear}
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