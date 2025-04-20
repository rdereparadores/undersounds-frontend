import { api } from "@/lib/api"
import { UserStatsContext, UserStatsProps } from "./UserStatsContext"

export const UserStatsProvider = ({ children }: { children: React.ReactNode }) => {

    const getUserStats = async () => {
        const result = await api.get('/api/user/stats')
        if (result.data.error) throw new Error()
        return result.data.data as UserStatsProps
    }

    return (
        <UserStatsContext.Provider value={{ getUserStats }}>
            { children }
        </UserStatsContext.Provider>
    )
}