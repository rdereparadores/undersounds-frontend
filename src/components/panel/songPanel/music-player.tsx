import type React from "react"
import { useState, useEffect } from "react"
import { SongPagination } from "./song-pagination"
import { SongCard } from "./song-card"
import { sampleSongs } from "./sample-songs"
import { Search } from "lucide-react"

interface Song {
    artist: string
    duration: string
    imageUrl: string
    name: string
    downloadUrl: string
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

export default function MusicPlayer({ songs = sampleSongs }: { songs?: Song[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [playingSongId, setPlayingSongId] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredSongs, setFilteredSongs] = useState<Song[]>(songs)
    const itemsPerPage = 4

    // Filter songs based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredSongs(songs)
        } else {
            const filtered = songs.filter(
                (song) =>
                    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            setFilteredSongs(filtered)
        }
        setCurrentPage(1)
    }, [searchTerm, songs])

    // Calculate items to show on current page
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = Array.isArray(filteredSongs) ? filteredSongs.slice(indexOfFirstItem, indexOfLastItem) : []

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        setPlayingSongId(null) // Stop playing when changing page
    }

    // Toggle play/pause (visual only)
    const togglePlay = (index: number) => {
        setPlayingSongId(playingSongId === index ? null : index)
    }

    return (
        <div className="w-full mx-auto">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-200">
                {/* Content */}
                <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <h1 className="text-4xl font-bold text-blue-800 tracking-tight">
                            Mis{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">
                Canciones
              </span>
                        </h1>

                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500/70" />
                            <Input
                                placeholder="Buscar canciones..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-blue-50 border-blue-200 text-blue-800 placeholder:text-blue-400 focus-visible:ring-blue-300 w-full"
                            />
                        </div>
                    </div>

                    {/* Song list */}
                    <div className="space-y-4">
                        {currentItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-blue-800/80">
                                <p className="text-xl font-medium">No se encontraron canciones</p>
                                <p className="text-sm opacity-70">Intenta con otra búsqueda</p>
                            </div>
                        ) : (
                            currentItems.map((song, index) => (
                                <SongCard
                                    key={index}
                                    song={song}
                                    isPlaying={playingSongId === indexOfFirstItem + index}
                                    onTogglePlay={() => togglePlay(indexOfFirstItem + index)}
                                />
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredSongs.length > itemsPerPage && (
                        <SongPagination
                            songs={filteredSongs}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>

            {/* CSS para animaciones */}
            <style>{`
        @keyframes equalizer {
          0% { height: 5%; }
          100% { height: 100%; }
        }
        
        @keyframes fastSoundWave {
          0% { height: 20%; }
          100% { height: 90%; }
        }
        
        .animate-fast-equalizer {
          animation: equalizer 0.3s linear infinite alternate;
        }
      `}</style>
        </div>
    )
}