import { useContext } from 'react'
import { UserStatsContext } from './UserStatsContext'

export const useUserStats = () => {
    return useContext(UserStatsContext)
}