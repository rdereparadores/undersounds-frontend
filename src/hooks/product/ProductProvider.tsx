import {
    ProductContext,
    SongProps,
    RatingProps,
    AlbumProps
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

    const getAlbumInfo = async (id: string) => {
        try {
            const result = await api.post('/api/album/info', { albumId: id })
            if (result.data.error) return null
            return result.data.data.album as AlbumProps
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

    const getSongIdAndVersion = async(id: string, version: string) => {
        try {
            const result = await api.post('/api/song/songidandversion', {id, version})
            return result.data.data.song
        } catch {
            return null
        }
    }

    

    return (
        <ProductContext.Provider value={{
            getSongInfo,
            getAlbumInfo,
            getProductRatings,
            getSongIdAndVersion
        }}>
            {children}
        </ProductContext.Provider>
    )
}