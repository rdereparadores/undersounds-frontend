import { createContext } from 'react'

export interface TrendingSong {
    _id: string,
    imgUrl: string,
    title: string,
    author: {
        _id: string,
        artistName: string
    }
}

export interface TrendingSongsContextProps {
    getTrendingSongs: () => Promise<TrendingSong[]>
}

export const TrendingSongsContext = createContext<TrendingSongsContextProps>({
    getTrendingSongs: async () => []
})