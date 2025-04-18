import { createContext } from "react";

export interface PublishSongProps {
    title: string,
    description: string,
    img: File,
    song: File,
    priceDigital: number,
    priceCd: number,
    priceVinyl: number,
    priceCassette: number
    collaborators: string[],
    genres: string[] 
}

export interface PublishAlbumProps {
    title: string,
    description: string,
    albumImage: File,
    songs: string[], //Pasa los ids de las canciones 
    priceDigital: number,
    priceCd: number,
    priceVinyl: number,
    priceCassette: number
}

interface ArtistReleaseContextProps {
    generateAiCover: (prompt: string) => Promise<string | null>,
    publishSong: (data: PublishSongProps) => Promise<string | null>,
    publishAlbum: (data: PublishAlbumProps) => Promise<string | null>
}

export const ArtistReleaseContext = createContext<ArtistReleaseContextProps>({
    generateAiCover: async () => '',
    publishSong: async () => '',
    publishAlbum: async () => ''
})