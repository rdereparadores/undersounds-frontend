// components/shop/topBar.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { useCart } from '@/hooks/cartContext.tsx';
import CartView from './cartView';

export default function TopBar() {
    const { cart } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="bg-white shadow p-4 flex items-center justify-between relative">
            <div className="p-4 flex items-center gap-8">
                <h1 className="text-xl text-black font-bold">UnderSounds</h1>
                <Input placeholder="Buscar..." className="w-32 md:w-64" />
            </div>
            <div className="p-4 flex items-center gap-8">
                {/* Ícono del carrito */}
                <div className="relative">
                    <button onClick={toggleCart} className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6M9 21a1 1 0 11-2 0 1 1 0 012 0zm10 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                        </svg>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
                        )}
                    </button>
                </div>

                {/* Enlaces visibles solo en escritorio */}
                <div className="hidden md:flex gap-4">
                    <a href="../../main_menu.tsx" className="text-gray-700">
                        Inicio
                    </a>
                    <a href="../../Shop.tsx" className="text-gray-700">
                        Productos
                    </a>
                    <a href="#" className="text-gray-700">
                        Contacto
                    </a>
                </div>
                {/* Menú desplegable visible solo en móvil */}
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <img
                                src="https://via.placeholder.com/32"
                                alt="Menú"
                                className="w-8 h-8 rounded-full cursor-pointer"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Inicio</DropdownMenuItem>
                            <DropdownMenuItem>Productos</DropdownMenuItem>
                            <DropdownMenuItem>Contacto</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            {isCartOpen && <CartView onClose={toggleCart} />}
        </div>
    );
}
