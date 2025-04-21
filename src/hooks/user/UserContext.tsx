import { createContext } from "react"

export interface UserInfoProps {
    name: string,
    surname: string,
    username: string,
    imgUrl: string,
    email: string,
    birthDate: Date
}

export interface AddressProps {
    _id?: string,
    default?: boolean,
    name: string,
    surname: string,
    country: string,
    phone: number,
    address: string,
    address2?: string,
    province: string,
    zipCode: number,
    city: string,
    observations?: string,
    alias: string
}

export interface LibrarySong {
    _id: string,
    imgUrl: string,
    title: string,
    duration: number,
    author: {
        _id: string,
        artistName: string
    },
    collaborators: {
        _id: string,
        artistName: string
    }[]
}

export interface LibraryAlbum {
    _id: string,
    imgUrl: string,
    title: string,
    duration: number,
    author: {
        _id: string,
        artistName: string
    },
    trackList: LibrarySong[]
}

export interface UserContextProps {
    getUserInfo: () => Promise<UserInfoProps>,
    updateUserInfo: (data: Partial<UserInfoProps>) => Promise<boolean>,
    updateUserProfileImage: (image: File) => Promise<boolean>,
    addAddress: (address: AddressProps) => Promise<boolean>,
    generateUserProfileImageAI: (prompt: string) => Promise<string | null>,
    getAddresses: () => Promise<AddressProps[]>,
    removeAddress: (_id: string) => Promise<boolean>,
    setAddressAsDefault: (_id: string) => Promise<boolean>,
    isFollowing: (artistUsername: string) => Promise<boolean>,
    follow: (artistUsername: string) => Promise<boolean>,
    unfollow: (artistUsername: string) => Promise<boolean>,
    getLibrarySongs: () => Promise<LibrarySong[]>,
    getLibraryAlbums: () => Promise<LibraryAlbum[]>
}

export const UserContext = createContext<UserContextProps>({
    getUserInfo: async () => {throw new Error()},
    updateUserInfo: async () => {throw new Error()},
    updateUserProfileImage: () => {throw new Error()},
    generateUserProfileImageAI: async () => null,
    addAddress: async () => false,
    removeAddress: async () => false,
    getAddresses: () => {throw new Error()},
    setAddressAsDefault: async () => false,
    isFollowing: async () => false,
    follow: async () => false,
    unfollow: async () => false,
    getLibrarySongs: async () => [],
    getLibraryAlbums: async () => []
})