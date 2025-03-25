import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import { ProductContextResultShortProps } from "@/hooks/product/ProductContext"

export const ShopItem = (item: ProductContextResultShortProps) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const navigate = useNavigate()
    return (
        <Link to={ `/${item.type}/${item.id}` }>
            <Card className='max-w-[200px] w-full mx-auto'>
                <CardHeader className='p-2'>
                    <div className='relative w-full aspect-square'>
                        <Skeleton className='w-full h-full rounded-md' hidden={imgLoaded} />
                        <img
                            alt="Iamgen de un producto"
                            hidden={!imgLoaded}
                            className='w-full h-full aspect-square rounded-md hover:brightness-50 transition hover:cursor-pointer'
                            src={item.imgUrl}
                            onClick={() => { navigate(`/${item.type}/${item.id}`) }}
                            onLoad={() => setImgLoaded(true)}
                        />
                    </div>
                    <CardTitle className=''>{item.title}</CardTitle>
                    <CardDescription>{item.artists.map(artist => artist.name).join(', ')}</CardDescription>
                    <Badge className='w-fit'>{item.type == 'album' ? 'Álbum' : 'Canción'}</Badge>
                </CardHeader>
                <CardContent className='p-2 pt-0'>
                    <div className="flex flex-wrap justify-start gap-1">
                        {item.genres.map((genre, index) => (
                            <Badge key={index} className='w-fit' variant='outline'>{genre}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}