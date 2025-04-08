import { api } from "@/lib/api"
import { UserContext } from "./userContext"

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
        <UserContext.Provider value={{ getUserInfo, getArtistInfo }}>
            {children}
        </UserContext.Provider>
    )
}