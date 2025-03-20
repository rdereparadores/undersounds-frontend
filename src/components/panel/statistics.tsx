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

interface StatisticsProps {
    chartData: { browser: string; visitors: number; fill: string }[];
    chartConfig: ChartConfig;
    totalPurchases: number;
    userType: 'usuario' | 'artista';
}

export function Statistics({
                               chartData,
                               chartConfig,
                               totalPurchases,
                               userType,
                           }: StatisticsProps) {
    return (
        <Card className="p-5">
            <CardHeader>
                <CardTitle>Top Artistas favoritos</CardTitle>
                <CardDescription>Ártículos comprados a tus artistas favoritos</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        barSize={90}
                        barGap={0}
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 4,
                        }}
                    >
                        <YAxis
                            dataKey="browser"
                            type="category"
                            tickLine={false}
                            tickMargin={0}
                            axisLine={false}
                            tickFormatter={(value) => {
                                const label = chartConfig[value as keyof typeof chartConfig]?.label;
                                return typeof label === "string" ? label : String(value);
                            }}
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
            {userType === 'usuario' ? (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Compras realizadas en total
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Haz realizado un total de {totalPurchases} compras
                    </div>
                </CardFooter>
            ) : (
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Ventas realizadas en total
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Haz realizado un total de {totalPurchases} ventas
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

export default Statistics;
