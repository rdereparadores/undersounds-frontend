import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"
import { ShopItem } from "@/hooks/shop/ShopContext"

export const ShopItemCard = ({ item }: { item: ShopItem }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const navigate = useNavigate()
    return (
        <Link to={ `/${item.type}/${item._id}` }>
            <Card className='h-full max-w-[200px] w-full mx-auto'>
                <CardHeader className='p-2'>
                    <div className='relative w-full aspect-square'>
                        <Skeleton className='w-full h-full rounded-md' hidden={imgLoaded} />
                        <img
                            alt="Imagen de un producto"
                            hidden={!imgLoaded}
                            className='w-full h-full aspect-square rounded-md hover:brightness-50 transition hover:cursor-pointer'
                            src={item.imgUrl}
                            onClick={() => { navigate(`/${item.type}/${item._id}`) }}
                            onLoad={() => setImgLoaded(true)}
                        />
                    </div>
                    <CardTitle className=''>{item.title}</CardTitle>
                    <CardDescription>{item.author.artistName}</CardDescription>
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