import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline, IoCartOutline } from 'react-icons/io5'
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
import { Card } from "../ui/card"
import { Input } from "../ui/input"
import { Link } from 'react-router'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavBarProps { logIn: boolean, floating: boolean }

const NavBarGuestSection = () => (
    <>
        <DropdownMenu modal={false}>
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
    </>
)

const NavBarLoggedInSection = () => (
    <>
        <Button asChild variant='outline'>
            <Link to='/auth/signin'>Iniciar sesión</Link>
        </Button>
        <Button asChild>
            <Link to='/auth/signup'>Registrarse</Link>
        </Button>
        {/*<Button>
            <IoCartOutline/>Carrito
        </Button>*/}
    </>
)

function NavBar({ logIn, floating }: NavBarProps) {
    return (

        <Card className={`${floating ? '' : 'rounded-none'} w-full h-fit flex items-center justify-between p-2`}>
            <div className='grow flex gap-2 items-center justify-start'>
                <Button asChild>
                    <Link to='/'>Under<br />Sounds</Link>
                </Button>
                <Input className='w-[50%]' type='search' placeholder='Buscar'></Input>
            </div>

            <div className='items-center gap-2 justify-end hidden sm:flex'>
                <Button asChild variant='ghost'>
                    <Link to='/shop'>Tienda</Link>
                </Button>

                {logIn ? <NavBarLoggedInSection /> : <NavBarGuestSection />}

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild>
                                <Link to='/shop/cart'>
                                    <IoCartOutline />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Carrito</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </Card>

    )
}



export { NavBar }