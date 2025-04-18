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
import { ShopItem } from "./ShopItem"
import { ShopPagination } from "./ShopPagination"
import { ProductContextResultShortProps } from "@/hooks/product/ProductContext"

export const ShopItemsContainer = () => {
    const [params] = useSearchParams()
    const [searchResults, setSearchResults] = useState<undefined | ProductContextResultShortProps[]>(undefined)
    const [searchResultCount, setSearchResultCount] = useState<undefined | number>(undefined)
    const navigate = useNavigate()
    const shop = useShop()

    useEffect(() => {
        shop.search({ query: params.get('query') || '', filters: params }).then(results => {
            console.log(results)
            setSearchResults(results.items)
            setSearchResultCount(results.itemCount)
        })
    }, [params, shop])

    const onSortChange = (value: string) => {
        params.set('sort', value)
        navigate('?' + params.toString())
    }

    if (searchResults === undefined) return <></>

    return (
        <div className='w-full'>
            <div className='flex justify-between items-center'>
                <p className='font-medium'>{searchResultCount} resultados</p>
                <Select defaultValue={params.get('sort') ? params.get('sort')! : undefined} onValueChange={onSortChange}>
                    <SelectTrigger className='w-fit min-w-[200px]'>
                        <SelectValue placeholder='Ordenar por' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Ordenar por</SelectLabel>
                            <SelectItem value='relevance'>Relevancia</SelectItem>
                            <SelectItem value='date'>Fecha de publicación</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className='pt-4 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {searchResults!.map((item, index) => (
                    <ShopItem key={index} {...item} />
                ))}
            </div>


            <ShopPagination />
        </div>
    )
}