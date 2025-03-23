//import MainBar from '@/components/panel/panelBar';
import ProfileHeader from '@/components/panel/profileHeader.tsx';
import OptionsPanel from '@/components/panel/panelOptions';
import { Outlet } from "react-router";
import { useState } from "react";

export const UserPanel = () => {
    // Estado para mostrar/ocultar las opciones en vista móvil
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="w-full overflow-x-hidden">
            {/* <MainBar /> */}
            <ProfileHeader isArtist={false} username="Manahen Music" />
            <div className="flex flex-col md:flex-row p-5">
                {/* Panel de opciones */}
                <div className="w-full md:w-1/5 min-w-[200px] p-5 relative">
                    {/* Botón "Menú" visible solo en móviles, fijo en esquina inferior derecha */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gradient-to-r from-[#0076ff] to-[#005ecc] text-white rounded shadow hover:from-[#005ecc] hover:to-[#004799] transition-colors"
                        >
                            Menú
                        </button>
                    </div>
                    {/* Se muestran las opciones si el menú está abierto en móvil o siempre en desktop */}
                    <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
                        <OptionsPanel />
                    </div>
                </div>
                {/* Contenido principal */}
                <div className="flex-1 p-5">
                    <div className="w-full dark:from-slate-900 dark:to-blue-950 p-4 rounded-xl overflow-hidden">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
