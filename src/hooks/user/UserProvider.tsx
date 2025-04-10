import { api } from "@/lib/api"
import { AddressProps, UserContext, UserInfoProps } from "./UserContext"

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const getUserInfo = async () => {
        try {
            const result = await api.get('/api/user/profile')
            return result.data.data
        } catch {
            return undefined
        }
    }

    const updateUserInfo = async (data: Partial<UserInfoProps>) => {
        try {
            await api.post('/api/user/profile/update', data)
            return true
        } catch {
            return false
        }
    }

    const updateUserProfileImage = async (image: File) => {
        try {
            console.log('es un fichero mi pana')
            const formData = new FormData()
            formData.append('profileImage', image)
            const result = await api.post('/api/user/profile/update/image', formData)
            if (result.data.error) {
                return false
            }
            return true
        } catch {
            return false
        }
    }

    const addAddress = async (address: AddressProps) => {
        try {
            const result = await api.post('/api/user/profile/address/add', { address })
            if (result.data.error) {
                return false
            }
            return true
        } catch {
            return false
        }
    }

    const removeAddress = async (_id: string) => {
        try {
            const result = await api.post('/api/user/profile/address/remove', { _id })
            if (result.data.error) {
                return false
            }
            return true
        } catch {
            return false
        }
    }

    const getAddresses = async () => {
        try {
            const result = await api.get('/api/user/profile/address')
            return result.data.data
        } catch {
            return null
        }
    }

    const setAddressAsDefault = async (_addressId: string) => {
        console.log(_addressId)
        try {
            const result = await api.patch('/api/user/profile/address/set-default', { addressId: _addressId })
            if (result.data.error) {
                return false
            }
            return true
        } catch {
            return false
        }
    }

    const generateUserProfileImageAI = async (prompt: string) => {
        try {
            const result = await api.post('/api/ai/cover', { prompt })
            return result.data.msg.img_url
        } catch (_err) {
            console.log(_err)
            return null
        }
    }

    const getArtistInfo = async () => {
        try {
            const result = await api.get('/api/artist/profile')
            return result.data.data
        } catch {
            return undefined
        }
    }

    return (
        <UserContext.Provider value={{ getUserInfo, getArtistInfo, updateUserInfo, updateUserProfileImage, generateUserProfileImageAI, addAddress, getAddresses, removeAddress, setAddressAsDefault }}>
            {children}
        </UserContext.Provider>
    )
}