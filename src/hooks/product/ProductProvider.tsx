import { useState } from "react"
import { ProductContext, ProductContextQueryProps, ProductContextResultProps, ProductContextResultShortProps } from "./ProductContext"
import products from '@/testingDB/products.json'
import productsShort from '@/testingDB/productsShort.json'

interface ProductProviderProps {
    children: React.ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {

    const [queryResult, setQueryResult] = useState<undefined | ProductContextResultProps>(undefined)
    const [queryResultShort, setQueryResultShort] = useState<undefined | ProductContextResultShortProps>(undefined)

    const queryProduct = async ({ type, id }: ProductContextQueryProps) => {
        setQueryResult(products.find(product => product.product.type == type && product.product.id === id))
    }

    const queryProductShort = async ({ type, id }: ProductContextQueryProps) => {
        setQueryResultShort(productsShort.find(product => product.id === id && product.type === type))
    }

    return (
        <ProductContext.Provider value={{ queryProduct, queryProductShort, queryResult, queryResultShort }}>
            {children}
        </ProductContext.Provider>
    )
}