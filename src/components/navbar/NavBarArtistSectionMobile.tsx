import { Button } from "../ui/button"
import { PiVinylRecord } from "react-icons/pi"
import { IoStatsChartOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import { useAuth } from "@/hooks/auth/useAuth"

export const NavBarArtistSectionMobile = () => {
    const auth = useAuth()
    return (
        <>
            <Button variant="outline">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/30" alt="avatarUser" className='rounded-full'></AvatarImage>
                    <AvatarFallback>Artist</AvatarFallback>
                </Avatar>
                Artista
            </Button>
            <Button variant="ghost"><PiVinylRecord />Mis canciones</Button>
            <Button variant="ghost"><IoAlbumsOutline />Mis álbumes</Button>
            <Button variant="ghost"><IoStatsChartOutline />Ventas</Button>
            <Button variant="ghost" onClick={auth.logOut}> <IoIosLogOut />Cerrar sesión</Button>
        </>
    )
}