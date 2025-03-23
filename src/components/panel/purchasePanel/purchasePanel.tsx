"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Package, ShoppingCart, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Purchase {
    title: string
    fecha_compra: string
    precio: string
    estado: string
    proveedor: string
    imageUrl: string
}

export default function PurchasePanel({ purchases = [] }: { purchases?: Purchase[] }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)
    const itemsPerPage = 6

    // Efecto para activar la animación de carga
    useEffect(() => {
        setIsLoaded(true)
    }, [])

    // Calcular los elementos que deben mostrarse en la página actual
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = Array.isArray(purchases) ? purchases.slice(indexOfFirstItem, indexOfLastItem) : []

    // Manejar cambio de página
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    // Función para determinar el color del badge según el estado
    const getStatusColor = (estado: string) => {
        switch (estado.toLowerCase()) {
            case "entregado":
                return "bg-green-100 text-green-800 border-green-300"
            case "en camino":
                return "bg-blue-100 text-blue-800 border-blue-300"
            case "pendiente de envío":
                return "bg-amber-100 text-amber-800 border-amber-300"
            default:
                return "bg-gray-100 text-gray-800 border-gray-300"
        }
    }

    // Función para obtener el icono según el estado
    const getStatusIcon = (estado: string) => {
        switch (estado.toLowerCase()) {
            case "entregado":
                return <Package className="h-4 w-4 mr-1" />
            case "en camino":
                return <Truck className="h-4 w-4 mr-1" />
            case "pendiente de envío":
                return <ShoppingCart className="h-4 w-4 mr-1" />
            default:
                return null
        }
    }

    // Generar array de páginas a mostrar para la paginación
    const getPageNumbers = () => {
        const totalPages = Math.ceil(purchases.length / itemsPerPage)
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
        if (currentPage < Math.ceil(purchases.length / itemsPerPage)) {
            handlePageChange(currentPage + 1)
        }
    }

    const previousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1)
        }
    }

    // Animaciones para el contenedor principal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    }

    // Animaciones para el título
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        },
    }

    // Animaciones para cada tarjeta
    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2 },
        },
    }

    // Animaciones para la paginación
    const paginationVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.5,
                duration: 0.5,
            },
        },
    }

    return (
        <motion.div
            className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 p-4 rounded-xl shadow-lg overflow-hidden"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.div className="flex items-center justify-between mb-4" variants={titleVariants}>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent relative">
                    Últimas compras
                    <motion.span
                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-sky-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    />
                </h1>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 500 }}
                >
                    <Badge variant="outline" className="px-2 py-0.5 text-xs font-medium">
                        {purchases.length} productos
                    </Badge>
                </motion.div>
            </motion.div>

            {currentItems.length === 0 ? (
                <motion.div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow" variants={cardVariants}>
                    <ShoppingCart className="mx-auto h-12 w-12 text-slate-400" />
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">No hay compras disponibles</p>
                </motion.div>
            ) : (
                <div className="space-y-2">
                    <AnimatePresence mode="wait">
                        {currentItems.map((purchase, index) => (
                            <motion.div
                                key={`${purchase.title}-${index}-${currentPage}`}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                className="group"
                            >
                                <Card className="overflow-hidden border-0 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800 group-hover:translate-y-[-4px]">
                                    <CardContent className="p-0">
                                        <div className="flex flex-row">
                                            {/* Imagen con animación de hover */}
                                            <div className="relative w-[100px] h-[100px] overflow-hidden bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900 dark:to-sky-900">
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                                                    whileHover={{ opacity: 1 }}
                                                />
                                                <motion.img
                                                    src={purchase.imageUrl || "/placeholder.svg"}
                                                    alt={purchase.title}
                                                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-lighten opacity-90"
                                                    whileHover={{
                                                        scale: 1.15,
                                                        transition: { duration: 0.5 },
                                                    }}
                                                />
                                            </div>

                                            {/* Información del producto con animaciones de hover */}
                                            <div className="flex-1 p-3 relative overflow-hidden">
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                />

                                                <div className="flex flex-row justify-between items-start relative z-10">
                                                    <div>
                                                        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                                                            {purchase.title}
                                                        </h2>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                                                            {purchase.proveedor}
                                                        </p>
                                                    </div>
                                                    <motion.p
                                                        className="text-lg font-bold text-slate-800 dark:text-slate-100"
                                                        whileHover={{
                                                            scale: 1.1,
                                                            color: "#0284c7",
                                                            transition: { duration: 0.2 },
                                                        }}
                                                    >
                                                        {purchase.precio}
                                                    </motion.p>
                                                </div>

                                                <div className="mt-2 flex flex-wrap gap-2 items-center relative z-10">
                                                    <div className="flex items-center">
                                                        <Calendar className="h-3 w-3 mr-1 text-slate-500 group-hover:text-blue-500 transition-colors duration-300" />
                                                        <span className="text-xs text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300">
                              {purchase.fecha_compra}
                            </span>
                                                    </div>

                                                    <div>
                                                        {/* Status badge without hover effects */}
                                                        <Badge
                                                            className={`flex items-center px-2 py-0.5 text-xs ${getStatusColor(purchase.estado)}`}
                                                            variant="outline"
                                                        >
                                                            {getStatusIcon(purchase.estado)}
                                                            {purchase.estado}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Componente de paginación integrado */}
            {purchases.length > 0 && (
                <motion.div
                    className="flex justify-center items-center gap-2 mt-4"
                    variants={paginationVariants}
                    initial="hidden"
                    animate="visible"
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
                                            onClick={() => handlePageChange(page)}
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
                            className={`rounded-full w-7 h-7 ${currentPage >= Math.ceil(purchases.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-100 dark:hover:bg-blue-900 hover:border-blue-300"}`}
                            onClick={nextPage}
                            disabled={currentPage >= Math.ceil(purchases.length / itemsPerPage)}
                        >
                            <ChevronRight className="h-3 w-3" />
                            <span className="sr-only">Página siguiente</span>
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    )
}

