import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { useCart } from "@/hooks/cart/useCart"
import { ProductContainerInfoArtistCard } from "./ProductContainerInfoArtistCard"
import { toast } from "sonner"
import { AlbumProps, SongProps } from "@/hooks/product/ProductContext"
import { Link } from "react-router"

export const ProductContainerInfo = ({ type, productInfo }: { type: 'song' | 'album', productInfo: SongProps | AlbumProps }) => {
    const cart = useCart()
    const [imgLoaded, setImgLoaded] = useState(false)
    const [selectedFormat, setSelectedFormat] = useState<null | 'digital' | 'cd' | 'cassette' | 'vinyl'>(null)

    const parseArtistList = () => {
        const authorLink = (
            <Link to={`/profile/artist/${productInfo.author.artistUsername}`}>
                <h3 className='text-xl mb-2'>{productInfo.author.artistName}</h3>
            </Link>
        )
        if (type !== 'song' || !('collaborators' in productInfo) || productInfo.collaborators.length === 0) return authorLink
        const collaboratorLinks = productInfo.collaborators.map((collaborator, index) => (
            <Link key={index} to={`/profile/artist/${collaborator.artistUsername}`}>, {collaborator.artistName}</Link>
        ))

        return (
            <h3 className='text-xl mb-2'>
                <Link to={`/profile/artist/${productInfo.author.artistUsername}`}>{productInfo.author.artistName}</Link>
                {collaboratorLinks}
            </h3>
        )
    }

    return (
        <div className='flex mt-3 gap-3 flex-wrap flex-grow justify-center'>
            {!imgLoaded && <Skeleton className="h-96 aspect-square rounded-md" />}
            <img alt="Imagen de un producto" hidden={!imgLoaded} className='h-96 aspect-square rounded-md' src={productInfo.imgUrl} onLoad={() => { setImgLoaded(true) }} />
            <div className='flex flex-col grow-[2] flex-shrink'>
                <h2 className='font-bold text-2xl'>{productInfo.title}</h2>
                <h3 className='text-xl mb-2'>{parseArtistList()}</h3>
                <h3>Publicado el {(new Date(productInfo.releaseDate)).toLocaleDateString()}</h3>
                <div className='mt-2 flex gap-2'>
                    {productInfo.genres.map((genre, index) => (
                        <Badge key={index} variant='outline'>{genre}</Badge>
                    ))}
                </div>
                <p className="mt-2 max-w-[500px] min-w-[150px] break-words flex-shrink">{productInfo.description}</p>
            </div>
            <div className='flex flex-col w-fit grow gap-1'>
                <Card className='grow flex flex-col justify-between'>
                    <CardHeader>
                        <CardTitle>Comprar</CardTitle>
                        <CardDescription>Selecciona el formato deseado</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Select onValueChange={(value: 'digital' | 'cd' | 'cassette' | 'vinyl') => setSelectedFormat(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder='Escoge un formato...' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Formato</SelectLabel>
                                    <SelectItem value='digital'>Descarga digital {productInfo.pricing.digital}€</SelectItem>
                                    <SelectItem value='cd'>CD {productInfo.pricing.cd}€</SelectItem>
                                    <SelectItem value='vinyl'>Vinilo {productInfo.pricing.vinyl}€</SelectItem>
                                    <SelectItem value='cassette'>Cassette {productInfo.pricing.cassette}€</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button className="w-full" onClick={
                            () => {
                                if (!selectedFormat) {
                                    toast.error('Debes seleccionar un formato')
                                    return
                                }

                                cart.add({
                                    type,
                                    format: selectedFormat,
                                    quantity: 1,
                                    id: productInfo._id
                                })
                                document.getElementById('navBarCartButton')?.click()
                            }
                        }>Añadir al carrito</Button>
                    </CardContent>
                </Card>
                <ProductContainerInfoArtistCard productInfo={productInfo} />

            </div>
        </div>
    )
}