import { Song, SongProps } from "./Song";

export interface TopSongsProps { topSongs: SongProps[] }

const ejemplo = [
    {
        songName: "Lonely Road",
        imageUrl: "https://picsum.photos/75/75",
        artists: [
            {
                name: "mgk",
                artistId: "4190297"
            },
            {
                name: "Jelly Roll",
                artistId: "4190297"
            }
        ],
        album: "Lonely Road",
    },
    {
        songName: "Lonely Road",
        imageUrl: "https://picsum.photos/75/75",
        artists: [
            {
                name: "mgk",
                artistId: "4190297"
            },
            {
                name: "Jelly Roll",
                artistId: "4190297"
            }
        ],
        album: "Lonely Road",
    },
    {
        songName: "Lonely Road",
        imageUrl: "https://picsum.photos/75/75",
        artists: [
            {
                name: "mgk",
                artistId: "4190297"
            },
            {
                name: "Jelly Roll",
                artistId: "4190297"
            }
        ],
        album: "Lonely Road",
    },
    {
        songName: "Lonely Road",
        imageUrl: "https://picsum.photos/75/75",
        artists: [
            {
                name: "mgk",
                artistId: "4190297"
            },
            {
                name: "Jelly Roll",
                artistId: "4190297"
            }
        ],
        album: "Lonely Road",
    },
    {
        songName: "Lonely Road",
        imageUrl: "https://picsum.photos/75/75",
        artists: [
            {
                name: "mgk",
                artistId: "4190297"
            },
            {
                name: "Jelly Roll",
                artistId: "4190297"
            }
        ],
        album: "Lonely Road",
    }
]

export function TopSongs() {
    return (
        <>
            <div className="h-full w-full flex flex-col flex-wrap gap-2">
                {ejemplo.map((item, index) =>
                    <Song key={index} songName={item.songName} imgURL={item.imageUrl}
                        artists={item.artists} album={item.album} />
                )}
            </div>
        </>
    )
}