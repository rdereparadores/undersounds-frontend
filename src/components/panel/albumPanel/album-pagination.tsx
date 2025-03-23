"use client"

import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ButtonProps } from "./button"

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

interface AlbumPaginationProps {
    albums: Album[]
    currentPage: number
    onPageChange: (page: number) => void
    Button: React.ComponentType<ButtonProps>
}

export const AlbumPagination = ({ albums, currentPage, onPageChange, Button }: AlbumPaginationProps) => {
    const itemsPerPage = 3
    const totalPages = Math.ceil(albums.length / itemsPerPage)

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

    const getPageNumbers = () => {
        const pageNumbers = []
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            pageNumbers.push(1)
            let startPage = Math.max(2, currentPage - 1)
            let endPage = Math.min(totalPages - 1, currentPage + 1)

            if (currentPage <= 2) {
                endPage = 4
            } else if (currentPage >= totalPages - 1) {
                startPage = totalPages - 3
            }

            if (startPage > 2) {
                pageNumbers.push("...")
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i)
            }

            if (endPage < totalPages - 1) {
                pageNumbers.push("...")
            }

            if (totalPages > 1) {
                pageNumbers.push(totalPages)
            }
        }

        return pageNumbers
    }

    return (
        <div className="mt-4 sm:mt-8 w-full flex justify-center items-center gap-2 sm:gap-3">
            <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white border-gray-100 shadow-sm ${
                    currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 hover:border-blue-300"
                }`}
                onClick={previousPage}
                disabled={currentPage <= 1}
                style={{ backgroundColor: "#f8fafc", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
            >
                <ChevronLeft className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Página anterior</span>
            </Button>

            <div className="flex gap-2 sm:gap-3">
                {getPageNumbers().map((page, index) =>
                        typeof page === "number" ? (
                            <Button
                                key={index}
                                variant={currentPage === page ? "default" : "outline"}
                                size="icon"
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                                    currentPage === page
                                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white"
                                        : "hover:bg-blue-100 hover:border-blue-300"
                                }`}
                                onClick={() => onPageChange(page)}
                                style={
                                    currentPage === page
                                        ? { backgroundColor: "#3b82f6", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }
                                        : { backgroundColor: "#f8fafc", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }
                                }
                            >
                                {page}
                            </Button>
                        ) : (
                            <span key={index} className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-sm text-gray-500">
              {page}
            </span>
                        ),
                )}
            </div>

            <Button
                variant="outline"
                size="icon"
                className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 bg-white border-gray-100 shadow-sm ${
                    currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 hover:border-blue-300"
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
