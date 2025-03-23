"use client"

import type React from "react"

import { useState } from "react"
import { motion, LayoutGroup } from "framer-motion"
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { BarChart3, Music2, Play, Album } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Tipos para los datos
type SongData = {
  songId: number
  songName: string
  revenue: number
  image?: string
}

type AlbumData = {
  albumId: number
  albumName: string
  revenue: number
  image?: string
}

type PlaybackData = {
  songId: number
  songName: string
  plays: number
  image?: string
}

// Props para el componente principal
type ArtistStatisticsPanelProps = {
  songChartData: SongData[]
  albumChartData: AlbumData[]
  playbackChartData: PlaybackData[]
  period?: string
  trend?: string
  totalIncome?: number
}

// Componentes de gráficos
function SongChart({ data }: { data: SongData[] }) {
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0)

  return (
    <Card className="w-full h-full overflow-hidden border-blue-200/50 dark:border-blue-700/30 shadow-md bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-blue-900/10">
      <CardHeader className="bg-blue-500/5 dark:bg-blue-800/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Music2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
            Ingresos por Canciones
          </CardTitle>
        </div>
        <CardDescription className="text-blue-600/70 dark:text-blue-400/70">
          Ingresos mensuales por cada canción
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="h-[250px] mt-2 animate-in fade-in-50 duration-1000">
          <style>{`
            .recharts-bar-rectangle path {
              transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s ease;
              transform-origin: left center;
            }

            .recharts-bar-rectangle:hover path {
              transform: scaleX(1.05);
              filter: drop-shadow(0 8px 16px rgb(37 99 235 / 0.2)) brightness(1.1);
            }
            
            .dark .recharts-bar-rectangle:hover path {
              filter: drop-shadow(0 8px 16px rgb(37 99 235 / 0.4)) brightness(1.2);
            }
          `}</style>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 80 }}>
              <Bar dataKey="revenue" fill="#2563eb" radius={[0, 6, 6, 0]} barSize={30} className="cursor-pointer" />
              <XAxis dataKey="revenue" type="number" hide />
              <YAxis
                dataKey="songName"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={({ x, y, payload }) => {
                  const index = data.findIndex((item) => item.songName === payload.value)
                  return (
                    <text
                      x={x}
                      y={y}
                      dy={4}
                      textAnchor="end"
                      fill="currentColor"
                      fontSize={14}
                      fontWeight={index < 2 ? "bold" : "normal"}
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
              <Tooltip
                cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null
                  const { songName, revenue } = payload[0].payload

                  return (
                    <div className="bg-white/95 dark:bg-blue-950/95 backdrop-blur-sm border border-blue-200 dark:border-blue-700/50 shadow-lg p-3 rounded-lg text-xs">
                      <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">{songName}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <span className="text-blue-700 dark:text-blue-300">
                          <span className="font-medium">${revenue}</span> ingresos
                        </span>
                      </div>
                    </div>
                  )
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="bg-blue-100/30 dark:bg-blue-800/20 border-t border-blue-200/50 dark:border-blue-700/30 px-6 py-4 min-h-[50px]">
        <div className="text-sm font-medium text-blue-700 dark:text-blue-300 whitespace-normal">
          Total ingresos: ${totalRevenue.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  )
}

function AlbumChart({ data }: { data: AlbumData[] }) {
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0)

  return (
    <Card className="w-full h-full overflow-hidden border-blue-200/50 dark:border-blue-700/30 shadow-md bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-blue-900/10">
      <CardHeader className="bg-blue-500/5 dark:bg-blue-800/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Album className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
            Ingresos por Álbumes
          </CardTitle>
        </div>
        <CardDescription className="text-blue-600/70 dark:text-blue-400/70">
          Ingresos mensuales por álbum
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="space-y-4 mt-2 animate-in fade-in-50 duration-1000">
          {data.map((album) => (
            <div
              key={album.albumId}
              className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-blue-100/50 dark:hover:bg-blue-800/20"
            >
              <img
                src={album.image || "/placeholder.svg"}
                alt={album.albumName}
                width={50}
                height={50}
                className="rounded-md object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-medium text-blue-700 dark:text-blue-300">{album.albumName}</span>
                <span className="text-sm text-blue-600/70 dark:text-blue-400/70">${album.revenue}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-blue-100/30 dark:bg-blue-800/20 border-t border-blue-200/50 dark:border-blue-700/30 px-6 py-4 min-h-[50px]">
        <div className="text-sm font-medium text-blue-700 dark:text-blue-300 whitespace-normal">
          Total ingresos por álbum: ${totalRevenue.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  )
}

function PlaybackChart({ data }: { data: PlaybackData[] }) {
  const totalPlays = data.reduce((acc, curr) => acc + curr.plays, 0)

  return (
    <Card className="w-full h-full overflow-hidden border-blue-200/50 dark:border-blue-700/30 shadow-md bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-blue-900/10">
      <CardHeader className="bg-blue-500/5 dark:bg-blue-800/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Play className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
            Reproducciones
          </CardTitle>
        </div>
        <CardDescription className="text-blue-600/70 dark:text-blue-400/70">Reproducciones mensuales</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-1">
        <div className="space-y-4 mt-2 animate-in fade-in-50 duration-1000">
          {data.map((item) => (
            <div
              key={item.songId}
              className="flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-blue-100/50 dark:hover:bg-blue-800/20"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.songName}
                width={50}
                height={50}
                className="rounded-md object-cover shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-medium text-blue-700 dark:text-blue-300">{item.songName}</span>
                <span className="text-sm text-blue-600/70 dark:text-blue-400/70">
                  {item.plays.toLocaleString()} reproducciones
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-blue-100/30 dark:bg-blue-800/20 border-t border-blue-200/50 dark:border-blue-700/30 px-6 py-4 min-h-[50px]">
        <div className="text-sm font-medium text-blue-700 dark:text-blue-300 whitespace-normal">
          Total reproducciones: {totalPlays.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  )
}

// Actualizar el mapeo de componentes para pasar los datos
const getChartMapping = (songData: SongData[], albumData: AlbumData[], playbackData: PlaybackData[]) => ({
  songs: <SongChart data={songData} />,
  albums: <AlbumChart data={albumData} />,
  playback: <PlaybackChart data={playbackData} />,
})

export default function ArtistStatisticsPanel({
  songChartData,
  albumChartData,
  playbackChartData,
  period = "Último mes",
  trend = "↑ 15% más ingresos que el mes anterior",
  totalIncome = 5950,
}: ArtistStatisticsPanelProps) {
  // Estado para el orden de los gráficos
  const [chartOrder, setChartOrder] = useState<string[]>(["songs", "albums", "playback"])

  // Función para manejar el clic en un gráfico
  const handleChartClick = (id: string) => {
    if (chartOrder[0] === id) return // Si ya es el principal, no hacer nada
    setChartOrder((prevOrder) => {
      const newOrder = [...prevOrder]
      const index = newOrder.indexOf(id)
      // Intercambiar posiciones
      ;[newOrder[0], newOrder[index]] = [newOrder[index], newOrder[0]]
      return newOrder
    })
  }

  const chartMapping = getChartMapping(songChartData, albumChartData, playbackChartData)

  return (
    <Card className="w-full overflow-hidden border-border/10 shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/30 dark:to-blue-900/10 dark:bg-blue-950 animate-in fade-in-50 duration-700 slide-in-from-bottom-5">
      <CardHeader className="pb-0 bg-blue-500/5 dark:bg-blue-800/10 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-300">
                Estadísticas del Artista
              </CardTitle>
            </div>
            <CardDescription className="text-blue-600/70 dark:text-blue-400/70 mt-1">
              Resumen de ingresos y reproducciones
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="px-3 py-1.5 bg-blue-500 text-white border-blue-400 animate-in fade-in-0 duration-700 hover:bg-blue-600 transition-colors self-start sm:self-auto"
          >
            {period}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <LayoutGroup>
          <div
            className="grid gap-6"
            style={{
              gridTemplateRows: "420px 400px",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            {chartOrder.map((id, index) => {
              let styleProps: React.CSSProperties = {
                cursor: "pointer",
              }

              if (index === 0) {
                // Gráfico principal
                styleProps = {
                  ...styleProps,
                  gridColumn: "1 / span 2",
                  gridRow: "1",
                }
              } else if (index === 1) {
                styleProps = {
                  ...styleProps,
                  gridColumn: "1",
                  gridRow: "2",
                }
              } else if (index === 2) {
                styleProps = {
                  ...styleProps,
                  gridColumn: "2",
                  gridRow: "2",
                }
              }

              return (
                <motion.div
                  key={id}
                  layout
                  layoutId={id}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => handleChartClick(id)}
                  style={styleProps}
                  className="hover:ring-2 hover:ring-blue-300 dark:hover:ring-blue-700 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-blue-950 rounded-lg transition-all"
                >
                  {chartMapping[id as keyof typeof chartMapping]}
                </motion.div>
              )
            })}
          </div>
        </LayoutGroup>
      </CardContent>
      <CardFooter className="bg-blue-100/30 dark:bg-blue-800/20 border-t border-blue-200/50 dark:border-blue-700/30 px-6 py-4 animate-in fade-in-50 duration-1000 delay-500">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Music2 className="h-4 w-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300 whitespace-normal">{trend}</span>
          </div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300 whitespace-normal">
            Total de ingresos: ${totalIncome.toLocaleString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

