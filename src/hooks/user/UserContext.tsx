import { createContext } from "react"

export interface UserInfoProps {
    name: string,
    surName: string,
    userName: string,
    imgUrl: string,
    email: string,
    birthDate: Date
}

export interface AddressProps {
    _id?: string,
    default?: boolean,
    name: string,
    surName: string,
    country: string,
    phone: number,
    address: string,
    address2?: string,
    province: string,
    city: string,
    observations?: string,
    alias: string
}

export interface UserContextProps {
    getUserInfo: () => Promise<UserInfoProps>,
    updateUserInfo: (data: Partial<UserInfoProps>) => Promise<boolean>,
    updateUserProfileImage: (image: File) => Promise<boolean>,
    addAddress: (address: AddressProps) => Promise<boolean>,
    generateUserProfileImageAI: (prompt: string) => Promise<string | null>,
    getAddresses: () => Promise<AddressProps[]>,
    removeAddress: (_id: string) => Promise<boolean>,
    setAddressAsDefault: (_addressId: string) => Promise<boolean>
}

export const UserContext = createContext<UserContextProps>({
    getUserInfo: async () => {throw new Error()},
    updateUserInfo: async () => {throw new Error()},
    updateUserProfileImage: () => {throw new Error()},
    generateUserProfileImageAI: async () => null,
    addAddress: async () => false,
    removeAddress: async () => false,
    getAddresses: () => {throw new Error()},
    setAddressAsDefault: async () => false
})