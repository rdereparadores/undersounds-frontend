"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, ChevronUp, Download } from "lucide-react"
import { AlbumSongList } from "./album-song-list"
import type { ButtonProps } from "./button" // Import from the button file

interface Song {
    artist: string
    duration: string
    imageUrl: string
    name: string
    downloadUrl: string
}

interface Album {
    artist: string
    image: string
    name: string
    songs: Song[]
}

interface AlbumCardProps {
    album: Album
    isExpanded: boolean
    onToggleExpand: () => void
    Button: React.ComponentType<ButtonProps>
}

export function AlbumCard({ album, isExpanded, onToggleExpand, Button }: AlbumCardProps) {
    const [playingSongId, setPlayingSongId] = useState<number | null>(null)

    // Toggle play/pause (visual only)
    const togglePlay = (index: number) => {
        setPlayingSongId(playingSongId === index ? null : index)
    }

    // Simple download handler without JSZip
    const handleDownload = () => {
        console.log(`Download requested for album: ${album.name} by ${album.artist}`)
        // Here you could implement a simple download functionality or navigation
    }

    return (
        <div
            className={`relative rounded-xl overflow-hidden
            ${
                isExpanded
                    ? "bg-blue-100 shadow-lg border border-blue-300/50"
                    : "bg-white hover:bg-blue-50 border border-transparent hover:border-blue-300/30"
            }
            transform hover:scale-[1.02] hover:shadow-xl cursor-pointer`}
        >
            <div className="flex flex-col">
                {/* Album header */}
                <div className="flex items-center gap-4 p-4 bg-blue-50">
                    {/* Album cover */}
                    <div
                        className={`relative min-w-[120px] w-[120px] h-[120px] rounded-lg overflow-hidden flex-shrink-0 ${
                            isExpanded ? "shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "shadow-md"
                        }`}
                    >
                        <img
                            src={album.image || "/placeholder.svg?height=120&width=120"}
                            alt={album.name}
                            width={120}
                            height={120}
                            className={`object-cover w-full h-full ${isExpanded ? "scale-110" : ""}`}
                        />
                        {isExpanded && <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>}
                    </div>

                    {/* Album information */}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold truncate text-blue-800">{album.name}</h2>
                        <p className="text-blue-600/80 truncate">{album.artist}</p>
                        <p className="text-blue-500/70 text-sm mt-1">{album.songs.length} canciones</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-blue-600 hover:text-white hover:bg-blue-500"
                            onClick={handleDownload}
                        >
                            <Download className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-full ${
                                isExpanded
                                    ? "bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
                                    : "text-blue-600 hover:text-white hover:bg-blue-500"
                            }`}
                            onClick={onToggleExpand}
                        >
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Song list (expanded view) */}
                {isExpanded && (
                    <div className="px-4 pb-4">
                        <div className="mt-2 border-t border-blue-200/50 pt-4">
                            <AlbumSongList
                                songs={album.songs}
                                playingSongId={playingSongId}
                                onTogglePlay={togglePlay}
                                Button={Button}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

