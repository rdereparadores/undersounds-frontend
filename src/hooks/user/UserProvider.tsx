import { api } from "@/lib/api"
import { AddressProps, UserContext, UserInfoProps } from "./UserContext"
import { toast } from "sonner"

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

    const setAddressAsDefault = async (_id: string) => {
        try {
            const result = await api.patch('/api/user/profile/address/set-default', { _id })
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
            const result = await api.post('/api/ai/image', { prompt })
            return result.data.data.imgUrl
        } catch (_err) {
            console.log(_err)
            return null
        }
    }

    const isFollowing = async (artistUsername: string) => {
        try {
            const result = await api.post('/api/user/is-following', { artistUsername })
            if (result.data.error) return false
            return result.data.data.following as boolean
        } catch {
            return false
        }
    }

    const follow = async (artistUsername: string) => {
        try {
            const result = await api.post('/api/user/follow', { artistUsername })
            if (result.data.error) return false
            return true
        } catch {
            toast.error('Debes iniciar sesión primero')
            return false
        }
    }

    const unfollow = async (artistUsername: string) => {
        try {
            const result = await api.post('/api/user/unfollow', { artistUsername })
            if (result.data.error) return false
            return true
        } catch {
            return false
        }
    }

    return (
        <UserContext.Provider
        value={{
        getUserInfo, 
        updateUserInfo, 
        updateUserProfileImage, 
        generateUserProfileImageAI, 
        addAddress, 
        getAddresses, 
        removeAddress, 
        setAddressAsDefault, 
        isFollowing, 
        follow, 
        unfollow
        }}>
            {children}
        </UserContext.Provider>
    )
}