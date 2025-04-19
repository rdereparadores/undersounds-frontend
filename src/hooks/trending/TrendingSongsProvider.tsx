import {TrendingSongsContext, TrendingSongsResult} from "./TrendingSongsContext";
import {api} from "@/lib/api";
import React from "react";

interface TrendingSongsProviderProps {
    children: React.ReactNode;
}

interface SongResponse {
    _id: string;
    title: string;
    imgUrl: string;
    plays: number;
    author: string;
    artistName: string;
}

export const TrendingSongsProvider = ({ children }: TrendingSongsProviderProps) => {
    const getTrendingSongs = async (): Promise<TrendingSongsResult[] | null> => {
        try {
            const response = await api.get('/api/trending/songs');

            if (response.data.error) {
                return null;
            }

            if (!response.data.data || !response.data.data.songs || !Array.isArray(response.data.data.songs)) {
                return null;
            }

            return response.data.data.songs.map((song: SongResponse) => ({
                id: song._id,
                title: song.title || 'Unknown Title',
                imgUrl: song.imgUrl || '/placeholder.jpg',
                plays: song.plays || 0,
                artist: {
                    id: song.author,
                    name: song.artistName || 'Unknown Artist'
                }
            }));
        } catch (error) {
            console.error("Error in fetchSongs:", error)
            return null;
        }
    };

    return (
        <TrendingSongsContext.Provider value={{ getTrendingSongs }}>
            {children}
        </TrendingSongsContext.Provider>
    );
};