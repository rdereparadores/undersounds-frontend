import { createContext } from "react"

export interface UserStatsProps {
    listeningTime: {
        thisMonth: number,
        pastMonth: number
    },
    preferredGenre: {
        thisMonth: string,
        pastMonth: string
    },
    mostListenedArtist: {
        thisMonth: {
            artistName: string,
            percentage: number
        }
    },
    topArtists: {
        artistName: string,
        plays: number
    }[],
    preferredFormat: {
        format: 'digital' | 'cassette' | 'cd' | 'vinyl',
        percentage: number
    },
    ordersFormat: {
        digital: number,
        cd: number,
        vinyl: number,
        cassette: number
    },
    artistBadge: {
        artistName: string,
        artistImgUrl: string,
        percentile: number
    }
}

interface UserStatsContextProps {
    getUserStats: () => Promise<UserStatsProps>
}

export const UserStatsContext = createContext<UserStatsContextProps>({
    getUserStats: async () => {throw new Error()}
})