import React, { useState } from "react"
import { ShopContext, ShopContextSearchProps } from "./ShopContext"
import { api } from "@/lib/api"

interface ShopProviderProps {
    children: React.ReactNode
}

export const ShopProvider = ({ children }: ShopProviderProps) => {
    const [searchResultItemCount, setSearchResultItemCount] = useState<number | undefined>(undefined)

    const search = async ({ query, filters }: ShopContextSearchProps) => {
        const result = await api.post('/api/shop/query', {
            query,
            genres: filters.get('genre') ? filters.get('genre') : undefined,
            date: filters.get('date') ? filters.get('date') : undefined,
            sortBy: filters.get('sort') ? filters.get('sort') : undefined,
        })
        console.log(result.data.data)

        setSearchResultItemCount(result.data.data.totalCount)
        return {
            items: result.data.data.products,
            itemCount: result.data.data.totalCount
        }
    }

    return (
        <ShopContext.Provider value={{ search, searchResultItemCount }}>
            {children}
        </ShopContext.Provider>
    )
}