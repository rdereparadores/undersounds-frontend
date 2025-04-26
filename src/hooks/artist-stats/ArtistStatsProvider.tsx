import { api } from "@/lib/api"
import {
    ArtistStatsContext,
    ArtistStatsProps,
} from "./ArtistStatsContext"

interface ArtistStatsProviderProps {
    children: React.ReactNode
}

export const ArtistStatsProvider = ({ children }: ArtistStatsProviderProps) => {

    const getArtistStats = async () => {
        const result = await api.get('/api/artist/stats')
        if (result.data.error) throw new Error()
        return result.data.data as ArtistStatsProps
    }

    return (
        <ArtistStatsContext.Provider value={{ getArtistStats }}>
            { children }
        </ArtistStatsContext.Provider>
    )
}