import { createContext } from 'react'

export interface ShopContextSearchProps {
    query: string,
    filters: URLSearchParams
}

export interface ShopContextResultProps {
    items: ShopContextResultItemProps[],
    itemCount: number
}

interface ShopContextResultItemArtistProps {
    name: string,
    id: number
}

export interface ShopContextResultItemProps {
    title: string,
    artists: ShopContextResultItemArtistProps[],
    imgUrl: string,
    type: string, // 'album', 'song',
    genreList: string[],
    id: number
}

interface ShopContextProps {
    search: ({ query, filters }: ShopContextSearchProps) => Promise<ShopContextResultProps>,
    searchResultItemCount: number | undefined
}

export const ShopContext = createContext<ShopContextProps>({
    search: async () => ({items: [], itemCount: 0}),
    searchResultItemCount: undefined
})