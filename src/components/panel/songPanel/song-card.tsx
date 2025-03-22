"use client"

import type React from "react"

import { useState } from "react"
import { Play, Pause, Download } from "lucide-react"

interface Song {
    artist: string
    duration: string
    imageUrl: string
    name: string
    downloadUrl: string
}

interface ButtonProps {
    variant: 'default' | 'outline' | string;
    size: 'icon' | string;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface SongCardProps {
    song: Song
    isPlaying: boolean
    onTogglePlay: () => void
    Button: React.ComponentType<ButtonProps>;
}

export function SongCard({ song, isPlaying, onTogglePlay, Button }: SongCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Generar barras para la onda de sonido
    const generateSoundWaveBars = () => {
        const bars = []
        const barCount = 30

        for (let i = 0; i < barCount; i++) {
            // Altura aleatoria para cada barra cuando está reproduciéndose
            const height = isPlaying ? Math.random() * 100 : 30 // Altura fija cuando está pausado (línea recta)

            bars.push(
                <div
                    key={i}
                    className={`w-1 rounded-full ${isPlaying ? "bg-blue-400" : "bg-blue-300/60"}`}
                    style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.02}s`,
                        animation: isPlaying ? "fastSoundWave 0.4s linear infinite alternate" : "none",
                    }}
                />,
            )
        }

        return bars
    }

    const handleDownload = () => {
        // Simulación de descarga (sin funcionalidad real)
        console.log(`Descarga simulada: ${song.artist} - ${song.name}`)
    }

    return (
        <div
            className={`relative rounded-xl overflow-hidden transition-all duration-300 
        ${
                isPlaying
                    ? "bg-blue-100 shadow-lg border border-blue-300/50"
                    : "bg-white hover:bg-blue-50 border border-transparent hover:border-blue-300/30"
            }
        transform hover:scale-[1.02] hover:shadow-xl cursor-pointer
      `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
        >
            <div className="p-4 bg-blue-50">
                <div className="flex items-center gap-4">
                    {/* Album art with glow effect when playing */}
                    <div
                        className={`relative min-w-[80px] w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0 ${
                            isPlaying ? "shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "shadow-md"
                        }`}
                    >
                        <img
                            src={song.imageUrl || "/placeholder.svg?height=80&width=80"}
                            alt={song.name}
                            width={80}
                            height={80}
                            className={`object-cover w-full h-full transition-transform duration-700 ${isPlaying ? "scale-110" : ""}`}
                        />
                        {isPlaying && <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>}
                    </div>

                    {/* Song information */}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold truncate text-blue-800">{song.name}</h2>
                        <p className="text-blue-600/80 truncate">{song.artist}</p>

                        {/* Sound wave visualization */}
                        <div className="mt-3 space-y-1.5">
                            <div className="h-8 flex items-center">
                                <div className="w-full h-full flex items-center justify-between gap-0.5">{generateSoundWaveBars()}</div>
                            </div>

                            <div className="flex justify-between text-xs text-blue-500/70">
                                <span>{isPlaying ? "Reproduciendo" : ""}</span>
                                <span>{song.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Play/Pause button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-full ${
                                isPlaying
                                    ? "bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
                                    : "text-blue-600 hover:text-white hover:bg-blue-500"
                            }`}
                            onClick={onTogglePlay}
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>

                        {/* Download button - only show on hover */}
                        {isHovered && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-blue-600 hover:text-white hover:bg-blue-500"
                                onClick={handleDownload}
                            >
                                <Download className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Animated equalizer when playing */}
            {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-center items-end gap-0.5 px-4 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-blue-400 rounded-t-sm animate-fast-equalizer"
                            style={{
                                height: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.05}s`,
                                animationDuration: `0.3s`,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

