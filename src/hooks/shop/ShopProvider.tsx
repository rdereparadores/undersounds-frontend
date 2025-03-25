import React, { useState } from "react";
import { ShopContext, ShopContextSearchProps } from "./ShopContext";
import productsShort from '@/testingDB/productsShort.json'

interface ShopProviderProps {
    children: React.ReactNode
}

export const ShopProvider = ({ children }: ShopProviderProps) => {
    const [searchResultItemCount, setSearchResultItemCount] = useState<number | undefined>(undefined)

    const search = async ({ query, filters }: ShopContextSearchProps) => {
        console.log(filters)
        setSearchResultItemCount(5)
        const result = productsShort.filter(product => product.title.includes(query))
        return {
            items: result,
            itemCount: result.length
        }
    }

    return (
        <ShopContext.Provider value={{ search, searchResultItemCount }}>
            {children}
        </ShopContext.Provider>
    )
}