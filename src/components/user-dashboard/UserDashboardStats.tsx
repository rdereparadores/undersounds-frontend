import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { IoIosTrendingUp } from "react-icons/io"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { UserStatsProps } from "@/hooks/user-stats/UserStatsContext"
import { useUserStats } from "@/hooks/user-stats/useUserStats"

export const UserDashboardStatsHeader = ({ stats }: { stats: UserStatsProps }) => {
    const listeningTimePercentage = stats.listeningTime.thisMonth / stats.listeningTime.pastMonth * 100
    return (
        <div className="flex gap-4 flex-wrap">
            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Tiempo de escucha</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    {stats.listeningTime.thisMonth !== -1 ?
                        <>
                            <p className="font-bold text-3xl">{stats.listeningTime.thisMonth}<span className="font-normal text-lg"> minutos</span></p>
                            <CardDescription className="flex gap-1">
                                <IoIosTrendingUp className="mt-1" /> {listeningTimePercentage === Infinity ? 100 : listeningTimePercentage}% respecto al mes anterior
                            </CardDescription>
                        </>
                        :
                        <>
                            <p className="font-bold text-3xl">Sin datos</p>
                        </>
                    }
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Formato preferido</CardTitle>
                    <CardDescription>Desde el inicio</CardDescription>
                </CardHeader>
                <CardContent>
                    {stats.preferredFormat.percentage !== -1 ?
                        <>
                            <p className="font-bold text-3xl">{stats.preferredFormat.format}</p>
                            <CardDescription className="flex gap-1">
                                {Math.round(stats.preferredFormat.percentage / 10)} de cada 10 compras
                            </CardDescription>
                        </>
                        :
                        <>
                            <p className="font-bold text-3xl">Sin datos</p>
                        </>
                    }
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Género preferido</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    {stats.preferredGenre.thisMonth !== 'N/A' ?
                        <>
                            <p className="font-bold text-3xl">{stats.preferredGenre.thisMonth}</p>
                            <CardDescription className="flex gap-1">
                                vs. {stats.preferredGenre.pastMonth} el mes anterior
                            </CardDescription>
                        </>
                        :
                        <>
                            <p className="font-bold text-3xl">Sin datos</p>
                        </>
                    }
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Artista más escuchado</CardTitle>
                    <CardDescription>¿Tu nuevo crush musical?</CardDescription>
                </CardHeader>
                <CardContent>
                    {stats.mostListenedArtist.thisMonth.percentage !== -1 ?
                        <>
                            <p className="font-bold text-3xl">{stats.mostListenedArtist.thisMonth.artistName}</p>
                            <CardDescription className="flex gap-1">
                                {stats.mostListenedArtist.thisMonth.percentage}% del tiempo de escucha
                            </CardDescription>
                        </>
                        :
                        <>
                            <p className="font-bold text-3xl">Sin datos</p>
                        </>

                    }
                </CardContent>
            </Card>
        </div>
    )
}

export const UserDashboardStatsFormatChart = ({ stats }: { stats: UserStatsProps }) => {

    const formatData = [
        { format: 'digital', quantity: stats.ordersFormat.digital, fill: "#3b82f6" },
        { format: 'cd', quantity: stats.ordersFormat.cd, fill: "#ef4444" },
        { format: 'vinyl', quantity: stats.ordersFormat.vinyl, fill: "#22c55e" },
        { format: 'cassette', quantity: stats.ordersFormat.cassette, fill: "#f59e0b" }
    ].filter(item => item.quantity > 0)

    const formatConfig = {
        quantity: {
            label: "Artículos"
        }
    }

    const totalPurchases = () => {
        return formatData.reduce((prev, curr) => prev + curr.quantity, 0)
    }

    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Compras por formato</CardTitle>
                <CardDescription>{totalPurchases()} artículos</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="mx-auto w-64 aspect-square max-h-[250px]" config={formatConfig}>
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={formatData} dataKey='quantity' nameKey='format' innerRadius={60} strokeWidth={5} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export const UserDashboardStatsTopArtistsChart = ({ stats }: { stats: UserStatsProps }) => {

    const topArtistsConfig = {
        plays: {
            label: 'Reproducciones'
        }

    } satisfies ChartConfig

    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Artistas más escuchados</CardTitle>
            </CardHeader>
            <CardContent>
                {stats.topArtists.length > 0 ?
                    <ChartContainer className="mx-auto aspect-square max-w-[300px]" config={topArtistsConfig}>
                        <BarChart accessibilityLayer data={stats.topArtists} layout="vertical" margin={{ left: 0 }}>
                            <YAxis dataKey='artistName' type='category' tickLine={false} tickMargin={1} axisLine={false} />
                            <XAxis dataKey='plays' type='number' hide />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Bar dataKey='plays' layout='vertical' radius={5} />
                        </BarChart>
                    </ChartContainer>
                :
                    <p className="font-bold text-3xl">Sin datos</p>
                }
            </CardContent>
        </Card>
    )
}

export const UserDashboardStatsTopArtistCard = ({ stats }: { stats: UserStatsProps }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Insignia de artista</CardTitle>
            </CardHeader>
            <CardContent>
                {stats.artistBadge.percentile !== -1 ?
                    <>
                        <div className="flex gap-4 flex-wrap">
                            {!imgLoaded && <Skeleton className="w-16 h-16 rounded-full" />}
                            <img src={stats.artistBadge.artistImgUrl} className={`w-16 h-16 rounded-full ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                            <div className="flex flex-col justify-center flex-wrap">
                                <p className="font-medium text-xl">{stats.artistBadge.artistName}</p>
                                <p>Estás en el top {stats.artistBadge.percentile}% de oyentes</p>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <p className="font-bold text-3xl">Sin datos</p>
                    </>
                }
            </CardContent>
        </Card>
    )
}

export const UserDashboardStats = () => {
    const userStats = useUserStats()
    const [stats, setStats] = useState<UserStatsProps | undefined>(undefined)

    useEffect(() => {
        userStats.getUserStats().then(userStats => setStats(userStats))
    }, [userStats])

    if (stats === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Estadísticas</h1>
            <UserDashboardStatsHeader stats={stats} />
            <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col gap-4 flex-wrap">
                    <UserDashboardStatsTopArtistCard stats={stats} />
                    <UserDashboardStatsFormatChart stats={stats} />
                </div>
                <UserDashboardStatsTopArtistsChart stats={stats} />
            </div>
        </div>
    )
}