import { createContext } from "react"

export interface UserInfoProps {
    name: string,
    surName: string,
    userName: string,
    imgUrl: string,
    email: string,
    birthDate: Date
}

export interface ArtistInfoProps extends UserInfoProps {
    artistName: string,
    artistUserName: string
}

export interface UserContextProps {
    getUserInfo: () => Promise<UserInfoProps>,
    getArtistInfo: () => Promise<ArtistInfoProps>
}

export const UserContext = createContext<UserContextProps>({
    getUserInfo: async () => {throw new Error()},
    getArtistInfo: async () => {throw new Error()}
})