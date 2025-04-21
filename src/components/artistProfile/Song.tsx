import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export interface SongArtistsProps {
    name: string;
    artistId: string;
}

export interface SongProps {
    songName: string;
    imgURL: string;
    artists: SongArtistsProps[];
    album: string;
    albumId?: string | null;
}

export function Song({ songName, imgURL, artists, album }: SongProps) {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <Card className="flex justify-between items-center flex-wrap">
            <div className="flex items-center pl-2 visible">
                <Skeleton hidden={imgLoaded} className='w-[75px] h-[75px]' />
                <img
                    alt={`Imagen de ${songName}`}
                    hidden={!imgLoaded}
                    onLoad={() => setImgLoaded(true)}
                    src={imgURL}
                    className="flex rounded-lg p-1 w-[75px] h-[75px] object-cover"
                />
                <Button asChild variant="link">
                    <Link to={`/song/${songName}`}>{songName}</Link>
                </Button>
            </div>
            <div className="visible">
                {artists.map((artist, index) => (
                    <span key={artist.artistId}>
                        <Button asChild variant="link" className="p-0 h-auto">
                            <Link to={`/profile/artist/${artist.artistId}`}>
                                {artist.name}
                            </Link>
                        </Button>
                        {index < artists.length - 1 && ", "}
                    </span>
                ))}
            </div>
            <Button variant="link" className="hidden sm:block">{album}</Button>
        </Card>
    );
}