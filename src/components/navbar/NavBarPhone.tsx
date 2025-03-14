import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { PiVinylRecord } from "react-icons/pi"
import { IoCartOutline, IoStatsChartOutline } from 'react-icons/io5'
import { IoIosLogOut } from 'react-icons/io'
import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { IoAlbumsOutline, } from 'react-icons/io5'
import { GiHamburgerMenu } from "react-icons/gi";

interface NavBarProps { logIn: boolean }

const NavBarPhoneLoggedInSection = () => (
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

const NavBarPhoneGuestSection = () => (
    <>
        <SheetFooter>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/shop'>Tienda</Link>
                </Button>
            </SheetClose>
        </SheetFooter>

        <SheetFooter>
            <SheetClose asChild>
                <Button asChild variant="outline">
                    <Link to='/auth/signin'>Iniciar sesión</Link>
                </Button>
            </SheetClose>
        </SheetFooter>

        <SheetFooter>
            <SheetClose asChild>
                <Button asChild>
                    <Link to='/auth/signup'>Registrarse</Link>
                </Button>
            </SheetClose>
        </SheetFooter>
        <SheetFooter>
            <SheetClose asChild>
                <Button asChild >
                    <Link to='/shop/cart'>
                        <IoCartOutline />Carrito
                    </Link>
                </Button>
            </SheetClose>
        </SheetFooter>
    </>
)

export function NavBarPhone({ logIn }: NavBarProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline"><GiHamburgerMenu /></Button>
            </SheetTrigger>

            <SheetContent className="flex flex-col">
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                </SheetHeader>
                <SheetDescription></SheetDescription>
                {logIn ? <NavBarPhoneLoggedInSection /> : <NavBarPhoneGuestSection />}
            </SheetContent>
        </Sheet>

    )
}