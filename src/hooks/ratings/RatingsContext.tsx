import { createContext } from "react";

export interface PurchasedProductFormat {
    format: string;
    purchaseDate: Date;
}

export interface RatingItemProps {
    _id: string;
    authorId: string;
    authorUsername: string;
    authorImgUrl: string;
    title: string;
    description: string;
    rating: number;
    date: string;
    format: string;
}

export interface RatingProps {
    ratings: RatingItemProps[];
    averageRating: number;
    totalRatings: number;
}

export interface UserRatingCheckResult {
    hasRated: boolean;
    ratings: RatingItemProps[] | null;
    userId: string;
}

export interface PurchasedFormatsResult {
    formats: PurchasedProductFormat[];
    ratedFormats: string[];
}

export interface RatingFormData {
    title: string;
    description: string;
    rating: number;
    format: string;
}

export interface RatingContextProps {
    getProductRatings: (productId: string) => Promise<RatingProps>;
    checkUserRating: (productId: string) => Promise<UserRatingCheckResult>;
    getPurchasedFormats: (productId: string) => Promise<PurchasedFormatsResult>;
    addRating: (productId: string, data: RatingFormData) => Promise<boolean>;
    updateRating: (productId: string, ratingId: string, data: RatingFormData) => Promise<boolean>;
    removeRating: (productId: string, ratingId: string) => Promise<boolean>;
}

export const RatingContext = createContext<RatingContextProps>({
    getProductRatings: async () => ({ ratings: [], averageRating: 0, totalRatings: 0 }),
    checkUserRating: async () => ({ hasRated: false, ratings: null, userId: '' }),
    getPurchasedFormats: async () => ({ formats: [], ratedFormats: [] }),
    addRating: async () => false,
    updateRating: async () => false,
    removeRating: async () => false
});