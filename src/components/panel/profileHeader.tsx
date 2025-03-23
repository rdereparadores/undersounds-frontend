import { useState } from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Music } from "lucide-react"

interface ProfileHeaderProps {
    isArtist?: boolean
    username?: string
    avatarUrl?: string
}

const ProfileHeader = ({ isArtist = false, username = "Usuario", avatarUrl = "" }: ProfileHeaderProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const initials = username.slice(0, 2).toUpperCase()

    return (
        <div className="mt-4 mx-4 md:ml-10 relative overflow-hidden">
            {/* Efectos de fondo azul en pantallas medianas o superiores */}
            <div className="absolute hidden md:block -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl opacity-60" />
            <div className="absolute hidden md:block -bottom-20 -left-20 w-40 h-40 bg-blue-700/20 rounded-full blur-3xl opacity-60" />

            {/* Contenedor centrado en móvil y alineado a la izquierda en desktop */}
            <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-start">
                {/* Avatar con borde degradado */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-30 scale-110" />
                    <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-blue-500/30 min-w-[6rem] sm:min-w-[8rem] relative z-10 shadow-xl">
                        <AvatarImage className="aspect-square w-full h-full" src={avatarUrl} alt="Fotoperfil" />
                        <AvatarFallback className="bg-blue-50 text-blue-700 text-2xl font-bold">{initials}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <div
                        className="flex flex-col items-center md:flex-row md:items-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <h1
                            className={`
                text-xl sm:text-2xl font-bold text-blue-600 
                transition-all 
                ${isHovered ? "tracking-wider scale-105" : ""}
              `}
                        >
                            {username}
                        </h1>

                        {isArtist && (
                            <div
                                className={`
                  ml-2 text-blue-500 
                  transition-transform 
                  ${isHovered ? "rotate-12 scale-110" : ""}
                `}
                            >
                                <Music className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                        )}

                        <div className="mt-2 md:mt-0">
              <span
                  className={`
                  px-3 py-1 rounded-full text-xs font-medium 
                  ${isArtist
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : "bg-gray-100 text-gray-800 border border-gray-300"
                  }
                `}
              >
                {isArtist ? "Artista" : "Usuario"}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader
