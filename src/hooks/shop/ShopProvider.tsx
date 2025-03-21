import React, { useState } from "react";
import { ShopContext, ShopContextSearchProps, ShopContextResultItemProps } from "./ShopContext";

const items: ShopContextResultItemProps[] = [
    {
        title: 'Prueba',
        artists: [{name: 'mgk', id: 4}],
        imgUrl: 'https://picsum.photos/200',
        type: 'song',
        genreList: ['pop', 'rock'],
        id: 22
    },
    {
        title: 'Prueba',
        artists: [{name: 'mgk', id: 4}],
        imgUrl: 'https://picsum.photos/200',
        type: 'song',
        genreList: ['pop', 'rock'],
        id: 22
    },
    {
        title: 'Prueba',
        artists: [{name: 'mgk', id: 4}],
        imgUrl: 'https://picsum.photos/200',
        type: 'song',
        genreList: ['pop', 'rock'],
        id: 22
    },
    {
        title: 'Prueba',
        artists: [{name: 'mgk', id: 4}, {name: 'Jelly Roll', id: 7}],
        imgUrl: 'https://picsum.photos/200',
        type: 'song',
        genreList: ['pop', 'rock'],
        id: 22
    },
    {
        title: 'Prueba',
        artists: [{name: 'mgk', id: 4}],
        imgUrl: 'https://picsum.photos/2000',
        type: 'song',
        genreList: ['pop', 'rock'],
        id: 22
    }
]

interface ShopProviderProps {
    children: React.ReactNode
}

export const ShopProvider = ({ children }: ShopProviderProps) => {
    const [searchResultItemCount, setSearchResultItemCount] = useState<number | undefined>(undefined)

    const search = async ({ query, filters }: ShopContextSearchProps) => {
        console.log(query)
        console.log(filters)
        setSearchResultItemCount(5)
        return {
            items: items,
            itemCount: 5
        }
    }

    return (
        <ShopContext.Provider value={{ search, searchResultItemCount }}>
            {children}
        </ShopContext.Provider>
    )
}