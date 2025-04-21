import { Link } from "react-router";
import { Card } from "../ui/card";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface NewestReleasesProps {
    release: {
        id: string;
        title: string;
        imgUrl: string;
        artist: string;
        artistId: string;
        releaseYear: number;
        type: string;
    };
}

export function NewestReleases({ release }: NewestReleasesProps) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <Link to={`/${release.type.toLowerCase()}/${release.id}`}>
            <div className="flex flex-col gap-2 w-full h-full">
                <Card className="flex flex-col p-2 gap-2">
                    <Skeleton hidden={imgLoaded} className='w-[350px] h-[350px]' />
                    <img
                        alt={`Imagen de ${release.title}`}
                        hidden={!imgLoaded}
                        onLoad={() => setImgLoaded(true)}
                        src={release.imgUrl}
                        className="rounded-lg"
                    />
                    <Link to={`/${release.type.toLowerCase()}/${release.id}`}>
                        <p className="font-bold">{release.title}</p>
                    </Link>
                    <Link to={`/profile/artist/${release.artistId}`}>
                        <p className="font-bold">{release.artist}</p>
                    </Link>
                    <p className="-mt-1">{release.releaseYear}</p>
                </Card>
            </div>
        </Link>
    );
}