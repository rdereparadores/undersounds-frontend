import { IoIosTrendingUp } from "react-icons/io"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Bar, BarChart, Pie, PieChart, XAxis, YAxis } from "recharts"

export const ArtistDashboardStatsHeader = () => {
    return (
        <div className="flex gap-4 flex-wrap">
            <Card className="grow min-w-fit">
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

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Lanzamientos</CardTitle>
                    <CardDescription>Último mes</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">7</p>
                    <CardDescription className="flex gap-1">
                        vs. 2 el mes anterior
                    </CardDescription>
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
                <CardHeader className="pb-2">
                    <CardTitle>Formato más vendido</CardTitle>
                    <CardDescription>Desde el inicio</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-3xl">Digital</p>
                    <CardDescription className="flex gap-1">
                        7 de cada 10 compras
                    </CardDescription>
                </CardContent>
            </Card>

            <Card className="grow min-w-fit">
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

export const ArtistDashboardStatsFormatChart = () => {
    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Ventas por formato</CardTitle>
                <CardDescription>Último mes</CardDescription>
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

const topSoldData = [
    { item: 'Canción 1', sold: 350 },
    { item: 'Canción 2', sold: 300 },
    { item: 'Canción 3', sold: 248 },
    { item: 'Canción 4', sold: 227 },
    { item: 'Canción 5', sold: 192 }
]

const topSoldConfig = {
    sold: {
        label: 'Ventas'
    }

} satisfies ChartConfig

export const ArtistDashboardStatsTopSoldChart = () => {
    return (
        <Card className="grow">
            <CardHeader>
                <CardTitle>Artículos más vendidos</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer className="mx-auto aspect-square max-w-[300px]" config={topSoldConfig}>
                    <BarChart accessibilityLayer data={topSoldData} layout="vertical" margin={{ left: 0 }}>
                        <YAxis dataKey='item' type='category' tickLine={false} tickMargin={1} axisLine={false} />
                        <XAxis dataKey='sold' type='number' hide />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey='sold' layout='vertical' radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardStats = () => {

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Estadísticas</h1>
            <ArtistDashboardStatsHeader />
            <div className="flex gap-4 flex-wrap">
                <ArtistDashboardStatsFormatChart />
                <ArtistDashboardStatsTopSoldChart />
            </div>
        </div>
    )
}