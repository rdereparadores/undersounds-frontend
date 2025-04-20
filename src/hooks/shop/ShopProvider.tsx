import React from "react"
import { ShopContext, ShopContextSearchProps } from "./ShopContext"
import { api } from "@/lib/api"

interface ShopProviderProps {
    children: React.ReactNode
}

export const ShopProvider = ({ children }: ShopProviderProps) => {

    const search = async ({ query, filters }: ShopContextSearchProps) => {
        const result = await api.post('/api/shop/query', {
            query,
            genres: filters.get('genre') ? filters.get('genre')!.split(',') : undefined,
            date: filters.get('date') ? filters.get('date') : undefined,
            sortBy: filters.get('sort') ? filters.get('sort') : undefined,
            page: filters.get('page') ? Number(filters.get('page')) : undefined
        })
        return {
            items: result.data.data.products,
            itemCount: result.data.data.totalCount
        }
    }

    return (
        <ShopContext.Provider value={{ search }}>
            {children}
        </ShopContext.Provider>
    )
}