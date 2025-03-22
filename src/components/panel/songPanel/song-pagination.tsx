import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./button" // Import the Button component

interface Song {
    artist: string
    duration: string
    imageUrl: string
    name: string
    downloadUrl: string
}

interface SongPaginationProps {
    songs: Song[];
    currentPage: number;
    onPageChange: (page: number) => void;
}

export const SongPagination = ({ songs, currentPage, onPageChange }: SongPaginationProps) => {
    const itemsPerPage = 4
    const totalPages = Math.ceil(songs.length / itemsPerPage)

    const nextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const goToPage = (page: number) => {
        onPageChange(page)
    }

    // Generar array de páginas a mostrar
    const getPageNumbers = () => {
        const pageNumbers = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // Si hay menos páginas que el máximo a mostrar, mostrar todas
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // Siempre mostrar la primera página
            pageNumbers.push(1)

            // Calcular el rango de páginas a mostrar alrededor de la página actual
            let startPage = Math.max(2, currentPage - 1)
            let endPage = Math.min(totalPages - 1, currentPage + 1)

            // Ajustar si estamos cerca del inicio o final
            if (currentPage <= 2) {
                endPage = 4
            } else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 3
            }

            // Añadir ellipsis si es necesario
            if (startPage > 2) {
                pageNumbers.push("...")
            }

            // Añadir páginas intermedias
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i)
            }

            // Añadir ellipsis si es necesario
            if (endPage < totalPages - 1) {
                pageNumbers.push("...")
            }

            // Siempre mostrar la última página
            if (totalPages > 1) {
                pageNumbers.push(totalPages)
            }
        }

        return pageNumbers
    }

    return (
        <div className="mt-8 w-full flex justify-center items-center gap-3">
            <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-10 h-10 bg-white shadow-sm ${
                    currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300"
                }`}
                onClick={previousPage}
                disabled={currentPage <= 1}
                style={{ backgroundColor: "#f8fafc", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
                <ChevronLeft className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Página anterior</span>
            </Button>

            <div className="flex gap-3">
                {getPageNumbers().map((page, index) =>
                        typeof page === "number" ? (
                            <Button
                                key={index}
                                variant={currentPage === page ? "default" : "outline"}
                                size="icon"
                                className={`w-10 h-10 rounded-full ${
                                    currentPage === page
                                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white"
                                        : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300a"
                                }`}
                                onClick={() => goToPage(page)}
                                style={
                                    currentPage === page
                                        ? { backgroundColor: "#3b82f6", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }
                                        : { backgroundColor: "#f8fafc", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }
                                }
                            >
                                {page}
                            </Button>
                        ) : (
                            <span key={index} className="flex items-center justify-center w-10 h-10 text-sm text-gray-500">
              {page}
            </span>
                        ),
                )}
            </div>

            <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-10 h-10 bg-white border-gray-100 shadow-sm ${
                    currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
                onClick={nextPage}
                disabled={currentPage >= totalPages}
                style={{ backgroundColor: "#f8fafc", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
                <ChevronRight className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Página siguiente</span>
            </Button>
        </div>
    )
}