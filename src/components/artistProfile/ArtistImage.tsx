import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface ArtistImageProps {
    imgUrl: string;
}

export function ArtistImage({ imgUrl }: ArtistImageProps) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <>
            <Skeleton hidden={imgLoaded} className='min-w-full grow min-h-96' />
            <img
                alt="Imagen del artista"
                hidden={!imgLoaded}
                onLoad={() => setImgLoaded(true)}
                src={imgUrl}
                className="rounded-lg w-[100%] h-[75%] object-cover"
            />
        </>
    );
}