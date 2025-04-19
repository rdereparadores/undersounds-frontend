import { ProductContainerInfo } from "./ProductContainerInfo"
import { ProductContainerRatings } from "./ProductContainerRatings"
import { ProductContainerRelatedCarousel } from "./ProductContainerRelatedCarousel"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"

import { ProductContainerTrackList } from "./ProductContainerTrackList"
import { useProduct } from "@/hooks/product/useProduct"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { AlbumProps, SongProps } from "@/hooks/product/ProductContext"
import { Skeleton } from "../ui/skeleton"

interface ProductContainerProps {
    type: 'song' | 'album'
}

export const ProductContainer = ({ type }: ProductContainerProps) => {
    const params = useParams()
    const product = useProduct()
    const [productInfo, setProductInfo] = useState<SongProps | AlbumProps | undefined>(undefined)

    useEffect(() => {
        const id = params.id!
        if (type === 'song') {
            product.getSongInfo(id).then(song => setProductInfo(song!))
        } else {
            // TODO llamar a getAlbumInfo
        }
    }, [params.id, product, type])

    if (productInfo === undefined) return <Skeleton className='w-full h-screen mt-2'/>

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
                            {productInfo.title}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='flex flex-col gap-4'>
                <ProductContainerInfo productInfo={productInfo} type={type} />
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