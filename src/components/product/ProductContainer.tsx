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
import { ShopItem } from "@/hooks/shop/ShopContext"

interface ProductContainerProps {
    type: 'song' | 'album'
}

export const ProductContainer = ({ type }: ProductContainerProps) => {
    const params = useParams()
    const product = useProduct()
    const [productInfo, setProductInfo] = useState<SongProps | AlbumProps | undefined>(undefined)
    const [ related, setRelated ] = useState<ShopItem[] | undefined>(undefined)

    useEffect(() => {
        const id = params.id!
        if (type === 'song') {
            product.getSongInfo(id).then(song => setProductInfo(song!))
        } else {
            product.getAlbumInfo(id).then(album => setProductInfo(album!))
        }
        product.getProductRecommendations(id).then(recommendations => setRelated(recommendations))
    }, [params.id, product, type])

    if (productInfo === undefined) return <Skeleton className='w-full h-screen mt-2'/>

    return (
        <>
            <Breadcrumb className='mt-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to='/'>Inicio</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
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
                        {'trackList' in productInfo && <ProductContainerTrackList trackList={productInfo.trackList!} />}
                        <ProductContainerRatings />
                    </div>
                    <ProductContainerRelatedCarousel related={related!} />
                </div>
            </div>
        </>
    )
}