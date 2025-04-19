import { createContext } from "react"

export interface ArtistStatsContextResultProps {
    artistStats: ArtistStats;
}

export interface ArtistStats {
    monthlySales:           MonthlySales;
    monthlyReleases:        MonthlyReleases;
    topFormat:              TopFormat;
    monthlyUniqueListeners: MonthlyUniqueListeners;
    formatSales:            FormatSale[];
    topItems:               TopItem[];
}

export interface FormatSale {
    format:   string;
    quantity: number;
}

export interface MonthlyReleases {
    current:  number;
    previous: number;
}

export interface MonthlySales {
    current:          number;
    percentageChange: number;
    trend:            string;
}

export interface MonthlyUniqueListeners {
    current: number;
    change:  number;
    trend:   string;
}

export interface TopFormat {
    name:  string;
    ratio: number;
}

export interface TopItem {
    item: string;
    sold: number;
}

export interface ArtistStatsContextProps {
    getArtistStats: () => Promise<ArtistStatsContextResultProps | null>;
}

export const ArtistStatsContext = createContext<ArtistStatsContextProps>({
    getArtistStats: async () => null
})