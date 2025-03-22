import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

export const ProductContainerInfoArtistCard = () => {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <Card className="mt-3">
            <CardHeader className='flex flex-col gap-2'>
                <div className='flex gap-5 items-center justify-center'>
                    {!imgLoaded && <Skeleton className="rounded-full w-[48px] aspect-square" />}
                    <img hidden={!imgLoaded} className='rounded-full w-[48px] aspect-square' src='http://picsum.photos/48' onLoad={() => {setImgLoaded(true)}} />
                    <div>
                        <p className="font-medium">Machine Gun Kelly</p>
                        <p className='text-sm'>1782762 seguidores</p>
                    </div>
                    <Button>+ Seguir</Button>
                </div>
                <Button variant='outline'>Ver perfil</Button>
            </CardHeader>
        </Card>
    )
}

export const ProductContainerInfo = () => {

    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <div className='flex mt-3 gap-3 flex-wrap flex-grow justify-center'>
            {!imgLoaded && <Skeleton className="h-96 aspect-square rounded-md" />}
            <img hidden={!imgLoaded} className='h-96 aspect-square rounded-md' src='http://picsum.photos/200' onLoad={() => { setImgLoaded(true) }} />
            <div className='flex flex-col grow-[2] flex-shrink'>
                <h2 className='font-bold text-2xl'>Título de canción</h2>
                <h3 className='text-xl mb-2'>Artista</h3>
                <h3>Publicado el 21/03/2025</h3>
                <div className='mt-2 flex gap-2'>
                    <Badge variant='outline'>Pop</Badge>
                    <Badge variant='outline'>Rock</Badge>
                </div>
                <p className="mt-2 max-w-[500px] min-w-[150px] break-words flex-shrink">Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
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
                                    <SelectItem value='digital'>Descarga digital 4,99€</SelectItem>
                                    <SelectItem value='cd'>CD 12,99€</SelectItem>
                                    <SelectItem value='vinyl'>Vinilo 17,99€</SelectItem>
                                    <SelectItem value='cassette'>Cassette 15,99€</SelectItem>
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