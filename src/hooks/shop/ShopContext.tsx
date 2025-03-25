import { createContext } from 'react'
import { ProductContextResultShortProps } from '../product/ProductContext'

export interface ShopContextSearchProps {
    query: string,
    filters: URLSearchParams
}

export interface ShopContextResultProps {
    items: ProductContextResultShortProps[],
    itemCount: number
}

interface ShopContextProps {
    search: ({ query, filters }: ShopContextSearchProps) => Promise<ShopContextResultProps>,
    searchResultItemCount: number | undefined
}

export const ShopContext = createContext<ShopContextProps>({
    search: async () => ({items: [], itemCount: 0}),
    searchResultItemCount: undefined
})