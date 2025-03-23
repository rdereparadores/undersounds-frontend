import { ProductContainerInfo } from "./ProductContainerInfo"
import { ProductContainerRatings } from "./ProductContainerRatings"
import { ProductContainerRelatedCarousel } from "./ProductContainerRelatedCarousel"
import { useEffect } from "react"
import { Link, useParams } from "react-router"

import { ProductContainerTrackList } from "./ProductContainerTrackList"
import { useProduct } from "@/hooks/product/useProduct"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"

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
        <>
            <Breadcrumb className='mt-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to='/'>Inicio</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to='/shop'>Tienda</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {product.queryResult?.product.title}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
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
        </>

    )
}