// components/shop/topBar.tsx
import { Input } from '@/components/ui/input.tsx';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';

export default function TopBar() {
    return (
        <div className="bg-white shadow p-4 flex items-center justify-between relative">
            <div className="p-4 flex items-center gap-8">
                <h1 className="text-xl text-black font-bold">UnderSounds</h1>
                <Input placeholder="Buscar..." className="w-32 md:w-64" />
            </div>
            <div className="p-4 flex items-center gap-8">

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
        </div>
    );
}
