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

export const NavBarUserSection = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/30" width='25px' height='25px' alt="avatarUser" className='rounded-full'></AvatarImage>
                    <AvatarFallback>User</AvatarFallback>
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
                    <p>Nombre Usuario</p>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <PiVinylRecord />Canciones
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IoAlbumsOutline />Álbumes
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IoStatsChartOutline />Estadísticas
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <IoIosLogOut />Cerrar sesión
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
)