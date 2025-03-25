import { useContext } from "react"
import { GlobalStatsContext } from './GlobalStatsContext'

export const useGlobalStats = () => {
    return useContext(GlobalStatsContext)
}