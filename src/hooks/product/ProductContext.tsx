import { createContext } from "react"

export interface ProductContextQueryProps {
    type: string,
    id: number
}

export interface ProductContextResultShortProps {
    title: string,
    _id: string,
    author: string,
    artists: { name: string, id: number }[],
    productType: string,
    genres: string[],
    duration: number,
    imgUrl: string,
    price: {
        digital: number,
        cd: number,
        vinyl: number,
        cassette: number
    }
}

export interface ProductContextResultProps {
    product: {
        title: string,
        id: number,
        type: string,
        author: string,
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
        ratingCount: { five: number, four: number, three: number, two: number, one: number },
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