"use client"

import type React from "react"
import { useState } from "react"
import { Play, Pause, Download } from "lucide-react"
import type { ButtonProps } from "./button" // Import from the button file

interface Song {
    artist: string
    duration: string
    imageUrl: string
    name: string
    downloadUrl: string
}

interface AlbumSongListProps {
    songs: Song[]
    playingSongId: number | null
    onTogglePlay: (index: number) => void
    Button: React.ComponentType<ButtonProps>
}

export function AlbumSongList({ songs, playingSongId, onTogglePlay, Button }: AlbumSongListProps) {
    const [hoveredSongId, setHoveredSongId] = useState<number | null>(null)

    // Genera las barras para la visualización de la onda de sonido
    const generateSoundWaveBars = (index: number) => {
        const bars = []
        const barCount = 20
        const isPlaying = playingSongId === index

        for (let i = 0; i < barCount; i++) {
            // Altura aleatoria para cada barra al reproducirse; altura fija si está pausado
            const height = isPlaying ? Math.random() * 100 : 30

            bars.push(
                <div
                    key={i}
                    className={`w-1 rounded-full ${isPlaying ? "bg-blue-400" : "bg-blue-300/60"}`}
                    style={{ height: `${height}%` }}
                />
            )
        }

        return bars
    }

    const handleDownload = (song: Song) => {
        console.log(`Descarga simulada: ${song.artist} - ${song.name}`)
    }

    return (
        <div className="space-y-3">
            {songs.map((song, index) => (
                <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden transition-transform duration-200 p-3
            ${playingSongId === index
                        ? "bg-blue-100 shadow-lg border border-blue-300/50"
                        : "bg-white hover:bg-blue-50 border border-transparent hover:border-blue-300/30"
                    }
            hover:scale-[1.01] hover:shadow-lg cursor-pointer`}
                    onMouseEnter={() => setHoveredSongId(index)}
                    onMouseLeave={() => setHoveredSongId(null)}
                >
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        {/* Miniatura de la canción */}
                        <div
                            className={`relative flex-shrink-0 rounded-lg overflow-hidden
                w-12 h-12 sm:w-[50px] sm:h-[50px]
                ${playingSongId === index ? "shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "shadow-md"}
              `}
                        >
                            <img
                                src={song.imageUrl || "/placeholder.svg?height=50&width=50"}
                                alt={song.name}
                                className={`w-full h-full object-cover transition-transform duration-200 ${playingSongId === index ? "scale-110" : ""}`}
                            />
                            {playingSongId === index && (
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>
                            )}
                        </div>

                        {/* Información de la canción */}
                        <div className="flex-1 min-w-0">
                            <p className="text-blue-800 font-medium truncate text-sm sm:text-base">{song.name}</p>
                            <p className="text-xs text-blue-600/80 truncate">{song.artist}</p>

                            {/* Visualización de la onda de sonido */}
                            <div className="mt-2 h-4 sm:h-5 flex items-center">
                                <div className="w-full h-full flex items-center justify-between gap-0.5">
                                    {generateSoundWaveBars(index)}
                                </div>
                            </div>

                            <div className="flex justify-between text-[10px] sm:text-xs text-blue-500/70 mt-1">
                                <span>{playingSongId === index ? "Reproduciendo" : ""}</span>
                                <span>{song.duration}</span>
                            </div>
                        </div>

                        {/* Controles */}
                        <div className="flex items-center gap-2">
                            {/* Botón de play/pausa */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`rounded-full h-8 w-8 transition-colors duration-200 ${
                                    playingSongId === index
                                        ? "bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
                                        : "text-blue-600 hover:text-white hover:bg-blue-500"
                                }`}
                                onClick={() => onTogglePlay(index)}
                            >
                                {playingSongId === index ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>

                            {/* Botón de descarga, visible solo al hacer hover */}
                            {hoveredSongId === index && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-8 w-8 transition-colors duration-200 text-blue-600 hover:text-white hover:bg-blue-500"
                                    onClick={() => handleDownload(song)}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
