import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useShop } from "@/hooks/shop/useShop"
import { ShopItemCard } from "./ShopItemCard"
import { ShopPagination } from "./ShopPagination"
import { ShopContextResultProps } from "@/hooks/shop/ShopContext"
import { Skeleton } from "../ui/skeleton"

export const ShopItemsContainer = () => {
    const [params] = useSearchParams()
    const [searchResults, setSearchResults] = useState<ShopContextResultProps | undefined>(undefined)
    const navigate = useNavigate()
    const shop = useShop()

    useEffect(() => {
        shop.search({ query: params.get('query') || '', filters: params }).then(results => {
            setSearchResults(results)
        })
    }, [params, shop])

    const onSortChange = (value: string) => {
        params.set('sort', value)
        navigate('?' + params.toString())
    }

    if (searchResults === undefined) return <Skeleton className='w-full h-full'/>

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <p className='font-medium'>{searchResults.itemCount} resultados</p>
                <Select defaultValue={params.get('sort') ? params.get('sort')! : undefined} onValueChange={onSortChange}>
                    <SelectTrigger className='w-fit min-w-[200px]'>
                        <SelectValue placeholder='Ordenar por' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Ordenar por</SelectLabel>
                            <SelectItem value='relevance'>Relevancia</SelectItem>
                            <SelectItem value='releaseDate'>Fecha de publicación</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='pt-4 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {searchResults.items.map((item, index) => (
                    <ShopItemCard key={index} item={item} />
                ))}
            </div>


            <ShopPagination searchResults={ searchResults }/>
        </div>
    )
}