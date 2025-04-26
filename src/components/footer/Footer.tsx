import { Link } from "react-router";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { GiMusicSpell } from "react-icons/gi";

export function Footer() {
    return (
            <Card className="bg-black border-black rounded-none outline-black flex flex-col flex-wrap gap-5 mt-4">
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="flex sm:gap-32 sm:flex-row flex-col gap-14 flex-wrap sm:justify-center items-center">
                    <div>
                        <p className="text-white w-fit"><GiMusicSpell className='size-32'/></p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-400 font-mono font-semibold">COMUNIDAD</p>
                        <Link to="auth/signup"><p className="hover:underline text-white text-start">Registrarse</p></Link>
                        <Link to="auth/signin"><p className="hover:underline text-white text-start">Iniciar sesión</p></Link>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <p className="text-gray-400 font-mono font-semibold">ENLACES ÚTILES</p>
                        <Link to="/"><p className="hover:underline text-white text-start">Inicio</p></Link>
                        <Link to="/shop"><p className="hover:underline text-white text-start">Tienda</p></Link>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-center flex-wrap">
                    <Link to="/legal"><Button variant="link" className="text-gray-400 text-sm">Terminos y condiciones</Button></Link>
                    <Link to="/legal"><Button variant="link" className="text-gray-400 text-sm">Centro de seguridad y privacidad</Button></Link>
                    <Link to="/legal"><Button variant="link" className="text-gray-400 text-sm">Politica de privacidad</Button></Link>
                    <Link to="/legal"><Button variant="link" className="text-gray-400 text-sm">Configuración de cookies</Button></Link>
                    <Link to="/legal"><Button variant="link" className="text-gray-400 text-sm">Accesibilidad</Button></Link>
                </CardFooter>
            </Card>
    )
}