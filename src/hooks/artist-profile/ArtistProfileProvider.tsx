import React from "react";
import { api } from "@/lib/api"
import { ArtistProfileContext, ArtistProfileProps } from "./ArtistProfileContext";
import { toast } from "sonner";

interface ArtistProfileProviderProps {
    children: React.ReactNode;
}

export const ArtistProfileProvider = ({ children }: ArtistProfileProviderProps) => {
    const getArtistProfile = async (artistID: string): Promise<ArtistProfileProps> => {
        try {
            const response = await api.post("/api/artist/profile/info", { artistId: artistID });
            if (response.data.error) {
                const errorMessage = response.data.error.message || "Error al obtener perfil del artista";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }

            const data = response.data.data;

            if (data.newestRelease) {
                data.newestRelease.releaseYear = data.newestRelease.releaseYear ||
                    new Date(data.newestRelease.releaseDate).getFullYear();
            }

            data.albums = data.albums.map((album: {releaseDate: Date | string, releaseYear?: number, type?: string, [key: string]: unknown}) => ({
                ...album,
                releaseYear: album.releaseYear || new Date(album.releaseDate).getFullYear(),
                type: album.type || 'Album'
            }));

            data.epsYsingles = data.epsYsingles.map((item: {releaseDate: Date | string, releaseYear?: number, type?: string, [key: string]: unknown}) => ({
                ...item,
                releaseYear: item.releaseYear || new Date(item.releaseDate).getFullYear(),
                type: item.type || 'Single'
            }));

            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido al obtener perfil de artista";
            toast.error(errorMessage);
            throw error;
        }
    };

    const followArtist = async (artistUsername: string): Promise<void> => {
        try {
            const response = await api.post("/api/user/follow", { artistUsername });

            if (response.data.error) {
                const errorMessage = response.data.error.message || "Error al seguir artista";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }

            toast.success(`Ahora sigues a ${artistUsername}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido al seguir artista";
            toast.error(errorMessage);
            throw error;
        }
    };

    const unfollowArtist = async (artistUsername: string): Promise<void> => {
        try {
            const response = await api.post("/api/user/unfollow", { artistUsername });

            if (response.data.error) {
                const errorMessage = response.data.error.message || "Error al dejar de seguir artista";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }

            toast.success(`Has dejado de seguir a ${artistUsername}`);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido al dejar de seguir artista";
            toast.error(errorMessage);
            throw error;
        }
    };

    const isFollowing = async (artistUsername: string): Promise<boolean> => {
        try {
            const response = await api.post("/api/user/is-following", { artistUsername });

            if (response.data.error) {
                const errorMessage = response.data.error.message || "Error al verificar estado de seguimiento";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }

            return response.data.data.following;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido al verificar seguimiento";
            toast.error(errorMessage);
            throw error;
        }
    };

    return (
        <ArtistProfileContext.Provider
            value={{
                getArtistProfile,
                followArtist,
                unfollowArtist,
                isFollowing
            }}
        >
            {children}
        </ArtistProfileContext.Provider>
    );
};