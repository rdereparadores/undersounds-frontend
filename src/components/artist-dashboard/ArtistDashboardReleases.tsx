import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { TableCell, TableRow } from "../ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { FaDownload, FaEdit, FaPlay } from "react-icons/fa"
import { Skeleton } from "../ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useNavigate } from "react-router"
import { useArtist } from "@/hooks/artist/useArtist"
import { ArtistAlbumProps, ArtistInfoProps, ArtistSongProps } from "@/hooks/artist/ArtistContext"
import { ArtistDashboardReleasesEditSongPopUp } from "./ArtistDashboardReleasesEditSongPopUp"
import { useMusicPlayer } from "@/hooks/music-player/useMusicPlayer"

export const ArtistDashboardReleasesSongsItem = ({ song, artistData }: { song: ArtistSongProps, artistData: ArtistInfoProps }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const musicPlayer = useMusicPlayer()

    return (
        <Card>
            <CardHeader className="p-0 relative">
                <div>
                    <div>
                        {!imgLoaded && <Skeleton className="w-48 h-48 rounded-xl rounded-b-none" />}
                        <img src={song.imgUrl} className={`w-48 h-48 rounded-xl rounded-b-none ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                        <Button onClick={() => {musicPlayer.play(song._id)}} className="absolute bottom-2 right-2 rounded-full w-10 h-10">
                            <FaPlay className="ml-[3px]" />
                        </Button>
                        <Button variant='secondary' className="absolute bottom-2 right-14 rounded-full w-10 h-10">
                            <FaDownload />
                        </Button>
                    </div>
                    <ArtistDashboardReleasesEditSongPopUp song={song} />
                </div>
            </CardHeader>
            <CardContent className="pt-2 px-2 w-min h-min">
                <CardTitle className="">{song.title}</CardTitle>
                <CardDescription>{artistData?.artistName}</CardDescription>
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardReleasesAlbumsItemTrack = ({ song, artistData }: { song: ArtistSongProps, artistData: ArtistInfoProps }) => {
    const musicPlayer = useMusicPlayer()
    return (
        <TableRow>
            <TableCell className="flex gap-2">
                <Button onClick={() => {musicPlayer.play(song._id)}} className="rounded-full w-10 h-10">
                    <FaPlay className="ml-[3px]" />
                </Button>
                <Button variant='secondary' className="rounded-full w-10 h-10">
                    <FaDownload />
                </Button>
            </TableCell>
            <TableCell>
                <p>{song.title}</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>{artistData?.artistName}</p>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
                <p>{song.duration}</p>
            </TableCell>
        </TableRow>
    )
}

export const ArtistDashboardReleasesAlbumsItem = ({ album, artistData }: { album: ArtistAlbumProps, artistData: ArtistInfoProps }) => {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <Card>
            <CardHeader>
                <div className="flex gap-4 flex-wrap justify-center">
                    {!imgLoaded && <Skeleton className="w-32 h-32 rounded-xl" />}
                    <img src={album.imgUrl} className={`w-32 h-32 rounded-xl ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                    <div className="flex flex-col gap-1">
                        <CardTitle>{album.title}</CardTitle>
                        <CardDescription>{artistData?.artistName}</CardDescription>
                        <CardDescription>{album.trackList.length} pistas | {album.duration}</CardDescription>
                    </div>
                    <div className="flex flex-col grow items-end">
                        <Button className="w-10 h-10 pl-4" variant='outline'><FaEdit /></Button>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}

export const ArtistDashboardReleases = () => {
    const navigate = useNavigate()
    const artist = useArtist()
    const [songList, setSongList] = useState<ArtistSongProps[] | undefined>()
    const [albumList, setAlbumList] = useState<ArtistAlbumProps[] | undefined>()
    const [artistData, setArtistData] = useState<ArtistInfoProps | undefined>(undefined)

    useEffect(() => {
        artist.getArtistSongs()
            .then(songs => setSongList(songs))

        artist.getArtistAlbums()
            .then(albums => setAlbumList(albums))

        artist.getArtistInfo()
            .then(data => setArtistData(data))
    }, [])

    if (songList === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />
    if (albumList === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />
    if (artistData === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <div className="flex gap-4 justify-between">
                <h1 className="text-3xl font-medium">Lanzamientos</h1>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button>+ Nuevo lanzamiento</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => { navigate('new/song') }}>
                            Canción
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { navigate('new/album') }}>
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
                        {songList
                            .filter((song) => song.version === undefined) // Filtra las canciones que no tienen versión
                            .map((song, index) => (
                                <ArtistDashboardReleasesSongsItem song={song} artistData={artistData} key={index} />
                            ))}
                    </div>
                </TabsContent>
                <TabsContent value='albums'>
                    <div className="flex flex-col gap-4">
                        {albumList
                            .filter((album) => album.version === undefined)
                            .map((album, index) => (
                            <ArtistDashboardReleasesAlbumsItem album={album} artistData={artistData} key={index} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}