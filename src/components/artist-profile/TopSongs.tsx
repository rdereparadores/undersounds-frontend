import { ArtistProfileItem } from "@/hooks/artist-profile/ArtistProfileContext"
import { Song } from "./Song"

export function TopSongs({ topSongs }: { topSongs: ArtistProfileItem[] }) {
    if (topSongs.length === 0) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <p>No hay canciones disponibles</p>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col flex-wrap gap-2">
            {topSongs.map((song) => (
                <Song
                    key={song.id}
                    songName={song.songName}
                    imgURL={song.imgURL}
                    artists={song.artists}
                    album={song.album}
                />
            ))}
        </div>
    );
}