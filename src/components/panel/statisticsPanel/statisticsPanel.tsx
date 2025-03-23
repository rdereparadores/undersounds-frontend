"use client"

import { type JSX, useState, type ComponentType, type ReactNode } from "react"
import { Bar, BarChart, XAxis, YAxis, type TooltipProps } from "recharts"
import { Clock, Music2, ShoppingBag, TrendingUp, BarChart3 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { statisticsData } from "./statisticsData.tsx"

type ChartItem = {
    name: string
    value: number
    color: string
}

type ChartValueConfig = {
    label?: ReactNode
    icon?: ComponentType
} & (
    | {
    color?: string
    theme?: undefined
}
    | {
    color?: undefined
    theme: Record<"light" | "dark", string>
}
    )

type ChartConfig = Record<string, ChartValueConfig>

type DataType = {
    period: string
    trend: string
    total: number
    title: string
    description: string
    chartData: ChartItem[]
    chartConfig?: ChartConfig
}

type TabType = "purchases" | "playTime" | "artists"

type StatisticsContentProps = {
    data: DataType
    type: TabType
}

export default function StatisticsDashboard() {
    const [activeTab, setActiveTab] = useState<TabType>("purchases")

    const getActiveData = (): DataType => {
        switch (activeTab) {
            case "purchases":
                return statisticsData.purchases
            case "playTime":
                return statisticsData.playTime
            case "artists":
                return statisticsData.artists
            default:
                return statisticsData.purchases
        }
    }

    const activeData = getActiveData()

    return (
        <Card className="w-full overflow-hidden border-border/10 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-blue-900/10 dark:bg-blue-950">
            <CardHeader className="pb-0 bg-blue-500/5 dark:bg-blue-800/10 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <CardTitle className="text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
                                Mis Estadísticas
                            </CardTitle>
                        </div>
                        <CardDescription className="text-blue-600/70 dark:text-blue-400/70 mt-1">
                            Resumen de tu actividad musical
                        </CardDescription>
                    </div>
                    <Badge
                        variant="outline"
                        className="px-3 py-1.5 bg-blue-500 text-white border-blue-400 fade-in-0 duration-700 hover:bg-blue-600"
                    >
                        {activeData.period}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <Tabs
                    defaultValue="purchases"
                    value={activeTab}
                    onValueChange={(value: string) => setActiveTab(value as TabType)}
                    className="w-full"
                >
                    <TabsList className="grid grid-cols-3 mb-6 bg-blue-100/50 dark:bg-blue-900/30 p-1">
                        <TabsTrigger
                            value="purchases"
                            className="flex items-center gap-2 hover:bg-blue-200/50 dark:hover:bg-blue-800/50 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            <span className="hidden sm:inline">Compras</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="playTime"
                            className="flex items-center gap-2 hover:bg-blue-200/50 dark:hover:bg-blue-800/50 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            <Clock className="h-4 w-4" />
                            <span className="hidden sm:inline">Reproducciones</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="artists"
                            className="flex items-center gap-2 hover:bg-blue-200/50 dark:hover:bg-blue-800/50 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                        >
                            <Music2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Artistas</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="purchases" className="mt-0">
                        <StatisticsContent data={statisticsData.purchases} type="purchases" />
                    </TabsContent>
                    <TabsContent value="playTime" className="mt-0">
                        <StatisticsContent data={statisticsData.playTime} type="playTime" />
                    </TabsContent>
                    <TabsContent value="artists" className="mt-0">
                        <StatisticsContent data={statisticsData.artists} type="artists" />
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="bg-blue-100/30 dark:bg-blue-800/20 border-t border-blue-200/50 dark:border-blue-700/30 px-6 py-4 fade-in-50 duration-1000 delay-500">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{activeData.trend}</span>
                    </div>
                    <span className="text-sm text-blue-600/70 dark:text-blue-400/70">
            {activeTab === "purchases"
                ? `Total de compras: ${activeData.total}`
                : activeTab === "playTime"
                    ? `Total de minutos: ${activeData.total}`
                    : `Total de artistas: ${activeData.total}`}
          </span>
                </div>
            </CardFooter>
        </Card>
    )
}

function StatisticsContent({ data, type }: StatisticsContentProps) {
    const makeBold = (text: string) => {
        const boldItems = ["CD cancion", "CD album", "Pop", "Rock", "Luna Nova"]
        for (const item of boldItems) {
            if (text.includes(item)) {
                const regex = new RegExp(item, "g")
                text = text.replace(regex, `<strong>${item}</strong>`)
            }
        }
        if (text.includes("<strong>")) {
            return <span dangerouslySetInnerHTML={{ __html: text }} />
        }
        return text
    }

    // Actualizar los colores para usar tonos de azul
    const formattedChartData = data.chartData.map((item: ChartItem, index: number) => {
        // Generar una paleta de azules
        const blueColors = [
            "#2563eb", // blue-600
            "#3b82f6", // blue-500
            "#60a5fa", // blue-400
            "#93c5fd", // blue-300
            "#bfdbfe", // blue-200
            "#1d4ed8", // blue-700
            "#1e40af", // blue-800
            "#0284c7", // sky-600
            "#0ea5e9", // sky-500
            "#38bdf8", // sky-400
        ]

        return {
            name: item.name,
            value: item.value,
            fill: blueColors[index % blueColors.length],
            originalName: item.name,
        }
    })

    const renderCustomTooltip = ({ active, payload }: TooltipProps<number, string>): JSX.Element | null => {
        if (!active || !payload || !payload.length) return null
        const { name, value, fill } = payload[0].payload

        return (
            <div className="bg-white/95 dark:bg-blue-950/95 backdrop-blur-sm border border-blue-200 dark:border-blue-700/50 shadow-lg p-3 rounded-lg text-xs">
                <p className="font-medium text-blue-800 dark:text-blue-200 mb-1 text-xs">{makeBold(name)}</p>

                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: fill }} />
                        <span className="text-blue-700 dark:text-blue-300">
              <span className="font-medium">{value}</span>{" "}
                            {type === "purchases" ? "compras" : type === "playTime" ? "minutos" : "reproducciones"}
            </span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">{data.title}</h3>
                <p className="text-sm text-blue-600/70 dark:text-blue-400/70">{makeBold(data.description)}</p>
            </div>

            <div className="h-[300px] mt-4 duration-1000 delay-300">
                <ChartContainer config={data.chartConfig || {}} className="h-full">
                    <BarChart
                        width={533}
                        height={300}
                        data={formattedChartData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={120}
                            axisLine={false}
                            tickLine={false}
                            tick={({ x, y, payload }: { x: number; y: number; payload: { value: string } }) => {
                                const index = formattedChartData.findIndex((item) => item.name === payload.value)
                                const shouldBeBold = ["CD cancion", "CD album", "Pop", "Rock", "Luna Nova"].some((item) =>
                                    payload.value.includes(item),
                                )

                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        dy={4}
                                        textAnchor="end"
                                        fill="currentColor"
                                        fontSize={12}
                                        fontWeight={shouldBeBold || index < 3 ? "bold" : "normal"}
                                        className={cn(
                                            "fill-blue-700 dark:fill-blue-300",
                                            index === 0 && "fill-blue-600 dark:fill-blue-400 font-medium",
                                        )}
                                    >
                                        {payload.value}
                                    </text>
                                )
                            }}
                        />
                        <ChartTooltip cursor={{ fill: "rgba(37, 99, 235, 0.1)" }} content={renderCustomTooltip} />
                        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24} className="cursor-pointer" />
                    </BarChart>
                </ChartContainer>
            </div>
        </div>
    )
}

