import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useArtistProfile } from "@/hooks/artist-profile/useArtistProfile"
import { ArtistProfileItem, ArtistProfileProps } from "@/hooks/artist-profile/ArtistProfileContext"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import { useUser } from "@/hooks/user/useUser"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { ShopItemCard } from "../shop/ShopItemCard"

export const ArtistProfileHeader = ({ profile }: { profile: ArtistProfileProps }) => {
    const user = useUser()
    const params = useParams()
    const [following, setFollowing] = useState<boolean>(false)
    const [bannerImgLoaded, setBannerImgLoaded] = useState<boolean>(false)
    const [profileImgLoaded, setProfileImgLoaded] = useState<boolean>(false)

    const toggleFollow = () => {
        if (following) {
            user.unfollow(params.artistUsername!).then((result) => { if (result) setFollowing(false) })
            profile!.artist.followers--
        } else {
            user.follow(params.artistUsername!).then((result) => { if (result) setFollowing(true) })
            profile!.artist.followers++
        }
    }

    useEffect(() => {
        user.isFollowing(params.artistUsername!).then(result => setFollowing(result))
    }, [])

    return (
        <div className="relative">
            {!bannerImgLoaded && <Skeleton className='min-w-full grow min-h-96' />}
            <img
                alt='Banner de artista'
                hidden={!bannerImgLoaded}
                onLoad={() => setBannerImgLoaded(true)}
                src={profile.artist.artistBannerUrl}
                className="rounded-lg w-[100%] h-72 object-cover"
            />
            <div className="sm:absolute flex gap-4 -bottom-24 left-4">
                {!profileImgLoaded && <Skeleton className="rounded-full object-cover w-48 h-48 hidden sm:block" />}
                <img
                    alt='Imagen de perfil de artista'
                    hidden={!profileImgLoaded}
                    onLoad={() => setProfileImgLoaded(true)}
                    src={profile.artist.artistImgUrl}
                    className="rounded-full object-cover w-48 h-48 hidden sm:block"
                />
                <div className="flex flex-col justify-end w-full pb-4">
                    <div className="flex gap-4 flex-wrap">
                        <p className="font-bold text-3xl text-left">{profile.artist.artistName}</p>
                        <Button onClick={toggleFollow} variant={following ? 'default' : 'outline'} className="w-fit h-[40px]">
                            {following ? 'Siguiendo' : 'Seguir'}
                        </Button>
                    </div>
                    <p className="text-xl text-left">{profile.artist.followers} seguidores</p>
                </div>
            </div>
        </div>
    )
}

export const ArtistProfileTopSongs = ({ topSongs }: { topSongs: ArtistProfileItem[] }) => {

    return (
        <div className="grow">
            <p className="font-bold text-2xl">Lo más escuchado</p>
            {topSongs.length === 0 ?
                <p>No hay canciones disponibles</p>
                :
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Título</TableHead>
                            <TableHead>Artistas</TableHead>
                            <TableHead>Reproducciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topSongs.map((song, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-20"><img src={song.imgUrl} className="rounded-md w-16 h-16" /></TableCell>
                                <TableCell>
                                    <Link to={`/song/${song._id}`}>
                                        <Button className="p-0" variant='link'>{song.title}</Button>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/profile/artist/${song.author.artistUsername}`}>
                                        <Button className="p-0" variant='link'>{song.author.artistName}</Button>
                                    </Link>
                                    {song.collaborators.length > 0 &&
                                        song.collaborators.map((collaborator, index) => (
                                            <Link key={index} to={`/profile/artist/${collaborator.artistUsername}`}>
                                                {index !== song.collaborators.length - 1 && <span>, </span>}
                                                <Button className="p-0" variant='link'>{collaborator.artistName}</Button>
                                            </Link>
                                        ))
                                    }
                                </TableCell>
                                <TableCell>{song.plays} reproducciones</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        </div>
    )
}

export const ArtistProfileFeaturedRelease = ({ release }: { release: ArtistProfileItem | undefined }) => {
    return (
        <div>
            <p className="font-bold text-2xl mb-2">Lanzamiento destacado</p>
            {!release ?
                <p>No hay lanzamientos recientes</p>
                :
                <Link to={`/${release.type}/${release._id}`}>
                    <Card>
                        <CardHeader>
                            <img src={release.imgUrl} className="rounded-md w-64 h-64" />
                            <CardTitle>{release.title}</CardTitle>
                            <CardDescription>
                                <Link to={`/profile/artist/${release.author.artistUsername}`}>
                                    {release.author.artistName}
                                </Link>
                                {release.collaborators.map((collaborator, index) => (
                                    <Link key={index} to={`/profile/artist/${collaborator.artistUsername}`}>
                                        {index !== release.collaborators.length - 1 && <span>, </span>}
                                        {collaborator.artistName}
                                    </Link>
                                ))}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
            }
        </div>
    )
}

export function ArtistProfile() {
    const params = useParams()
    const artistProfile = useArtistProfile()

    const [profile, setProfile] = useState<ArtistProfileProps | undefined>(undefined)


    useEffect(() => {
        artistProfile.getArtistProfile(params.artistUsername!).then(artist => setProfile(artist))
    }, [])


    if (profile === undefined) {
        return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />
    }

    return (
        <div className="flex flex-col gap-2">
            <ArtistProfileHeader profile={profile} />

            <div className="flex gap-4 sm:mt-28 flex-wrap">
                <ArtistProfileTopSongs topSongs={profile.topSongs} />
                <ArtistProfileFeaturedRelease release={profile.featuredRelease} />
            </div>

            {profile.albums.length > 0 && (
                <div className="w-full h-fit flex flex-col flex-wrap gap-2 items-center">
                    <p className="font-bold text-2xl self-start">Álbumes</p>

                    <Carousel className="w-[90%]">
                        <CarouselContent>
                            {profile.albums.map((album, index) => (
                                <CarouselItem key={index} className="basis-auto">
                                    <ShopItemCard item={album} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='max-sm:hidden' />
                        <CarouselNext className='max-sm:hidden' />
                    </Carousel>
                </div>
            )}

            {profile.songs.length > 0 && (
                <div className="w-full h-fit flex flex-col flex-wrap gap-2 items-center">
                    <p className="font-bold text-2xl self-start">Canciones</p>

                    <Carousel className="w-[90%]">
                        <CarouselContent>
                            {profile.songs.map((song, index) => (
                                <CarouselItem key={index} className="basis-auto">
                                    <ShopItemCard item={song} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='max-sm:hidden' />
                        <CarouselNext className='max-sm:hidden' />
                    </Carousel>
                </div>
            )}
        </div>
    );
}