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

export interface UpdateSongProps {
    songId: string,
    title?: string,
    description?: string,
    img?: File,
    song?: File,
    priceDigital?: number,
    priceCd?: number,
    priceVinyl?: number,
    priceCassette?: number
    collaborators?: string[],
    genres?: string[] 
}

export interface UpdateAlbumProps {
    albumId: string,
    title?: string,
    description?: string,
    albumImage?: File,
    songArray: string[],
    priceDigital?: number,
    priceCd?: number,
    priceVinyl?: number,
    priceCassette?: number,
}

export interface CollaboratorsFound {
    artistUsername: string,
    artistName: string,
    artistImgUrl: string 
}

interface ArtistReleaseContextProps {
    generateAiCover: (prompt: string) => Promise<string | null>,
    publishSong: (data: PublishSongProps) => Promise<string | null>,
    publishAlbum: (data: PublishAlbumProps) => Promise<string | null>,
    updateSong: (data: UpdateSongProps) => Promise<string | null>,
    updateAlbum: (data: UpdateAlbumProps) => Promise<string | null>,
    searchCollaborators: (query: string) => Promise<CollaboratorsFound[] | null>
}

export const ArtistReleaseContext = createContext<ArtistReleaseContextProps>({
    generateAiCover: async () => '',
    publishSong: async () => '',
    publishAlbum: async () => '',
    updateSong: async () => '',
    updateAlbum: async () => '',
    searchCollaborators: async () => []
})