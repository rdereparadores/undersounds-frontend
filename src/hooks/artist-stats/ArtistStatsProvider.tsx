import {
    ArtistStatsContext,
} from "./ArtistStatsContext"

interface ArtistStatsProviderProps {
    children: React.ReactNode
}

export const ArtistStatsProvider = ({ children }: ArtistStatsProviderProps) => {

    const getArtistStats = async () => {
        // TODO: Implementar el método que devuelve las estadísticas del artista
        return null
    }

    return (
        <ArtistStatsContext.Provider value={{
            getArtistStats
        }}>
            {children}
        </ArtistStatsContext.Provider>
    )
}