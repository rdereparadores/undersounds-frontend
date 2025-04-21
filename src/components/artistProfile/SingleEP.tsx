import { useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router";

interface SingleEPProps {
    id: string;
    title: string;
    artist: string;
    artistId: string;
    imgUrl: string;
    releaseYear: number;
    type: string;
}

export function SingleEP({ id, title, artist, artistId, imgUrl, releaseYear, type }: SingleEPProps) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className="flex flex-col">
            <Skeleton hidden={imgLoaded} className='w-[250px] h-[250px]' />
            <img
                alt={`Portada de ${title}`}
                hidden={!imgLoaded}
                onLoad={() => setImgLoaded(true)}
                src={imgUrl}
                className="rounded-lg w-[250px] h-[250px] object-cover"
            />
            <Button asChild variant="link" className="w-fit font-bold justify-start">
                <Link to={`/${type.toLowerCase()}/${id}`}>{title}</Link>
            </Button>
            <Button asChild variant="link" className="w-fit font-bold -mt-1 justify-start">
                <Link to={`/profile/artist/${artistId}`}>{artist}</Link>
            </Button>
            <p>{releaseYear}</p>
        </div>
    );
}