import { Button } from "../ui/button"
import { Link } from 'react-router'

export const NavBarGuestSection = () => (
    <>
        <Button asChild variant='outline'>
            <Link to='/auth/signin'>Iniciar sesión</Link>
        </Button>
        <Button asChild>
            <Link to='/auth/signup'>Registrarse</Link>
        </Button>
    </>
)