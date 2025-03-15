import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline } from 'react-icons/io5'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PiVinylRecord } from "react-icons/pi"
import { IoStatsChartOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'
import { Button } from "../ui/button"
import { useAuth } from '@/hooks/auth/useAuth'

export const NavBarArtistSection = () => {
    const auth = useAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/30" width='25px' height='25px' alt="avatarUser" className='rounded-full'></AvatarImage>
                        <AvatarFallback>Artist</AvatarFallback>
                    </Avatar>
                    Mi cuenta
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-44' align='end'>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/30" alt="avatarUser" className='rounded-full'></AvatarImage>
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                        <p>Artista</p>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <PiVinylRecord />Mis canciones
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IoAlbumsOutline />Mis álbumes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <IoStatsChartOutline />Ventas
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={auth.logOut}>
                        <IoIosLogOut />Cerrar sesión
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}