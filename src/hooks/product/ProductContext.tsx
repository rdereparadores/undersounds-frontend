import { createContext } from "react"

export interface ProductContextQueryProps {
    type: string,
    id: number
}

export interface ProductContextResultShortProps {
    title: string,
    id: number,
    artists: { name: string, id: number }[],
    type: string,
    genres: string[],
    duration: number,
    imgUrl: string
}

export interface ProductContextResultProps {
    product: {
        title: string,
        id: number,
        type: string,
        artists: { name: string, id: number }[],
        duration: number,
        date: string,
        genres: string[],
        description: string,
        imgUrl: string,
        trackList?: ProductContextResultShortProps[],
        price: {
            digital: number,
            cd: number,
            vinyl: number,
            cassette: number
        }
    },
    artist: {
        name: string,
        id: number,
        followers: number,
        isFollowing: boolean,
        imgUrl: string
    },
    ratings: {
        average: number,
        ratingCount: { 5: number, 4: number, 3: number, 2: number, 1: number },
        list: { userImgUrl: string, username: string, title: string, description: string, rating: number }[]
    },
    related: ProductContextResultShortProps[]
}

export interface ProductContextProps {
    queryProduct: ({ type, id }: ProductContextQueryProps) => Promise<void>,
    queryProductShort: ({ type, id }: ProductContextQueryProps) => Promise<void>,
    queryResult: undefined | ProductContextResultProps,
    queryResultShort: undefined | ProductContextResultShortProps
}

export const ProductContext = createContext<ProductContextProps>({
    queryProduct: async () => {},
    queryProductShort: async () => {},
    queryResult: undefined,
    queryResultShort: undefined
})