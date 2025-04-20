import { IoIosTrendingUp } from "react-icons/io"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"
import { useArtistStats } from "@/hooks/artist-stats/useArtistStats"
import { useEffect, useState } from "react"
import { ArtistStatsProps } from "@/hooks/artist-stats/ArtistStatsContext"
import { Skeleton } from "../ui/skeleton"

export const ArtistDashboardStatsHeader = ({ stats }: { stats: ArtistStatsProps }) => {
    return (
        <div className="flex gap-4 flex-wrap">
            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Copias vendidas</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    {stats.copiesSold.thisMonth > 0 ?
                        <>
                            <p className="font-bold text-3xl">{stats.copiesSold.thisMonth}</p>
                            <CardDescription className="flex gap-1">
                                <IoIosTrendingUp className="mt-1" />{stats.copiesSold.thisMonth / stats.copiesSold.pastMonth * 100 || 100} % respecto al mes anterior
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
                    <CardTitle>Lanzamientos</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">{stats.releases.thisMonth}</p>
                    <CardDescription className="flex gap-1">
                        vs. {stats.releases.pastMonth} el mes anterior
                    </CardDescription>
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Formato más vendido</CardTitle>
                    <CardDescription>Desde el inicio</CardDescription>
                </CardHeader>
                <CardContent>
                    {stats.mostSoldFormat.format !== 'N/A' ?
                        <>
                            <p className="font-bold text-3xl">{stats.mostSoldFormat.format}</p>
                            <CardDescription className="flex gap-1">
                                {Math.round(stats.mostSoldFormat.percentage / 10)} de cada 10 compras
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
                    <CardTitle>Oyentes únicos</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">{stats.monthlyListeners.thisMonth}</p>
                    <CardDescription className="flex gap-1">
                        <IoIosTrendingUp className="mt-1" />{stats.monthlyListeners.thisMonth - stats.monthlyListeners.pastMonth} más que el mes anterior
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}

export const ArtistDashboardStatsFormatChart = ({ stats }: { stats: ArtistStatsProps }) => {
    const formatData = [
        { format: 'digital', quantity: stats.salesFormat.digital, fill: "#3b82f6" },
        { format: 'cd', quantity: stats.salesFormat.cd, fill: "#ef4444" },
        { format: 'vinyl', quantity: stats.salesFormat.vinyl, fill: "#22c55e" },
        { format: 'cassette', quantity: stats.salesFormat.cassette, fill: "#f59e0b" }
    ].filter(item => item.quantity > 0)

    const formatConfig = {
        quantity: {
            label: "Artículos"
        }
    }

    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Ventas por formato</CardTitle>
                <CardDescription>Último mes</CardDescription>
            </CardHeader>
            <CardContent>
                {formatData.length > 0 ?
                    <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={formatConfig}>
                        <PieChart>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Pie data={formatData} dataKey='quantity' nameKey='format' innerRadius={60} strokeWidth={5} />
                        </PieChart>
                    </ChartContainer>
                    :
                    <>
                        <p className="font-bold text-3xl">Sin datos</p>
                    </>
                }
            </CardContent>
        </Card>
    )
}



export const ArtistDashboardStatsTopSoldChart = ({ stats }: { stats: ArtistStatsProps }) => {
    const topSoldConfig = {
        sales: {
            label: 'Ventas'
        }

    }
    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Artículos más vendidos</CardTitle>
            </CardHeader>
            <CardContent>
                {stats.topProducts.length > 0 ?
                    <ChartContainer className="mx-auto aspect-square max-w-[300px]" config={topSoldConfig}>
                        <BarChart accessibilityLayer data={stats.topProducts} layout="vertical" margin={{ left: 0 }}>
                            <YAxis dataKey='title' type='category' tickLine={false} tickMargin={1} axisLine={false} />
                            <XAxis dataKey='sales' type='number' hide />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Bar dataKey='sales' layout='vertical' radius={5} />
                        </BarChart>
                    </ChartContainer>
                :
                    <>
                        <p className="font-bold text-3xl">Sin datos</p>
                    </>
                }
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardStats = () => {
    const artistStats = useArtistStats()
    const [stats, setStats] = useState<ArtistStatsProps | undefined>(undefined)

    useEffect(() => {
        artistStats.getArtistStats().then(s => setStats(s))
    }, [])

    if (stats === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Estadísticas</h1>
            <ArtistDashboardStatsHeader stats={stats} />
            <div className="flex gap-4 flex-wrap">
                <ArtistDashboardStatsFormatChart stats={stats} />
                <ArtistDashboardStatsTopSoldChart stats={stats} />
            </div>
        </div>
    )
}