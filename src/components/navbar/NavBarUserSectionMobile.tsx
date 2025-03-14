import { Button } from "../ui/button"
import { PiVinylRecord } from "react-icons/pi"
import { IoStatsChartOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'

export const NavBarUserSectionMobile = () => (
    <>
        <Button variant="outline">
            <Avatar>
                <AvatarImage src="https://picsum.photos/30" alt="avatarUser" className='rounded-full'></AvatarImage>
                <AvatarFallback>User</AvatarFallback>
            </Avatar>
            Nombre Usuario
        </Button>
        <Button variant="ghost"><PiVinylRecord />Canciones</Button>
        <Button variant="ghost"><IoAlbumsOutline />Álbumes</Button>
        <Button variant="ghost"><IoStatsChartOutline />Estadísticas</Button>
        <Button variant="ghost"> <IoIosLogOut />Cerrar sesión</Button>
    </>
)