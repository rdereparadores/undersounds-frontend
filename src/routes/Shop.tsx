import TopBar from './components/shop/topBar.tsx';
import ProductCard from './components/shop/productCard.tsx';
import Filters from './components/shop/filters.tsx';
import CartPanel from './components/shop/cartPanel.tsx';
import { useCart } from '@/hooks/cartContext.tsx';
import { motion } from 'framer-motion';
import './Shop.css';

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

const products = Array.from({ length: 9 }, (_, i) => generateRandomProduct(i + 1));

export default function Shop() {
    const { cart } = useCart();
    const isCartVisible = cart.length > 0;

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar />
            <div className="flex flex-1 p-4 gap-4">
                {/* Filtros */}
                <div className="w-1/5 h-full">
                    <Filters />
                </div>

                {/* Productos */}
                <div className={isCartVisible ? "w-3/5" : "w-4/5"}>
                    <div className={`grid gap-4 ${isCartVisible ? "grid-cols-3" : "grid-cols-4"}`}>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} isCartVisible={isCartVisible} />
                        ))}
                    </div>
                </div>

                {/* Carrito con animación */}
                {isCartVisible && (
                    <motion.div
                        className="w-1/5 h-full"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: "0%", opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        <CartPanel />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
