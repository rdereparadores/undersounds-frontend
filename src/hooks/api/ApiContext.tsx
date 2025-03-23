import { createContext } from 'react'

export interface ApiContextSongProps {
    title: string,
    artist: string,
    popularNo?: string,
    coverUrl: string,
    songId: number
}

interface ApiContextProps {
    getTop10Songs: () => Promise<ApiContextSongProps[]>
}

export const ApiContext = createContext<ApiContextProps>({
    getTop10Songs: async () => ([
        { title: '', artist: '', popularNo: '', coverUrl: '', songId: 5 }
    ])
})