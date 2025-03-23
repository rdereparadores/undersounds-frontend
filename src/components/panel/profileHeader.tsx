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

    // Determine initials for avatar fallback
    const initials = username.slice(0, 2).toUpperCase()

    return (
        <div className="mt-4 ml-10">
            {/* Blue-themed background effects */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-700/20 rounded-full blur-3xl opacity-60"></div>

            <div className="relative z-10 flex items-center gap-8">
                {/* Avatar with blue gradient border */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-md opacity-30 scale-110"></div>
                    <Avatar className="w-32 h-32 border-2 border-blue-500/30 min-w-[8rem] relative z-10 shadow-xl">
                        <AvatarImage className="aspect-square w-full h-full" src={avatarUrl} alt="Fotoperfil" />
                        <AvatarFallback className="bg-blue-50 text-blue-700 text-2xl font-bold">{initials}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="flex flex-col">
                    <div
                        className="flex items-center"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <h1
                            className={`text-2xl font-bold text-blue-600 ${
                                isHovered ? "tracking-wider scale-105" : ""
                            }`}
                        >
                            {username}
                        </h1>

                        {/* Icon for artist */}
                        {isArtist && (
                            <div
                                className={`ml-2 text-blue-500${isHovered ? "rotate-12 scale-110" : ""}`}
                            >
                                <Music className="w-6 h-6" />
                            </div>
                        )}

                        {/* Badge to clearly indicate user type */}
                        <div className="ml-3">
              <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isArtist
                          ? "bg-blue-100 text-blue-800 border border-blue-300"
                          : "bg-gray-100 text-gray-800 border border-gray-300"
                  }`}
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

