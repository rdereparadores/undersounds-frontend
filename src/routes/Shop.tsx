import TopBar from '@/components/shop/topBar.tsx';
import ProductCard from '@/components/shop/productCard.tsx';
import Filters from '@/components/shop/filters.tsx';
import CartPanel from '@/components/shop/cartPanel.tsx';
import { useCart } from '@/hooks/cartContext.tsx';
import { motion } from 'framer-motion';
import './Shop.css';
import {useState} from "react";

export type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
};

function generateRandomProduct(id: number): Product {
    return {
        id,
        name: `Producto ${id}`,
        description: `Descripción del producto ${id}.`,
        image: `https://picsum.photos/seed/${id}/200/200`,
        price: parseFloat((Math.random() * (100 - 10) + 10).toFixed(2)),
    };
}

const allProducts = Array.from({ length: 50 }, (_, i) => generateRandomProduct(i + 1));
const PRODUCTS_PER_PAGE = 20;

export default function Shop() {
    const { cart } = useCart();
    const isCartVisible = cart.length > 0;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = allProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="flex flex-1 p-4 gap-4">
                {/* Filtros: siempre ocupan 1/5 del ancho */}
                <div className="w-1/5 h-full">
                    <Filters />
                </div>
                {/* Productos: cambia el tamaño dependiendo de si el carrito está visible */}
                <div className={`transition-all duration-300 ${isCartVisible ? "w-3/5" : "w-4/5"}`}>
                    <div className={`grid ${isCartVisible ? "grid-cols-3" : "grid-cols-4"} gap-4`}>
                        {paginatedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} isCartVisible={isCartVisible} />
                        ))}
                    </div>
                    {/* Paginación */}
                    <div className="flex justify-center mt-4 gap-2">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
                            Anterior
                        </button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
                            Siguiente
                        </button>
                    </div>
                </div>
                {/* Carrito con animación de deslizamiento */}
                {isCartVisible && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="w-1/5 h-full flex flex-col"
                    >
                        <CartPanel />
                        {/* Botón para ir al carrito dentro del panel */}
                        <div className="p-4">
                            <button className="px-6 py-3 bg-blue-500 text-white rounded w-full">Ir al Carrito</button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}