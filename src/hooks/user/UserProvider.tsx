import { api } from "@/lib/api"
import { UserContext, UserInfoProps } from "./userContext"

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const getUserInfo = async () => {
        try {
            const result = await api.get('/api/user/profile')
            console.log(result.data.data)
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
            console.log(result.data)
            if (result.data.error) {
                return false
            }
            return true
        } catch {
            return false
        }
    }

    const getArtistInfo = async () => {
        try {
            const result = await api.get('/api/artist/profile')
            console.log(result.data.data)
            return result.data.data
        } catch {
            return undefined
        }
    }

    return (
        <UserContext.Provider value={{ getUserInfo, getArtistInfo, updateUserInfo, updateUserProfileImage }}>
            {children}
        </UserContext.Provider>
    )
}