import { createContext } from "react"

export interface ArtistStatsProps {
    copiesSold: {
        thisMonth: number,
        pastMonth: number
    },
    releases: {
        thisMonth: number,
        pastMonth: number
    },
    mostSoldFormat: {
        format: string,
        percentage: number
    },
    salesFormat: {
        digital: number,
        cd: number,
        cassette: number,
        vinyl: number
    },
    topProducts: {
        title: string,
        sales: number
    }[],
    monthlyListeners: {
        thisMonth: number,
        pastMonth: number
    }
}

export interface ArtistStatsContextProps {
    getArtistStats: () => Promise<ArtistStatsProps>
}

export const ArtistStatsContext = createContext<ArtistStatsContextProps>({
    getArtistStats: async () => {throw new Error()}
})