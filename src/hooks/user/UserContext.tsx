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
    updateUserInfo: (data: Partial<UserInfoProps>) => Promise<boolean>,
    updateUserProfileImage: (image: File) => Promise<boolean>,
    getArtistInfo: () => Promise<ArtistInfoProps>,
}

export const UserContext = createContext<UserContextProps>({
    getUserInfo: async () => {throw new Error()},
    updateUserInfo: async () => {throw new Error()},
    updateUserProfileImage: () => {throw new Error()},
    getArtistInfo: async () => {throw new Error()},
})