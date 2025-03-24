import { GlobalStatsContext } from "./GlobalStatsContext"
import productsShort from '@/testingDB/productsShort.json'

interface GlobalStatsProviderProps {
    children: React.ReactNode
}

export const GlobalStatsProvider = ({ children }: GlobalStatsProviderProps) => {
    const top10Songs = async () => {
        return productsShort.filter(product => product.type != 'album').slice(0, 10)
    }

    return (
        <GlobalStatsContext.Provider value={{ top10Songs }}>
            {children}
        </GlobalStatsContext.Provider>
    )
}