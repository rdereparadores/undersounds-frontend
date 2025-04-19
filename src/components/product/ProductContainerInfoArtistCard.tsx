import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router";
import { AlbumProps, SongProps } from "@/hooks/product/ProductContext";
import { useUser } from "@/hooks/user/useUser";

//TODO: RUTAS FOLLOW, ISFOLLOWING, EN ARTISTDTO AÑADIR EL INCREMENTAR O DECREMENTAR FOLLOWCOUNT
export const ProductContainerInfoArtistCard = ({ productInfo }: { productInfo: SongProps | AlbumProps }) => {
    const user = useUser()
    const [imgLoaded, setImgLoaded] = useState(false)
    const [isFollowing, setIsFollowing] = useState<boolean>(false)

    useEffect(() => {
        user.isFollowing(productInfo.author.artistUsername)
        .then(following => setIsFollowing(following))
    }, [])

    const toggleFollow = async () => {
        if (isFollowing) {
            const result = await user.unfollow(productInfo.author.artistUsername)
            if (result === true) setIsFollowing(false)
        }
        if (!isFollowing) {
            const result = await user.follow(productInfo.author.artistUsername)
            if (result === true) setIsFollowing(true)
        }
    }

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
                    <Button onClick={toggleFollow} className="grow" variant={isFollowing ? 'outline' : 'default'}>
                    {isFollowing ? 'Siguiendo' : '+ Seguir'}
                    </Button>
                </div>
                <Button asChild variant='outline'>
                    <Link to={`/profile/artist/${productInfo.author.artistUsername}`}>Ver perfil</Link>
                </Button>
            </CardHeader>
        </Card>
    )
}