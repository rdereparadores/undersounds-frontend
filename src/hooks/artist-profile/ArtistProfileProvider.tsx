import React from "react";
import { api } from "@/lib/api"
import { ArtistProfileContext, ArtistProfileProps } from "./ArtistProfileContext"

interface ArtistProfileProviderProps {
    children: React.ReactNode
}

export const ArtistProfileProvider = ({ children }: ArtistProfileProviderProps) => {
    const getArtistProfile = async (artistUsername: string): Promise<ArtistProfileProps> => {
        const result = await api.post('/api/profile/artist/info', { artistUsername })
        if (result.data.error) throw new Error()
        return result.data.data as ArtistProfileProps
    }

    return (
        <ArtistProfileContext.Provider
            value={{
                getArtistProfile
            }}
        >
            {children}
        </ArtistProfileContext.Provider>
    );
};