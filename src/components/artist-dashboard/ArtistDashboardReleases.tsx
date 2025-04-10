import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { TableCell, TableRow } from "../ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { FaDownload, FaEdit, FaPlay } from "react-icons/fa"
import { Skeleton } from "../ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useNavigate } from "react-router"

export const ArtistDashboardReleasesSongsItem = () => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <Card>
            <CardHeader className="p-0 relative">
                {!imgLoaded && <Skeleton className="w-48 h-48 rounded-xl rounded-b-none" />}
                <img src='https://picsum.photos/400' className={`w-48 h-48 rounded-xl rounded-b-none ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                <Button className="absolute bottom-2 right-2 rounded-full w-10 h-10">
                    <FaPlay className="ml-[3px]" />
                </Button>
                <Button variant='secondary' className="absolute bottom-2 right-14 rounded-full w-10 h-10">
                    <FaDownload />
                </Button>
                <Button variant='secondary' className="absolute top-1 right-[11px] rounded-full w-10 h-10">
                    <FaEdit className="ml-[2px]" />
                </Button>
            </CardHeader>
            <CardContent className="pt-2 px-2">
                <CardTitle>Buenas noches</CardTitle>
                <CardDescription>Quevedo</CardDescription>
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardReleasesAlbumsItemTrack = () => {
    return (
        <TableRow>
            <TableCell className="flex gap-2">
                <Button className="rounded-full w-10 h-10">
                    <FaPlay className="ml-[3px]" />
                </Button>
                <Button variant='secondary' className="rounded-full w-10 h-10">
                    <FaDownload />
                </Button>
            </TableCell>
            <TableCell>
                <p>Duro</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>Quevedo</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>3:14</p>
            </TableCell>
        </TableRow>
    )
}

export const ArtistDashboardReleasesAlbumsItem = () => {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <Card>
            <CardHeader>
                <div className="flex gap-4 flex-wrap justify-center">
                    {!imgLoaded && <Skeleton className="w-32 h-32 rounded-xl" />}
                    <img src='https://picsum.photos/400' className={`w-32 h-32 rounded-xl ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                    <div className="flex flex-col gap-1">
                        <CardTitle>Buenas noches</CardTitle>
                        <CardDescription>Quevedo</CardDescription>
                        <CardDescription>5 pistas | 35:05</CardDescription>
                    </div>
                    <div className="flex flex-col grow items-end">
                        <Button className="w-10 h-10 pl-4" variant='outline'><FaEdit/></Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export const ArtistDashboardReleases = () => {
    const navigate = useNavigate()

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <div className="flex gap-4 justify-between">
                <h1 className="text-3xl font-medium">Lanzamientos</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button>+ Nuevo lanzamiento</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => {navigate('new/song')}}>
                            Canción
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {navigate('new/album')}}>
                            Álbum
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Tabs defaultValue="songs">
                <TabsList>
                    <TabsTrigger value='songs'>Canciones</TabsTrigger>
                    <TabsTrigger value='albums'>Álbumes</TabsTrigger>
                </TabsList>
                <TabsContent value='songs'>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                        <ArtistDashboardReleasesSongsItem />
                        <ArtistDashboardReleasesSongsItem />
                        <ArtistDashboardReleasesSongsItem />
                        <ArtistDashboardReleasesSongsItem />
                    </div>
                    
                </TabsContent>
                <TabsContent value='albums'>
                    <div className="flex flex-col gap-4">
                        <ArtistDashboardReleasesAlbumsItem />
                        <ArtistDashboardReleasesAlbumsItem />
                        <ArtistDashboardReleasesAlbumsItem />
                        <ArtistDashboardReleasesAlbumsItem />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}