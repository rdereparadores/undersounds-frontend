import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useProduct } from "@/hooks/product/useProduct";
import { Link } from "react-router";

export const ProductContainerInfoArtistCard = () => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const product = useProduct()

    return (
        <Card className="mt-3">
            <CardHeader className='flex flex-col gap-2'>
                <div className='flex gap-5 items-center justify-center'>
                    {!imgLoaded && <Skeleton className="rounded-full w-[48px] aspect-square" />}
                    <img alt="Imagen del artista" hidden={!imgLoaded} className='rounded-full w-[48px] aspect-square' src={product.queryResult?.artist.imgUrl} onLoad={() => {setImgLoaded(true)}} />
                    <div>
                        <p className="font-medium">{product.queryResult?.artist.name}</p>
                        <p className='text-sm'>{product.queryResult?.artist.followers} seguidores</p>
                    </div>
                    <Button className="grow" variant={product.queryResult?.artist.isFollowing ? 'outline' : 'default'}>
                    {product.queryResult?.artist.isFollowing ? 'Siguiendo' : '+ Seguir'}
                    </Button>
                </div>
                <Button asChild variant='outline'>
                    <Link to={`/profile/artist/${product.queryResult?.artist.id}`}>Ver perfil</Link>
                </Button>
            </CardHeader>
        </Card>
    )
}