import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Skeleton } from "../ui/skeleton"
import { FeaturedArtistItem, FeaturedContentItem, UserInfoProps } from "@/hooks/user/UserContext"
import { useUser } from "@/hooks/user/useUser"
import { Link } from "react-router"
import { UserDashboardFollowedArtistsPopUp } from "./UserDashboardFollowedArtistsPopUp"

export const UserDashboardRecommendedArtistsItem = ({ item }: { item: FeaturedArtistItem }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const [following, setFollowing] = useState(false)
    const user = useUser()

    const handleFollowToggle = () => {
        if (following) {
            user.unfollow(item.artistUsername).then(result => result && setFollowing(false))
        } else {
            user.follow(item.artistUsername).then(result => result && setFollowing(true))
        }
    }

    return (
        <div className="flex items-center justify-between sm:min-w-96 hover:bg-gray-100 hover:cursor-pointer p-2 rounded-sm transition ease-in-out">
            <div className="flex items-center gap-2">
                {!imgLoaded && <Skeleton className="rounded-full w-12 h-12" />}
                <img className={`rounded-full w-12 h-12 ${imgLoaded ? '' : 'hidden'}`} src={item.imgUrl} onLoad={() => { setImgLoaded(true) }} />
                <div>
                    <p>{item.artistName}</p>
                    <CardDescription>@{item.artistUsername}</CardDescription>
                </div>
            </div>
            <Button onClick={handleFollowToggle} variant={following ? 'outline' : 'default'} className="h-10 mr-1">{following ? 'Siguiendo' : 'Seguir'}</Button>
        </div>
    )
}

export const UserDashboardRecommendedArtistsCard = () => {
    const [artists, setArtists] = useState<FeaturedArtistItem[] | undefined>(undefined)
    const user = useUser()

    useEffect(() => {
        user.getFeaturedArtists().then(a => setArtists(a))
    }, [])

    if (artists === undefined) return <Skeleton className="grow 2xl:grow-0" />

    return (
        <Card className="grow 2xl:grow-0">
            <CardHeader>
                <CardTitle className="text-xl">Artistas recomendados</CardTitle>
                
            </CardHeader>
            <CardContent className="flex flex-col">
                {artists.map(artist => (
                    <UserDashboardRecommendedArtistsItem item={artist} />
                ))}
            </CardContent>
            <CardFooter>
                <UserDashboardFollowedArtistsPopUp/>
            </CardFooter>
        </Card>
    )
}

export const UserDashboardLatestCardItem = ({ item }: { item: FeaturedContentItem }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <Card className="px-6 bg-gradient-to-br from-sky-200 to-red-300 h-fit py-10">
            <Link to={`/${item.type}/${item._id}`}>
                <CardContent className="p-0 sm:px-10 flex justify-start items-center h-full">
                    <div className="flex justify-center items-start gap-4 flex-wrap">
                        {!imgLoaded && <Skeleton className="rounded-md w-48 h-48 sm:w-72 sm:h-72" />}
                        <img src={item.imgUrl} className={`rounded-md w-48 h-48 sm:w-72 sm:h-72 ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                        <div className="flex flex-col items-center sm:items-start max-w-[60%]">
                            <p className="text-2xl font-medium">{item.title}</p>
                            <p>{item.author.artistName}</p>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    )
}

export const UserDashboardLatestCard = () => {
    const [content, setContent] = useState<FeaturedContentItem[] | undefined>(undefined)
    const user = useUser()

    useEffect(() => {
        user.getFeaturedContent().then(c => setContent(c))
    }, [])

    if (content === undefined) return <Skeleton className="grow" />

    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle className="text-xl">Novedades</CardTitle>
                <CardDescription>Descubre lo último de los artistas que sigues</CardDescription>
            </CardHeader>
            <CardContent>
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 15000 })]}>
                    <CarouselContent>
                        {content.slice(0, 2).map(item => (
                            <CarouselItem>
                                <UserDashboardLatestCardItem item={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute top-1/2 left-4 items-center justify-center hidden sm:flex">
                        <CarouselPrevious className="relative left-0 translate-x-0" />
                    </div>
                    <div className="absolute top-1/2 right-4 items-center justify-center hidden sm:flex">
                        <CarouselNext className="relative right-0 translate-x-0" />
                    </div>
                </Carousel>
            </CardContent>
        </Card>
    )
}

export const UserDashboard = () => {
    const user = useUser()
    const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>(undefined)

    useEffect(() => {
        user.getUserInfo()
            .then(user => setUserInfo(user))
    }, [])

    if (userInfo === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Hola, {userInfo.name}</h1>
            <div className="flex flex-wrap 2xl:flex-nowrap gap-4">
                <UserDashboardLatestCard />
                <UserDashboardRecommendedArtistsCard />
            </div>
        </div>

    )
}