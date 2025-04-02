import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { MdOutlineLocalShipping } from "react-icons/md"
import { IoAlbumsOutline } from 'react-icons/io5'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosLogOut } from 'react-icons/io'
import { RxDashboard } from "react-icons/rx"
import { Button } from "../ui/button"
import { Skeleton } from '../ui/skeleton'
import { useAuth } from '@/hooks/auth/useAuth'
import { Link } from 'react-router'

export const NavBarUserSection = () => {
    const auth = useAuth()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Avatar>
                        <AvatarImage src="https://picsum.photos/30" width='25px' height='25px' alt="avatarUser" className='rounded-full'></AvatarImage>
                        <AvatarFallback><Skeleton className='w-[25px] h-[25px] rounded-full' /></AvatarFallback>
                    </Avatar>
                    Mi cuenta
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='min-w-48 w-fit' align='end'>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Avatar>
                            <AvatarImage src="https://picsum.photos/30" width='30px' height='30px' alt="avatarUser" className='rounded-full'></AvatarImage>
                            <AvatarFallback>
                                <Skeleton className='w-[30px] h-[30px] rounded-full' />
                            </AvatarFallback>
                        </Avatar>
                        <p>@{auth.userName}</p>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link to='/user/dashboard'><RxDashboard />Panel</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to='/user/dashboard/library'><IoAlbumsOutline />Biblioteca</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to='/user/dashboard/orders'><MdOutlineLocalShipping />Pedidos</Link>
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