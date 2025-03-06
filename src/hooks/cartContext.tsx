import { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
};

type CartContextType = {
    cart: Product[];
    addToCart: (product: Product) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart((prevItems) => [...prevItems, product]);
        console.log('Producto añadido al carrito:', product);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de un CartProvider');
    }
    return context;
};
