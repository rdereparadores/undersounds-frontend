import { createContext } from 'react'

export interface ShopContextSearchProps {
    query: string,
    filters: URLSearchParams
}

export interface ShopItem {
    _id: string,
    imgUrl: string,
    title: string,
    author: {
        _id: string,
        artistName: string
    },
    collaborators: {
        _id: string,
        artistName: string
    }[],
    type: 'song' | 'album',
    genres: string[]
}

export interface ShopContextResultProps {
    items: ShopItem[],
    itemCount: number
}

interface ShopContextProps {
    search: ({ query, filters }: ShopContextSearchProps) => Promise<ShopContextResultProps>,
}

export const ShopContext = createContext<ShopContextProps>({
    search: async () => ({items: [], itemCount: 0})
})