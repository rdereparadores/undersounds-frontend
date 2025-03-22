export const statisticsData = {
    purchases: {
        title: "Tus compras recientes",
        description: "Número de compras por formato en los últimos 3 meses",
        chartData: [
            { name: "CD Álbum", value: 12, color: "hsl(var(--chart-1))" },
            { name: "CD Canción", value: 8, color: "hsl(var(--chart-2))" },
            { name: "Vinilo Álbum", value: 5, color: "hsl(var(--chart-3))" },
            { name: "Vinilo Canción", value: 3, color: "hsl(var(--chart-4))" },
        ],
        chartConfig: {
            value: {
                label: "Cantidad",
                color: "hsl(var(--chart-1))",
            },
        },
        total: 28,
        period: "Últimos 3 meses",
        trend: "↑ 15% más compras que el trimestre anterior",
    },
    playTime: {
        title: "Tiempo de reproducción",
        description: "Minutos de música reproducidos por género musical",
        chartData: [
            { name: "Pop", value: 1250, color: "hsl(var(--chart-2))" },
            { name: "Rock", value: 980, color: "hsl(var(--chart-3))" },
            { name: "Electrónica", value: 850, color: "hsl(var(--chart-4))" },
            { name: "Jazz", value: 620, color: "hsl(var(--chart-5))" },
            { name: "Clásica", value: 480, color: "hsl(var(--chart-6))" },
            { name: "Hip Hop", value: 350, color: "hsl(var(--chart-7))" },
        ],
        chartConfig: {
            value: {
                label: "Minutos",
                color: "hsl(var(--chart-2))",
            },
        },
        total: 4530,
        period: "Este mes",
        trend: "↑ 8% más tiempo que el mes pasado",
    },
    artists: {
        title: "Artistas más escuchados",
        description: "Artistas que has escuchado con más frecuencia",
        chartData: [
            { name: "Luna Nova", value: 87, color: "hsl(var(--chart-3))" },
            { name: "Ecos del Mar", value: 72, color: "hsl(var(--chart-4))" },
            { name: "Cristal Sonoro", value: 65, color: "hsl(var(--chart-5))" },
            { name: "Viento Nocturno", value: 58, color: "hsl(var(--chart-6))" },
            { name: "Alma de Fuego", value: 45, color: "hsl(var(--chart-7))" },
            { name: "Melodía Eterna", value: 39, color: "hsl(var(--chart-8))" },
        ],
        chartConfig: {
            value: {
                label: "Reproducciones",
                color: "hsl(var(--chart-3))",
            },
        },
        total: 366,
        period: "Últimas 4 semanas",
        trend: "↑ 12% más que el periodo anterior",
    },
}

