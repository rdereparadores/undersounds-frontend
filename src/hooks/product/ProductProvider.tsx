import { api } from "@/lib/api"
import { RatingsProvider } from "../ratings/RatingsProvider.tsx"
import {AlbumProps, ProductContext, RatingProps, SongProps } from "./ProductContext"
import { ShopItem } from "../shop/ShopContext"
import React from "react";

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

    const getProductRecommendations = async (id: string) => {
        try {
            const result = await api.post('/api/product/recommendations', { id })
            if (result.data.error) return []
            return result.data.data as ShopItem[]
        } catch {
            return []
        }
    }

    return (
        <ProductContext.Provider value={{
            getSongInfo,
            getAlbumInfo,
            getProductRatings,
            getProductRecommendations,
        }}>
            <RatingsProvider>
                {children}
            </RatingsProvider>
        </ProductContext.Provider>
    )
}