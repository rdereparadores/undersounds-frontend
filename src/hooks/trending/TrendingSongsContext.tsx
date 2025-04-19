import { createContext } from 'react'

export interface TrendingSongsResult {
    id: string,
    title: string,
    imgUrl: string,
    plays: number,
    artist: {
        id: string,
        name: string,
    }
}

export interface TrendingSongsContextProps {
    getTrendingSongs: () => Promise<TrendingSongsResult[] | null>
}

export const TrendingSongsContext = createContext<TrendingSongsContextProps>({
    getTrendingSongs: async () => null
})