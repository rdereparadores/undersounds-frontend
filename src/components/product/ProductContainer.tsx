import { useProduct } from "@/hooks/product/useProduct"
import { ProductContainerInfo } from "./ProductContainerInfo"
import { ProductContainerRatings } from "./ProductContainerRatings"
import { ProductContainerRelatedCarousel } from "./ProductContainerRelatedCarousel"
import { useEffect } from "react"
import { useParams } from "react-router"

import { ProductContainerTrackList } from "./ProductContainerTrackList"

interface ProductContainerProps {
    type: string
}

export const ProductContainer = ({ type }: ProductContainerProps) => {
    const params = useParams()
    const product = useProduct()

    useEffect(() => {
        product.queryProduct({ type: type, id: parseInt(params.id!) })
    }, [])

    return (
        <div className='flex flex-col gap-4'>
            <ProductContainerInfo />

            <div className="flex gap-4 flex-wrap">
                <div className='flex flex-col grow gap-4'>
                    {type == 'album' && <ProductContainerTrackList />}
                    <ProductContainerRatings />
                </div>
                <ProductContainerRelatedCarousel />
            </div>
        </div>
    )
}