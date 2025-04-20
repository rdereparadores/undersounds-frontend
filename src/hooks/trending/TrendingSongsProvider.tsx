import { TrendingSong, TrendingSongsContext } from "./TrendingSongsContext"
import { api } from "@/lib/api"
import React from "react"

interface TrendingSongsProviderProps {
    children: React.ReactNode
}

export const TrendingSongsProvider = ({ children }: TrendingSongsProviderProps) => {
    const getTrendingSongs = async (): Promise<TrendingSong[]> => {
        try {
            const result = await api.get('/api/trending/songs')
            if (result.data.error) return []
            return result.data.data.songs as TrendingSong[]
        } catch {
            return []
        }
    }

    return (
        <TrendingSongsContext.Provider value={{ getTrendingSongs }}>
            {children}
        </TrendingSongsContext.Provider>
    );
};