import { createContext } from 'react'
import { UserInfoProps } from '../user/UserContext'

export interface UpdateArtistInfoProps {
    artistName: string,
    artistUsername: string,
    artistProfileImg: File,
    artistBannerImg: File
}

export interface ArtistInfoProps extends UserInfoProps {
    artistName: string,
    artistUsername: string,
    artistImgUrl: string,
    artistBannerImgUrl: string
}

export interface ArtistSongProps {
    _id: string,
    title: string,
    imgUrl: string,
    author: string
}

export interface ArtistAlbumProps {
    title: string,
    imgUrl: string,
    author: string
}

export interface ArtistContextProps {
    getArtistInfo: () => Promise<ArtistInfoProps | undefined>,
    getArtistSongs: () => Promise<ArtistSongProps[] | undefined>,
    updateArtistInfo: (data: Partial<UpdateArtistInfoProps>) => Promise<boolean>
}

export const ArtistContext = createContext<ArtistContextProps>({
    getArtistInfo: async () => {throw new Error()},
    getArtistSongs: async () => [],
    updateArtistInfo: async () => {throw new Error()}
})