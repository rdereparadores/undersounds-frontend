import { api } from "@/lib/api";
import {ArtistProfileContext, ArtistProfileProps, Transaction} from "./ArtistProfileContext";
import React from "react";

interface ArtistProfileProviderProps {
    children: React.ReactNode;
}

export const ArtistProfileProvider: React.FC<ArtistProfileProviderProps> = ({ children }) => {
    const getArtistProfile = async (artistUsername: string): Promise<ArtistProfileProps> => {
        const result = await api.post('/api/profile/artist/info', { artistUsername });
        if (result.data.error) throw new Error(result.data.error.message);
        return result.data.data as ArtistProfileProps;
    };

    const getArtistTransactions = async (): Promise<Transaction[]> => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token de usuario no encontrado. Inicia sesión.');

        const result = await api.get('/api/artist/transactions', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (result.data.error) throw new Error(result.data.error.message);

        const raw = result.data.data as (Omit<Transaction, 'date'> & { date: string })[];
        return raw.map(tx => ({ ...tx, date: new Date(tx.date) }));
    };

    return (
        <ArtistProfileContext value={{ getArtistProfile, getArtistTransactions }}>
            {children}
        </ArtistProfileContext>
    );
};