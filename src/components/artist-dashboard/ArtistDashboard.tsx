import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { IoIosTrendingUp } from "react-icons/io"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"


export const ArtistDashboard = () => {

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Hola, Artista</h1>

            <div className="flex h-fit">
                <div className="flex-col w-[50%] mr-3 h-fit">
                    <Card className="grow min-w-fit mb-3">
                        <CardHeader className="pb-2">
                            <CardTitle>Copias vendidas</CardTitle>
                            <CardDescription>Último mes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-3xl">2715</p>
                            <CardDescription className="flex gap-1">
                                <IoIosTrendingUp className="mt-1" /> 45% más que el mes anterior
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="grow min-w-fit h-fit">
                        <CardHeader className="pb-2">
                            <CardTitle>Oyentes únicos</CardTitle>
                            <CardDescription>Último mes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-3xl">27676</p>
                            <CardDescription className="flex gap-1">
                                <IoIosTrendingUp className="mt-1" />16365 más que el mes anterior
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-[50%] h-full">
                    <ArtistDashboardReviewLastSong />
                </div>
            </div>
            <div className="flex flex-wrap 2xl:flex-nowrap gap-4">
                <ArtistDashboardLastSongs></ArtistDashboardLastSongs>
            </div>
        </div>
    )
}

export const ArtistDashboardLastSongs = () => {
    return (
        <Card className="grow w-[100%]">
            <CardHeader>
                <CardTitle className="text-xl">Últimas canciones lanzadas</CardTitle>
                <p>Descubre que tanto estan pegando tus últimas canciones</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <ArtistDashboardLastSongTable></ArtistDashboardLastSongTable>
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardLastSongTable = () => {
    return (
        <Table>
            <TableBody>
                <ArtistDashboardLastSongsSong />
                <ArtistDashboardLastSongsSong />
                <ArtistDashboardLastSongsSong />
                <ArtistDashboardLastSongsSong />
            </TableBody>
        </Table>
    )
}

export const ArtistDashboardLastSongsSong = () => {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <TableRow>
            <TableCell className="font-medium">
                {!imgLoaded && <Skeleton className="rounded-full w-12 h-12" />}
                <img className={`rounded-full w-12 h-12 ${imgLoaded ? '' : 'hidden'}`} src='https://picsum.photos/800' onLoad={() => { setImgLoaded(true) }} /></TableCell>
            <TableCell>La Macarena</TableCell>
            <TableCell>
                <div className="flex items-center">
                    <IoIosTrendingUp className="mr-1" /><p>Se ha escuchado un 20% más.</p>
                </div>
            </TableCell>
            <TableCell>Ha generado 54€</TableCell>
            <TableCell className="text-center">
                <p>Donde más se ha escuchado tu música es en España</p>
            </TableCell>
        </TableRow>
    )
}


export const ArtistDashboardReviewLastSong = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl">Reseñas de lo último que has sacado</CardTitle>
                        <p>Mira a ver que opina la gente de tu "NOMBRE ULTIMO LANZAMIENTO"</p>
                    </div>
                    <div>
                        <Button>Ir a lanzamiento</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-md">Me ha parecido un gran álbum</Badge>
                <Badge variant="outline" className="text-md">La mitad de las canciones son bastante buenas el resto decentes</Badge>
                <Badge variant="outline" className="text-md">No me ha terminado de convencer</Badge>
                <Badge variant="outline" className="text-md">Bastante mejor de lo que me esperaba</Badge>
                <Badge variant="outline" className="text-md">Muy chuloo</Badge>
                <Badge variant="outline" className="text-md">Eres el mejor en este tipo de música</Badge>
            </CardContent>
        </Card>
    )
}
