import { useContext } from "react"
import { ArtistStatsContext } from './ArtistStatsContext'

export const useArtistStats = () => {
    return useContext(ArtistStatsContext)
}