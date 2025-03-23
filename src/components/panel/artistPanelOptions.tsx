"use client"

import { useState } from "react"
import { User, Music, Album, DollarSign, BarChart2 } from "lucide-react"
import { Link } from "react-router"

const ArtistPanelOptions = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null)
    const [hoveredButton, setHoveredButton] = useState<string | null>(null)

    const buttons = [
        { id: "artistProfile", label: "Perfil", icon: <User size={16} className="mr-3" />, path: "artistProfile" },
        { id: "songPanel", label: "Mis canciones", icon: <Music size={16} className="mr-3" />, path: "songPanel" },
        { id: "albumPanel", label: "Mis álbumes", icon: <Album size={16} className="mr-3" />, path: "albumPanel" },
        { id: "sales", label: "Ventas", icon: <DollarSign size={16} className="mr-3" />, path: "sales" },
        { id: "statistics", label: "Estadísticas", icon: <BarChart2 size={16} className="mr-3" />, path: "statistics" },
    ]

    // Clases base para los botones
    const buttonBaseStyle =
        "relative overflow-hidden w-full py-2 px-3 text-sm font-medium rounded-lg shadow-md text-white flex items-center"
    const buttonGradient = "bg-gradient-to-r from-[#0076ff] to-[#005ecc] hover:from-[#005ecc] hover:to-[#004799]"
    const buttonActiveStyle = "bg-gradient-to-r from-[#005ecc] to-[#004799] shadow-inner"

    return (
        <div
            className="
        flex flex-col gap-2 p-3
        rounded-xl shadow-lg
        w-full
        bg-white/50
        dark:bg-slate-900/30
        backdrop-blur-md
    "
        >

        {buttons.map((button) => (
                <div key={button.id} className="w-full">
                    <Link
                        to={button.path}
                        className="block"
                        onClick={() => setActiveButton(button.id)}
                        onMouseEnter={() => setHoveredButton(button.id)}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <div
                            className={`
                ${buttonBaseStyle} 
                ${buttonGradient} 
                ${activeButton === button.id ? buttonActiveStyle : ""}
              `}
                        >
                            <span>{button.icon}</span>
                            <span>{button.label}</span>
                            {hoveredButton === button.id && (
                                <div
                                    className="absolute inset-0 rounded-lg"
                                    style={{ backgroundColor: "rgba(51, 145, 255, 0.2)" }}
                                />
                            )}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ArtistPanelOptions
