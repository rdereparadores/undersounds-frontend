import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useProduct } from "@/hooks/product/useProduct";
import { ProductContainerInfoArtistCard } from "./ProductContainerInfoArtistCard";

export const ProductContainerInfo = () => {

    const product = useProduct()
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <div className='flex mt-3 gap-3 flex-wrap flex-grow justify-center'>
            {!imgLoaded && <Skeleton className="h-96 aspect-square rounded-md" />}
            <img alt="Imagen de un producto" hidden={!imgLoaded} className='h-96 aspect-square rounded-md' src={product.queryResult?.product.imgUrl} onLoad={() => { setImgLoaded(true) }} />
            <div className='flex flex-col grow-[2] flex-shrink'>
                <h2 className='font-bold text-2xl'>{product.queryResult?.product.title}</h2>
                <h3 className='text-xl mb-2'>{product.queryResult?.product.artists.map(artist => artist.name).join(', ')}</h3>
                <h3>Publicado el {product.queryResult?.product.date}</h3>
                <div className='mt-2 flex gap-2'>
                    {product.queryResult?.product.genres.map((genre, index) => (
                        <Badge key={index} variant='outline'>{genre}</Badge>
                    ))}
                </div>
                <p className="mt-2 max-w-[500px] min-w-[150px] break-words flex-shrink">{product.queryResult?.product.description}</p>
            </div>
            <div className='flex flex-col w-fit grow gap-1'>
                <Card className='grow flex flex-col justify-between'>
                    <CardHeader>
                        <CardTitle>Comprar pista</CardTitle>
                        <CardDescription>Selecciona el formato deseado</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder='Escoge un formato...' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Formato</SelectLabel>
                                    <SelectItem value='digital'>Descarga digital {product.queryResult?.product.price.digital}€</SelectItem>
                                    <SelectItem value='cd'>CD {product.queryResult?.product.price.cd}€</SelectItem>
                                    <SelectItem value='vinyl'>Vinilo {product.queryResult?.product.price.vinyl}€</SelectItem>
                                    <SelectItem value='cassette'>Cassette {product.queryResult?.product.price.cassette}€</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button className="w-full">Añadir al carrito</Button>
                    </CardContent>
                </Card>
                <ProductContainerInfoArtistCard />

            </div>
        </div>
    )
}