import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

interface AlbumProps {
    id: string;
    title: string;
    artist: string;
    artistId: string;
    imgUrl: string;
    releaseYear: number;
}

export function Album({ id, title, artist, artistId, imgUrl, releaseYear }: AlbumProps) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <div className="flex flex-col gap-1">
            <Skeleton hidden={imgLoaded} className='w-[250px] h-[250px]' />
            <img
                alt={`Portada de ${title}`}
                hidden={!imgLoaded}
                onLoad={() => setImgLoaded(true)}
                src={imgUrl}
                className="rounded-lg w-[250px] h-[250px] object-cover"
            />
            <Link to={`/album/${id}`}><p className="font-bold">{title}</p></Link>
            <Link to={`/profile/artist/${artistId}`}><p className="font-bold -mt-1">{artist}</p></Link>
            <p>{releaseYear}</p>
        </div>
    );
}