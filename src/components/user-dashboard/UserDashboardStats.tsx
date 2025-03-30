import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { IoIosTrendingUp } from "react-icons/io"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"

export const UserDashboardStatsHeader = () => {
    return (
        <div className="flex gap-4 flex-wrap">
            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Tiempo de escucha</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">25928<span className="font-normal text-lg"> minutos</span></p>
                    <CardDescription className="flex gap-1">
                        <IoIosTrendingUp className="mt-1" /> 25% más que el mes anterior
                    </CardDescription>
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Formato preferido</CardTitle>
                    <CardDescription>Desde el inicio</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">Digital</p>
                    <CardDescription className="flex gap-1">
                        4 de cada 10 compras
                    </CardDescription>
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Género preferido</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">Rock</p>
                    <CardDescription className="flex gap-1">
                        vs. Pop el mes anterior
                    </CardDescription>
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Artista más escuchado</CardTitle>
                    <CardDescription>¿Tu nuevo crush musical?</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">Quevedo</p>
                    <CardDescription className="flex gap-1">
                        37% del tiempo de escucha
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}

const formatData = [
    { format: 'digital', quantity: 20, fill: 'var(--color-digital)' },
    { format: 'cd', quantity: 10, fill: 'var(--color-cd)' },
    { format: 'vinyl', quantity: 5, fill: 'var(--color-vinyl)' },
    { format: 'cassette', quantity: 2, fill: 'var(--color-cassette)' }
]

const formatConfig = {
    quantity: {
        label: "Artículos"
    },
    digital: {
        label: "Digital",
        color: "hsl(var(--chart-1))"
    },
    cd: {
        label: "CD",
        color: "hsl(var(--chart-2))"
    },
    vinyl: {
        label: "Vinilo",
        color: "hsl(var(--chart-3))"
    },
    cassette: {
        label: "Cassette",
        color: "hsl(var(--chart-4))"
    }
} satisfies ChartConfig

export const UserDashboardStatsFormatChart = () => {

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
                <ChartContainer className="mx-auto aspect-square max-h-[250px]" config={formatConfig}>
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={formatData} dataKey='quantity' nameKey='format' innerRadius={60} strokeWidth={5} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

const topArtistsData = [
    { artist: 'Quevedo', plays: 350 },
    { artist: 'Matysito flow bakan0', plays: 300 },
    { artist: 'Faraón Love Shady', plays: 248 },
    { artist: 'Don pollo', plays: 227 },
    { artist: 'Montoya', plays: 192 }
]

const topArtistsConfig = {
    plays: {
        label: 'Reproducciones'
    }

} satisfies ChartConfig

export const UserDashboardStatsTopArtistsChart = () => {
    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Artistas más escuchados</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer className="mx-auto aspect-square max-w-[300px]" config={topArtistsConfig}>
                    <BarChart accessibilityLayer data={topArtistsData} layout="vertical" margin={{ left: 0 }}>
                        <YAxis dataKey='artist' type='category' tickLine={false} tickMargin={1} axisLine={false} />
                        <XAxis dataKey='plays' type='number' hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey='plays' layout='vertical' radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export const UserDashboardStatsTopArtistCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Insignia de artista</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 flex-wrap">
                    <img src='https://picsum.photos/200' className="w-16 h-16 rounded-full" />
                    <div className="flex flex-col justify-center flex-wrap">
                        <p className="font-medium text-xl">Quevedo</p>
                        <p>Estás en el top 0.1% de oyentes</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export const UserDashboardStats = () => {
    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Estadísticas</h1>
            <UserDashboardStatsHeader />
            <div className="flex gap-4 flex-wrap">
                <div className="flex flex-col gap-4 flex-wrap">
                    <UserDashboardStatsTopArtistCard />
                    <UserDashboardStatsFormatChart />
                </div>
                <UserDashboardStatsTopArtistsChart />
            </div>
        </div>
    )
}