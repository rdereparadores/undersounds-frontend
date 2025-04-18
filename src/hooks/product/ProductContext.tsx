import { createContext } from "react"

export interface ProductContextQueryProps {
    type: string,
    id: string
}

export interface Artist {
    name: string;
    id: string;
}

export interface Price {
    digital: number;
    cd: number;
    vinyl: number;
    cassette: number;
}

export interface Product {
    title: string;
    id: string;
    type: string;
    artists: Artist[];
    duration: number;
    date: string;
    genres: string[];
    description: string;
    imgUrl: string;
    trackList?: ProductContextResultShortProps[];
    price: Price;
}

export interface ProductContextResultPropsArtist {
    name: string;
    id: string;
    followers: number;
    isFollowing: boolean;
    imgUrl: string;
}

export interface List {
    userImgUrl: string;
    username: string;
    title: string;
    description: string;
    rating: number;
}

export interface RatingCount {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
}

export interface Ratings {
    average: number;
    ratingCount: RatingCount;
    list: List[];
}

export interface ProductContextResultProps {
    product: Product;
    artist: ProductContextResultPropsArtist;
    ratings: Ratings;
    related: ProductContextResultShortProps[];
}

export interface ProductContextResultShortProps {
    title: string;
    id: string;
    artists: Artist[];
    type: string;
    genres: string[];
    duration: number;
    imgUrl: string;
    price: Price;
}

export interface ProductContextProps {
    queryProduct: ({ type, id }: ProductContextQueryProps) => Promise<void>;
    queryProductShort: ({ type, id }: ProductContextQueryProps) => Promise<void>;
    queryResult: undefined | ProductContextResultProps;
    queryResultShort: undefined | ProductContextResultShortProps;
    isLoading: boolean;
    error: string | null;
}

export const ProductContext = createContext<ProductContextProps>({
    queryProduct: async () => {},
    queryProductShort: async () => {},
    queryResult: undefined,
    queryResultShort: undefined,
    isLoading: false,
    error: null
})