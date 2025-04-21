import { createContext } from "react"
import { ShopItem } from "../shop/ShopContext"

interface ProductProps {
    _id: string,
    title: string,
    releaseDate: Date,
    description: string,
    imgUrl: string,
    author: {
        _id: string,
        artistName: string,
        artistImgUrl: string,
        artistUsername: string,
        followers: number
    },
    duration: number,
    genres: string[],
    pricing: {
        cd: number,
        digital: number,
        cassette: number,
        vinyl: number
    }
}

export interface SongProps extends ProductProps {
    songDir: string,
    plays: number,
    collaborators: {
        _id: string,
        artistName: string,
        artistImgUrl: string,
        artistUsername: string,
        followers: number
    }[],
    version?: number

}

export interface AlbumProps extends ProductProps {
    trackList: Partial<SongProps>[]
}

export interface RatingItemProps {
    authorUsername: string,
    authorImgUrl: string,
    title: string,
    description: string,
    date: string,
    rating: 1 | 2 | 3 | 4 | 5
}

export interface RatingProps {
    ratings: RatingItemProps[],
    averageRating: number,
    totalRatings: number
}

export interface ProductContextProps {
    getSongInfo: (id: string) => Promise<SongProps | null>,
    getAlbumInfo: (id: string) => Promise<AlbumProps | null>,
    getProductRatings: (id: string) => Promise<RatingProps | null>,
    getProductRecommendations: (id: string) => Promise<ShopItem[]>,
    getSongIdAndVersion: (id: string, version: number) => Promise<SongProps | null>
    getSongVersionHistoryArray: (id: string) => Promise<SongProps[] | null>
}

export const ProductContext = createContext<ProductContextProps>({
    getSongInfo: async () => null,
    getAlbumInfo: async () => null,
    getProductRatings: async () => null,
    getProductRecommendations: async () => [],
    getSongIdAndVersion: async () => null,
    getSongVersionHistoryArray: async () => []
})