import { api } from "@/lib/api";
import {
    ArtistProfileContext,
    ArtistProfileProps,
    Transaction,
    TransactionStats,
    FormatStats
} from "./ArtistProfileContext";
import React, { useCallback } from "react";

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

        const result = await api.get('/api/artist/transitions', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (result.data.error) throw new Error(result.data.error.message);

        if (!result.data.data) {
            console.warn('No se encontraron datos de transacciones');
            return [];
        }

        const transactions = result.data.data as Transaction[];
        return transactions.map(tx => ({
            ...tx,
            date: new Date(tx.date)
        }));
    };

    const calculateTransactionStats = useCallback((transactions: Transaction[]): TransactionStats => {
        if (!transactions || transactions.length === 0) {
            return {
                totalEarnings: 0,
                mostSoldFormat: { format: '', percentage: 0 },
                salesByFormat: {},
                topProducts: []
            };
        }

        const totalEarnings = transactions.reduce((sum, tx) => sum + tx.earning, 0);

        const formatCount: Record<string, number> = {};
        transactions.forEach(tx => {
            formatCount[tx.format] = (formatCount[tx.format] || 0) + 1;
        });

        const total = transactions.length;
        const sortedFormats = Object.entries(formatCount).sort((a, b) => b[1] - a[1]);

        let mostSoldFormat: FormatStats = { format: '', percentage: 0 };
        if (sortedFormats.length > 0) {
            const [format, count] = sortedFormats[0];
            const percentage = Math.round((count / total) * 100);
            mostSoldFormat = {
                format: format.charAt(0).toUpperCase() + format.slice(1),
                percentage
            };
        }

        const productCounts: Record<string, {
            title: string,
            sales: number,
            imgUrl: string
        }> = {};

        transactions.forEach(tx => {
            if (!productCounts[tx.productTitle]) {
                productCounts[tx.productTitle] = {
                    title: tx.productTitle,
                    sales: 0,
                    imgUrl: tx.imgUrl
                };
            }
            productCounts[tx.productTitle].sales += 1;
        });

        const topProducts = Object.values(productCounts)
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 5);

        return {
            totalEarnings,
            mostSoldFormat,
            salesByFormat: formatCount,
            topProducts
        };
    }, []);

    return (
        <ArtistProfileContext.Provider value={{
            getArtistProfile,
            getArtistTransactions,
            calculateTransactionStats
        }}>
            {children}
        </ArtistProfileContext.Provider>
    );
};