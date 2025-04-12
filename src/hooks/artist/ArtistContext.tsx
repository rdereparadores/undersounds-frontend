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

export interface ArtistContextProps {
    getArtistInfo: () => Promise<ArtistInfoProps | undefined>,
    updateArtistInfo: (data: Partial<UpdateArtistInfoProps>) => Promise<boolean>
}

export const ArtistContext = createContext<ArtistContextProps>({
    getArtistInfo: async () => {throw new Error()},
    updateArtistInfo: async () => {throw new Error()}
})