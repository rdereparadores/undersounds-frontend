import {
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Link } from 'react-router'

export const NavBarGuestSectionMobile = () => {
    return (
        <>
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
        </>
    )
}