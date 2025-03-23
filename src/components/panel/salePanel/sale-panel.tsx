"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ShoppingCart, ChevronLeft, ChevronRight, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Sale {
  title: string
  fecha_venta: string
  precio: string
  estado: string
  cliente: string
  imageUrl: string
}

export default function SalePanel({ sales = [] }: { sales?: Sale[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Calcular los elementos que deben mostrarse en la página actual
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = Array.isArray(sales) ? sales.slice(indexOfFirstItem, indexOfLastItem) : []

  // Manejar cambio de página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Función para determinar el color del badge según el estado
  const getStatusColor = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "vendido":
        return "bg-green-100 text-green-800 border-green-300"
      case "pendiente":
        return "bg-amber-100 text-amber-800 border-amber-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  // Función para obtener el icono según el estado
  const getStatusIcon = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "vendido":
        return <Receipt className="h-4 w-4 mr-1" />
      case "pendiente":
        return <ShoppingCart className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  // Generar array de páginas a mostrar para la paginación
  const getPageNumbers = () => {
    const totalPages = Math.ceil(sales.length / itemsPerPage)
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

  // Funciones de navegación para la paginación
  const nextPage = () => {
    if (currentPage < Math.ceil(sales.length / itemsPerPage)) {
      handlePageChange(currentPage + 1)
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }


  return (
    <div
      className="w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-4 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4" >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent relative">
          Últimas ventas
          <span
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-sky-500"
          />
        </h1>
        <div>
          <Badge variant="outline" className="px-2 py-0.5 text-xs font-medium">
            {sales.length} productos
          </Badge>
        </div>
      </div>

      {currentItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow">
          <ShoppingCart className="mx-auto h-12 w-12 text-slate-400" />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">No hay ventas disponibles</p>
        </div>
      ) : (
        <div className="space-y-2">
            {currentItems.map((sale, index) => (
              <div
                key={`${sale.title}-${index}-${currentPage}`}
                className="group"
              >
                <Card className="overflow-hidden border-0 bg-white dark:bg-slate-800 group-hover:translate-y-[-4px]">
                  <CardContent className="p-0">
                    <div className="flex flex-row">
                      {/* Imagen con animación de hover */}
                      <div className="relative w-[100px] h-[100px] overflow-hidden bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900 dark:to-sky-900">
                        <div
                          className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-sky-500/20 opacity-0 z-10"
                        />
                        <img
                          src={sale.imageUrl || "/placeholder.svg"}
                          alt={sale.title}
                          className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-lighten opacity-90"
                        />
                      </div>

                      {/* Información del producto con animaciones de hover */}
                      <div className="flex-1 p-3 relative overflow-hidden">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 opacity-0 group-hover:opacity-100"
                        />

                        <div className="flex flex-row justify-between items-start relative z-10">
                          <div>
                            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                              {sale.title}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                              {sale.cliente}
                            </p>
                          </div>
                          <p
                            className="text-lg font-bold text-slate-800 dark:text-slate-100"
                          >
                            {sale.precio}
                          </p>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2 items-center relative z-10">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-slate-500 group-hover:text-blue-500" />
                            <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white">
                              {sale.fecha_venta}
                            </span>
                          </div>

                          <div>
                            <Badge
                              className={`flex items-center px-2 py-0.5 text-xs ${getStatusColor(sale.estado)}`}
                              variant="outline"
                            >
                              {getStatusIcon(sale.estado)}
                              {sale.estado}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      )}

      {/* Componente de paginación integrado */}
      {sales.length > 0 && (
        <div
          className="flex justify-center items-center gap-2 mt-4"
        >
          <div>
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
          </div>

          <div className="flex gap-1">
            {getPageNumbers().map((page, index) =>
              typeof page === "number" ? (
                <div key={index}>
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={`w-7 h-7 rounded-full text-xs ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white"
                        : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300"
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                </div>
              ) : (
                <span key={index} className="flex items-center justify-center w-7 h-7 text-xs">
                  {page}
                </span>
              ),
            )}
          </div>

          <div>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full w-7 h-7 ${currentPage >= Math.ceil(sales.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300"}`}
              onClick={nextPage}
              disabled={currentPage >= Math.ceil(sales.length / itemsPerPage)}
            >
              <ChevronRight className="h-3 w-3" />
              <span className="sr-only">Página siguiente</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

