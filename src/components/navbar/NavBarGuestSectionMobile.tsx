import {
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { IoCartOutline } from 'react-icons/io5'
import { Link } from 'react-router'

export const NavBarGuestSectionMobile = () => {
    return (
        <>
            <SheetClose asChild>
                <Button asChild variant="ghost">
                    <Link to='/shop'>Tienda</Link>
                </Button>
            </SheetClose>


            <SheetClose asChild>
                <Button asChild variant="outline">
                    <Link to='/auth/signin'>Iniciar sesión</Link>
                </Button>
            </SheetClose>

            <SheetClose asChild>
                <Button asChild>
                    <Link to='/auth/signup'>Registrarse</Link>
                </Button>
            </SheetClose>

            <SheetClose asChild>
                <Button asChild >
                    <Link to='/shop/cart'>
                        <IoCartOutline />Carrito
                    </Link>
                </Button>
            </SheetClose>

        </>
    )
}