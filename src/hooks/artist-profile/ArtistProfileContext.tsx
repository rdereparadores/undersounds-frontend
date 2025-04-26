import { createContext } from "react"
import { ShopItem } from "../shop/ShopContext";

export interface ArtistProfileItem extends ShopItem {
    plays?: number
}

export interface ArtistProfileProps {
    artist: {
        _id: string,
        artistName: string,
        artistUsername: string,
        artistBannerUrl: string,
        artistImgUrl: string,
        followers: number
    },
    topSongs: ArtistProfileItem[],
    featuredRelease: ArtistProfileItem | undefined,
    albums: ArtistProfileItem[],
    songs: ArtistProfileItem[]
}

export interface Transaction {
    id: string;
    productTitle: string;
    format: 'digital' | 'cd' | 'vinyl' | 'cassette';
    amount: number;
    earning: number;
    date: string | Date;
    imgUrl: string;
}

export interface FormatStats {
    format: string;
    percentage: number;
}

export interface TransactionStats {
    totalEarnings: number;
    mostSoldFormat: FormatStats;
    salesByFormat: Record<string, number>;
    topProducts: Array<{
        title: string;
        sales: number;
        imgUrl: string;
    }>;
}

export interface ArtistProfileContextProps {
    getArtistProfile: (artistUsername: string) => Promise<ArtistProfileProps>;
    getArtistTransactions: () => Promise<Transaction[]>;
    calculateTransactionStats: (transactions: Transaction[]) => TransactionStats;
}

export const ArtistProfileContext = createContext<ArtistProfileContextProps>({
    getArtistProfile: async () => { throw new Error("getArtistProfile not implemented"); },
    getArtistTransactions: async () => { throw new Error("getArtistTransactions not implemented"); },
    calculateTransactionStats: () => { throw new Error("calculateTransactionStats not implemented"); }
});