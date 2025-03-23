"use client"

import { useState } from "react"
import ProfileHeader from "@/components/panel/profileHeader.tsx"
import { Outlet } from "react-router"
import ArtistPanelOptions from "@/components/panel/artistPanelOptions.tsx"

export const ArtistPanel = () => {
    // Estado para mostrar/ocultar las opciones en vista móvil
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="w-full overflow-x-hidden">
            {/* Encabezado de perfil */}
            <ProfileHeader isArtist={true} username="Manahen Music" />
            <div className="flex flex-col md:flex-row p-3 sm:p-5">
                {/* Panel de opciones */}
                <div className="w-full md:w-1/5 min-w-[200px] p-3 sm:p-5 relative">
                    {/* Botón "Menú" visible solo en móviles, fijo en esquina inferior derecha */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-gradient-to-r from-[#0076ff] to-[#005ecc] text-white rounded shadow hover:from-[#005ecc] hover:to-[#004799] transition-colors"
                        >
                            Menú
                        </button>
                    </div>
                    {/* Mostrar opciones si el menú está abierto en móvil o siempre en desktop */}
                    <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
                        <ArtistPanelOptions />
                    </div>
                </div>
                {/* Contenido principal */}
                <div className="flex-1 p-3 sm:p-5">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
