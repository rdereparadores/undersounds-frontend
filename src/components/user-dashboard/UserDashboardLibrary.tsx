import { TabsContent } from "@radix-ui/react-tabs"
import { Input } from "../ui/input"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FaPlay } from "react-icons/fa"
import { FaDownload } from "react-icons/fa"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { LibraryAlbum, LibrarySong } from "@/hooks/user/UserContext"
import { useUser } from "@/hooks/user/useUser"
import { formatTime } from "@/lib/formatTime"
import { useMusicPlayer } from "@/hooks/music-player/useMusicPlayer"

export const UserDashboardLibrarySongItem = ({ item }: { item: LibrarySong }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const musicPlayer = useMusicPlayer()
    return (
        <Card>
            <CardHeader className="p-0 relative">
                {!imgLoaded && <Skeleton className="w-48 h-48 rounded-xl rounded-b-none" />}
                <img src={item.imgUrl} className={`w-48 h-48 rounded-xl rounded-b-none ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                <Button onClick={() => {musicPlayer.play(item._id)}} className="absolute bottom-2 right-2 rounded-full w-10 h-10">
                    <FaPlay className="ml-[3px]" />
                </Button>
                <Button variant='secondary' className="absolute bottom-2 right-14 rounded-full w-10 h-10">
                    <FaDownload />
                </Button>
            </CardHeader>
            <CardContent className="pt-2 px-2">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.author.artistName} {item.collaborators.length > 0 && `, ${item.collaborators.map(c => c.artistName).join(', ')}`}</CardDescription>
            </CardContent>
        </Card>
    )
}

export const UserDashboardLibraryAlbumItemTrack = ({ item }: { item: LibrarySong }) => {
    const musicPlayer = useMusicPlayer()
    return (
        <TableRow>
            <TableCell className="flex gap-2">
                <Button onClick={() => {musicPlayer.play(item._id)}} className="rounded-full w-10 h-10">
                    <FaPlay className="ml-[3px]" />
                </Button>
                <Button variant='secondary' className="rounded-full w-10 h-10">
                    <FaDownload />
                </Button>
            </TableCell>
            <TableCell>
                <p>{item.title}</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>{item.author.artistName} {item.collaborators.length > 0 && `, ${item.collaborators.map(c => c.artistName).join(', ')}`}</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>{formatTime(item.duration)}</p>
            </TableCell>
        </TableRow>
    )
}

export const UserDashboardLibraryAlbumItem = ({ item }: { item: LibraryAlbum }) => {
    const [open, setOpen] = useState(false)
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <Card>
            <CardHeader>
                <div className="flex gap-4 flex-wrap justify-center">
                    {!imgLoaded && <Skeleton className="w-32 h-32 rounded-xl" />}
                    <img src={item.imgUrl} className={`w-32 h-32 rounded-xl ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                    <div className="flex flex-col gap-1">
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.author.artistName}</CardDescription>
                        <CardDescription>{item.trackList.length} pistas | {formatTime(item.duration)}</CardDescription>
                    </div>
                    <div className="flex flex-col grow -mt-3">
                        <Collapsible open={open} onOpenChange={setOpen}>
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Acciones</TableHead>
                                            <TableHead>Título</TableHead>
                                            <TableHead className="hidden sm:table-cell">Artista</TableHead>
                                            <TableHead className="hidden sm:table-cell">Duración</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        <UserDashboardLibraryAlbumItemTrack item={item.trackList[0]} />
                                        {item.trackList.length > 1 && <UserDashboardLibraryAlbumItemTrack item={item.trackList[1]} />}

                                        {item.trackList.slice(2).map((item, index) => (
                                            <CollapsibleContent asChild>
                                                <UserDashboardLibraryAlbumItemTrack key={index} item={item} />
                                            </CollapsibleContent>
                                        ))}
                                    </TableBody>

                                </Table>
                                {item.trackList.length > 2 &&
                                    <CollapsibleTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            {open ? 'Ver menos' : 'Ver más'}
                                        </Button>
                                    </CollapsibleTrigger>
                                }
                            </>

                        </Collapsible>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export const UserDashboardLibrary = () => {
    const user = useUser()
    const [songLibrary, setSongLibrary] = useState<LibrarySong[] | undefined>(undefined)
    const [albumLibrary, setAlbumLibrary] = useState<LibraryAlbum[] | undefined>(undefined)

    useEffect(() => {
        user.getLibrarySongs().then(songs => setSongLibrary(songs))
        user.getLibraryAlbums().then(albums => setAlbumLibrary(albums))
    }, [])

    if (songLibrary === undefined || albumLibrary === undefined) return <Skeleton className="grow flex flex-col flex-wrap gap-2" />

    return (
        <div className="grow flex flex-col flex-wrap gap-2">
            <div className="flex justify-between flex-wrap gap-2">
                <h1 className="text-3xl font-medium">Biblioteca</h1>
                <Input type='search' placeholder="Buscar..." className="sm:max-w-72"></Input>
            </div>
            <Tabs defaultValue="songs">
                <TabsList className="mb-2">
                    <TabsTrigger value='songs'>Canciones</TabsTrigger>
                    <TabsTrigger value='albums'>Álbumes</TabsTrigger>
                </TabsList>
                <TabsContent value='songs'>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                        {songLibrary.map((item, index) => (
                            <UserDashboardLibrarySongItem key={index} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='albums'>
                    <div className="flex flex-col gap-4">
                        {albumLibrary.map((item, index) => (
                            <UserDashboardLibraryAlbumItem key={index} item={item} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}