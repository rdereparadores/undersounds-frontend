import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router"
import { ShopContextResultItemProps } from "@/hooks/shop/ShopContext"
import { Skeleton } from "../ui/skeleton"
import { useState } from "react"

export const ShopItem = ({ title, artists, imgUrl, type, genreList, id }: ShopContextResultItemProps) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const navigate = useNavigate()
    return (
        <Card className='max-w-[200px] w-full mx-auto'>
            <CardHeader className='p-2'>
                <div className='relative w-full aspect-square'>
                    <Skeleton className='w-full h-full rounded-md' hidden={imgLoaded} />
                    <img
                        hidden={!imgLoaded}
                        className='w-full h-full rounded-md hover:brightness-50 transition hover:cursor-pointer'
                        src={imgUrl}
                        onClick={() => { navigate(`/${type}/${id}`) }}
                        onLoad={() => setImgLoaded(true)}
                    />
                </div>
                <CardTitle className=''>{title}</CardTitle>
                <CardDescription>{artists.map(artist => artist.name).join(', ')}</CardDescription>
                <Badge className='w-fit'>{type == 'album' ? 'Álbum' : 'Canción'}</Badge>
            </CardHeader>
            <CardContent className='p-2 pt-0'>
                <div className="flex flex-wrap justify-start gap-1">
                    {genreList.map((genre, index) => (
                        <Badge key={index} className='w-fit' variant='outline'>{genre}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}