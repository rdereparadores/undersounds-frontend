import {
    ProductContext,
    SongProps,
    RatingProps
} from "./ProductContext"
import { api } from '@/lib/api'

interface ProductProviderProps {
    children: React.ReactNode
}


export const ProductProvider = ({ children }: ProductProviderProps) => {

    const getSongInfo = async (id: string) => {
        try {
            const result = await api.post('/api/song/info', { songId: id })
            if (result.data.error) return null
            return result.data.data.song as SongProps
        } catch {
            return null
        }
    }

    const getProductRatings = async (id: string) => {
        try {
            const result = await api.post('/api/product/ratings', { id })
            if (result.data.error) return null
            return result.data.data as RatingProps
        } catch {
            return null
        }
    }

    

    return (
        <ProductContext.Provider value={{
            getSongInfo,
            getProductRatings
        }}>
            {children}
        </ProductContext.Provider>
    )
}