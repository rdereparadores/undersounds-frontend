"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Sale {
  title: string
  fecha_venta: string
  precio: string
  estado: string
  cliente: string
  imageUrl: string
}

interface SalePaginationProps {
  sales: Sale[]
  currentPage: number
  onPageChange: (page: number) => void
}

export const SalePagination = ({ sales, currentPage, onPageChange }: SalePaginationProps) => {
  const itemsPerPage = 6
  const totalPages = Math.ceil(sales.length / itemsPerPage)

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
    <motion.div
      className="flex justify-center items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full w-7 h-7 ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300"}`}
          onClick={previousPage}
          disabled={currentPage <= 1}
        >
          <ChevronLeft className="h-3 w-3" />
          <span className="sr-only">Página anterior</span>
        </Button>
      </motion.div>

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className={`w-7 h-7 rounded-full text-xs ${
                  currentPage === page
                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white"
                    : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300"
                }`}
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            </motion.div>
          ) : (
            <span key={index} className="flex items-center justify-center w-7 h-7 text-xs">
              {page}
            </span>
          ),
        )}
      </div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full w-7 h-7 ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300"}`}
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          <ChevronRight className="h-3 w-3" />
          <span className="sr-only">Página siguiente</span>
        </Button>
      </motion.div>
    </motion.div>
  )
}

