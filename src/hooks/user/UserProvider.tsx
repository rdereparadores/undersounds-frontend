import { api } from "@/lib/api"
import { UserContext, UserInfoProps } from "./UserContext"
import axios from "axios"

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

    const generateUserProfileImageAI = async (prompt: string) => {
        try {
            const result = await axios.post('/api/ai/cover', { prompt })
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
        <UserContext.Provider value={{ getUserInfo, getArtistInfo, updateUserInfo, updateUserProfileImage, generateUserProfileImageAI }}>
            {children}
        </UserContext.Provider>
    )
}