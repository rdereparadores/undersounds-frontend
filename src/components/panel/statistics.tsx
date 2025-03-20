"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { browser: "top1", visitors: 27, fill: "var(--color-top1)" },
    { browser: "top2", visitors: 20, fill: "var(--color-top2)" },
    { browser: "top3", visitors: 18, fill: "var(--color-top3)" },
    { browser: "top4", visitors: 17, fill: "var(--color-top4)" },
    { browser: "top5", visitors: 9, fill: "var(--color-top5)" },
]

const chartConfig = {
    visitors: {
        label: "Compras",
    },
    top1: {
        label: "Olivia Rodrigo",
        color: "gray",
    },
    top2: {
        label: "Dua Lipa",
        color: "gray",
    },
    top3: {
        label: "Bad Bunny",
        color: "gray",
    },
    top4: {
        label: "Drake",
        color: "gray",
    },
    top5: {
        label: "Harry Styles",
        color: "gray",
    },
} satisfies ChartConfig

export function Component() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Artistas favoritos</CardTitle>
                <CardDescription>Ártículos comprados a tus artistas favoritos</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        barSize={80}
                        barGap={0}
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="browser"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <XAxis dataKey="visitors" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="visitors" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Compras realizadas en total
                </div>
                <div className="leading-none text-muted-foreground">
                    Haz realizado un total de {/*Variabel*/} 58 compras
                </div>
            </CardFooter>
        </Card>
    )
}

export default Component;