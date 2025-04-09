import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Skeleton } from "../ui/skeleton"
import { UserInfoProps } from "@/hooks/user/UserContext"
import { useUser } from "@/hooks/user/useUser"

export const UserDashboardRecommendedArtistsItem = () => {
    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <div className="flex items-center justify-between sm:min-w-96 hover:bg-gray-100 hover:cursor-pointer p-2 rounded-sm transition ease-in-out">
            <div className="flex items-center gap-2">
                { !imgLoaded && <Skeleton className="rounded-full w-12 h-12" /> }
                <img className={`rounded-full w-12 h-12 ${imgLoaded ? '' : 'hidden'}`} src='https://picsum.photos/800' onLoad={() => {setImgLoaded(true)}}/>
                <div>
                    <p>Machine Gun Kelly</p>
                    <CardDescription>@mgk</CardDescription>
                </div>
            </div>
            <Button className="h-10 mr-1">+ Seguir</Button>
        </div>
    )
}

export const UserDashboardRecommendedArtistsCard = () => {

    return (
        <Card className="grow 2xl:grow-0">
            <CardHeader>
                <CardTitle className="text-xl">Artistas recomendados</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
                <UserDashboardRecommendedArtistsItem />
                <UserDashboardRecommendedArtistsItem />
                <UserDashboardRecommendedArtistsItem />
            </CardContent>
        </Card>
    )
}

export const UserDashboardLatestCardItem = () => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <Card className="px-6 bg-gradient-to-br from-sky-200 to-red-300 h-fit py-10">
            <CardContent className="p-0 sm:px-10 flex justify-start items-center h-full">
                <div className="flex justify-center items-start gap-4 flex-wrap">
                    {!imgLoaded && <Skeleton className="rounded-md w-48 h-48 sm:w-72 sm:h-72" />}
                    <img src='https://picsum.photos/800' className={`rounded-md w-48 h-48 sm:w-72 sm:h-72 ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)}/>
                    <div className="flex flex-col items-center sm:items-start">
                        <p className="text-2xl font-medium">Buenas noches</p>
                        <p>Quevedo</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export const UserDashboardLatestCard = () => {

    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle className="text-xl">Novedades</CardTitle>
                <CardDescription>Descubre lo último de los artistas que sigues</CardDescription>
            </CardHeader>
            <CardContent>
                <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 15000 })]}>
                    <CarouselContent>
                        <CarouselItem>
                            <UserDashboardLatestCardItem />
                        </CarouselItem>
                        <CarouselItem>
                            <UserDashboardLatestCardItem />
                        </CarouselItem>
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

export const UserDashboardRecentlyPlayedCard = () => {
    return (
        <Card className="grow">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-xl">Vuelve a escucharlo</CardTitle>
                    </div>
                    <Button>Mi biblioteca</Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export const UserDashboardRecentOrdersCard = () => {
    return (
        <Card className="grow">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Pedidos recientes</CardTitle>
                    <Button>Ver todo</Button>
                </div>
            </CardHeader>
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

    if (userInfo === undefined) return <></>

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Hola, {userInfo.name}</h1>
            <div className="flex flex-wrap 2xl:flex-nowrap gap-4">
                <UserDashboardLatestCard />
                <UserDashboardRecommendedArtistsCard />
            </div>


            <div className="flex gap-4 flex-wrap">
                <UserDashboardRecentlyPlayedCard />
                <UserDashboardRecentOrdersCard />
            </div>
        </div>

    )
}