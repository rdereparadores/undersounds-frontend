"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AlbumCard } from "./album-card"
import { AlbumPagination } from "./album-pagination"
import { Search } from "lucide-react"
import { Button } from "./button" // Import the Button component

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

// Input component
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    )
}

// Sample album data
const sampleAlbums: Album[] = [
    {
        artist: "Artista 1",
        name: "Álbum de Ejemplo 1",
        image: "/placeholder.svg?height=120&width=120",
        songs: [
            {
                artist: "Artista 1",
                name: "Canción 1",
                duration: "3:45",
                imageUrl: "/placeholder.svg?height=50&width=50",
                downloadUrl: "#",
            },
            {
                artist: "Artista 1",
                name: "Canción 2",
                duration: "4:20",
                imageUrl: "/placeholder.svg?height=50&width=50",
                downloadUrl: "#",
            },
        ],
    },
    {
        artist: "Artista 2",
        name: "Álbum de Ejemplo 2",
        image: "/placeholder.svg?height=120&width=120",
        songs: [
            {
                artist: "Artista 2",
                name: "Canción 1",
                duration: "3:15",
                imageUrl: "/placeholder.svg?height=50&width=50",
                downloadUrl: "#",
            },
            {
                artist: "Artista 2",
                name: "Canción 2",
                duration: "2:55",
                imageUrl: "/placeholder.svg?height=50&width=50",
                downloadUrl: "#",
            },
        ],
    },
    {
        artist: "Artista 3",
        name: "Álbum de Ejemplo 3",
        image: "/placeholder.svg?height=120&width=120",
        songs: [
            {
                artist: "Artista 3",
                name: "Canción 1",
                duration: "4:10",
                imageUrl: "/placeholder.svg?height=50&width=50",
                downloadUrl: "#",
            },
            {
                artist: "Artista 3",
                name: "Canción 2",
                duration: "3:30",
                imageUrl: "/placeholder.svg?height=50&width=50",
                downloadUrl: "#",
            },
        ],
    },
]

export default function AlbumPlayer({ albums = sampleAlbums }: { albums?: Album[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [expandedAlbumId, setExpandedAlbumId] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(albums)
    const itemsPerPage = 3

    // Filter albums based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredAlbums(albums)
        } else {
            const filtered = albums.filter(
                (album) =>
                    album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    album.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    album.songs.some(
                        (song) =>
                            song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
                    ),
            )
            setFilteredAlbums(filtered)
        }
        setCurrentPage(1)
    }, [searchTerm, albums])

    // Calculate items to show on current page
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = Array.isArray(filteredAlbums) ? filteredAlbums.slice(indexOfFirstItem, indexOfLastItem) : []

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        setExpandedAlbumId(null) // Collapse all albums when changing page
    }

    // Toggle album expansion
    const toggleAlbumExpansion = (index: number) => {
        setExpandedAlbumId(expandedAlbumId === index ? null : index)
    }

    return (
        <div className="w-full mx-auto">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-200">
                <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <h1 className="text-4xl font-bold text-blue-800 tracking-tight">
                            Mis{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">Álbumes</span>
                        </h1>

                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70" />
                            <Input
                                placeholder="Buscar álbumes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-blue-50 border-blue-200 text-blue-800 placeholder:text-blue-400 focus-visible:ring-blue-300 w-full"
                            />
                        </div>
                    </div>

                    {/* Album list */}
                    <div className="space-y-6 w-full flex flex-col">
                        {currentItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-blue-800/80">
                                <p className="text-xl font-medium">No se encontraron álbumes</p>
                                <p className="text-sm opacity-70">Intenta con otra búsqueda</p>
                            </div>
                        ) : (
                            currentItems.map((album, index) => (
                                <AlbumCard
                                    key={index}
                                    album={album}
                                    isExpanded={expandedAlbumId === indexOfFirstItem + index}
                                    onToggleExpand={() => toggleAlbumExpansion(indexOfFirstItem + index)}
                                    Button={Button}
                                />
                            ))
                        )}
                    </div>

                    {/* Pagination component */}
                    {filteredAlbums.length > itemsPerPage && (
                        <AlbumPagination
                            albums={filteredAlbums}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            Button={Button}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

