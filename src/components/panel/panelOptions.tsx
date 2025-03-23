"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Music, Album, ShoppingCart, BarChart2 } from "lucide-react"
import { Link } from "react-router"

const OptionsPanel = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null)
    const [hoveredButton, setHoveredButton] = useState<string | null>(null)

    const buttons = [
        { id: "userProfile", label: "Perfil", icon: <User size={16} className="mr-3" />, path: "userProfile" },
        { id: "songPanel", label: "Mis canciones", icon: <Music size={16} className="mr-3" />, path: "songPanel" },
        { id: "albumPanel", label: "Mis álbumes", icon: <Album size={16} className="mr-3" />, path: "albumPanel" },
        { id: "purchases", label: "Compras", icon: <ShoppingCart size={16} className="mr-3" />, path: "purchases" },
        { id: "statistics", label: "Estadísticas", icon: <BarChart2 size={16} className="mr-3" />, path: "statistics" },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
    }

    // Button styles
    const buttonBaseStyle =
        "relative overflow-hidden w-full py-2 px-3 text-sm font-medium rounded-lg shadow-md text-white flex items-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:translate-y-0"
    const buttonGradient = "bg-gradient-to-r from-[#0076ff] to-[#005ecc] hover:from-[#005ecc] hover:to-[#004799]"
    const buttonActiveStyle = "bg-gradient-to-r from-[#005ecc] to-[#004799] shadow-inner"

    return (
        <motion.div
            className="flex flex-col gap-2 p-3 rounded-xl shadow-lg w-full md:w-48"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(8px)",
            }}
            variants={container}
            initial="hidden"
            animate="show"
        >
            {buttons.map((button) => (
                <motion.div key={button.id} variants={item} className="w-full">
                    <Link
                        to={button.path}
                        className="block"
                        onClick={() => setActiveButton(button.id)}
                        onMouseEnter={() => setHoveredButton(button.id)}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <motion.div
                            className={`${buttonBaseStyle} ${buttonGradient} ${activeButton === button.id ? buttonActiveStyle : ""}`}
                            whileTap={{ scale: 0.97 }}
                        >
                            <motion.span
                                className="transition-transform duration-300"
                                animate={{
                                    scale: hoveredButton === button.id ? 1.1 : 1,
                                }}
                            >
                                {button.icon}
                            </motion.span>
                            <span>{button.label}</span>
                            {hoveredButton === button.id && (
                                <motion.div
                                    className="absolute inset-0 rounded-lg"
                                    style={{ backgroundColor: "rgba(51, 145, 255, 0.2)" }}
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </motion.div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default OptionsPanel
