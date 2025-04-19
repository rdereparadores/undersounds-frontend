import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router";
import { AlbumProps, SongProps } from "@/hooks/product/ProductContext";

export const ProductContainerInfoArtistCard = ({ productInfo }: { productInfo: SongProps | AlbumProps }) => {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <Card className="mt-3">
            <CardHeader className='flex flex-col gap-2'>
                <div className='flex gap-5 items-center justify-center'>
                    {!imgLoaded && <Skeleton className="rounded-full w-[48px] aspect-square" />}
                    <img alt="Imagen del artista" hidden={!imgLoaded} className='rounded-full w-[48px] aspect-square' src={productInfo.author.artistImgUrl} onLoad={() => {setImgLoaded(true)}} />
                    <div>
                        <p className="font-medium">@{productInfo.author.artistUsername}</p>
                        <p className='text-sm'>{productInfo.author.followers} seguidores</p>
                    </div>
                    <Button className="grow" variant={true ? 'outline' : 'default'}>
                    {true ? 'Siguiendo' : '+ Seguir'}
                    </Button>
                </div>
                <Button asChild variant='outline'>
                    <Link to={`/profile/artist/${productInfo.author.artistUsername}`}>Ver perfil</Link>
                </Button>
            </CardHeader>
        </Card>
    )
}