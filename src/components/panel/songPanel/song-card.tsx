import { Play, Pause, Download } from "lucide-react"
import { Button } from "./button" // Import the Button component

interface Song {
    artist: string
    duration: string
    imageUrl: string
    name: string
    downloadUrl: string
}

interface SongCardProps {
    song: Song
    isPlaying: boolean
    onTogglePlay: () => void
}

export function SongCard({ song, isPlaying, onTogglePlay }: SongCardProps) {
    // Generar barras para la onda de sonido
    const generateSoundWaveBars = () => {
        const bars = []
        const barCount = 30

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

    const handleDownload = () => {
        // Simulación de descarga (sin funcionalidad real)
        console.log(`Descarga simulada: ${song.artist} - ${song.name}`)
    }

    return (
        <div
            className={`relative rounded-xl overflow-hidden transition-transform duration-200
        ${isPlaying ? "bg-blue-100 shadow-lg border border-blue-300/50" : "bg-white hover:bg-blue-50 border border-transparent hover:border-blue-300/30"}
        hover:scale-[1.02] hover:shadow-xl cursor-pointer
      `}
        >
            <div className="p-4 bg-blue-50">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Imagen del álbum con efecto de brillo */}
                    <div
                        className={`relative flex-shrink-0 rounded-lg overflow-hidden
              w-20 h-20 md:w-[80px] md:h-[80px] ${isPlaying ? "shadow-[0_0_15px_rgba(96,165,250,0.5)]" : "shadow-md"}
            `}
                    >
                        <img
                            src={song.imageUrl || "/placeholder.svg?height=80&width=80"}
                            alt={song.name}
                            width={80}
                            height={80}
                            className={`object-cover w-full h-full transition-transform duration-200 ${isPlaying ? "scale-110" : ""}`}
                        />
                        {isPlaying && <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent"></div>}
                    </div>

                    {/* Información de la canción */}
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold truncate text-blue-800">{song.name}</h2>
                        <p className="text-blue-600/80 truncate">{song.artist}</p>

                        {/* Visualización de la onda de sonido */}
                        <div className="mt-3 space-y-1.5">
                            <div className="h-8 flex items-center">
                                <div className="w-full h-full flex items-center justify-between gap-0.5">
                                    {generateSoundWaveBars()}
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-blue-500/70">
                                <span>{isPlaying ? "Reproduciendo" : ""}</span>
                                <span>{song.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Controles */}
                    <div className="flex items-center gap-3">
                        {/* Botón de play/pausa */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-full transition-colors duration-200 ${
                                isPlaying
                                    ? "bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
                                    : "text-blue-600 hover:text-white hover:bg-blue-500"
                            }`}
                            onClick={onTogglePlay}
                        >
                            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>

                        {/* Botón de descarga */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full text-blue-600 hover:text-white hover:bg-blue-500 transition-colors duration-200"
                            onClick={handleDownload}
                        >
                            <Download className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Ecualizador animado cuando se reproduce */}
            {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 h-1 flex justify-center items-end gap-0.5 px-4 overflow-hidden">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-blue-400 rounded-t-sm"
                            style={{ height: `${Math.random() * 100}%` }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
