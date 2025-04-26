import { createContext } from "react"

export interface RatingProps {
    rating: number,
    title: string,
    description: string,
    publishDate: Date,
    authorUsername: string,
    authorImgUrl: string
}

export interface UserRatingProps {
    rating?: RatingProps,
    rateable: boolean
}

export interface RatingResultProps {
    ratings: RatingProps[],
    averageRating: number,
    totalRatings: number
}

export interface RatingContextProps {
    getProductRatings: (productId: string) => Promise<RatingResultProps>,
    checkUserRating: (productId: string) => Promise<UserRatingProps>,
    addRating: (productId: string, data: Partial<RatingProps>) => Promise<boolean>,
    updateRating: (productId: string, data: Partial<RatingProps>) => Promise<boolean>,
    removeRating: (productId: string) => Promise<boolean>
}

export const RatingContext = createContext<RatingContextProps>({
    getProductRatings: async () => {throw new Error()},
    checkUserRating: async () => {throw new Error()},
    addRating: async () => false,
    updateRating: async () => false,
    removeRating: async () => false
});