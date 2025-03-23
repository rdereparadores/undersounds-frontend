"use client"

import React, { useState } from "react"
import { Play, Pause, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SongCardProps {
    songName: string
    artistName: string
    imageUrl: string
    onTogglePlay: () => void
    isPlaying: boolean
    handleDownload: () => void
}

const SongCard: React.FC<SongCardProps> = ({
                                               songName,
                                               artistName,
                                               imageUrl,
                                               onTogglePlay,
                                               isPlaying,
                                               handleDownload,
                                           }) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative group w-full sm:w-64 aspect-[4/5] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={imageUrl || "/placeholder.svg"}
                alt={`Cover art for ${songName}`}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-2 sm:p-4 text-white">
                <h3 className="text-base sm:text-lg font-semibold">{songName}</h3>
                <p className="text-xs sm:text-sm">{artistName}</p>
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
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
    )
}

export default SongCard
