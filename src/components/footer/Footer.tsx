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

export function Footer() {
    return (
            <Card className="bg-black border-black rounded-none outline-black flex flex-col flex-wrap gap-5 mt-4">
                <CardHeader>
                    <CardTitle></CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="flex gap-36 flex-wrap justify-center">
                    <div>
                        <p className="text-white w-fit">Logo UnderSounds</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-gray-400 font-mono font-semibold">EMPRESA</p>
                        <p className="hover:underline text-white text-start">Acerca de</p>
                        <p className="hover:underline text-white text-start">Empleo</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-gray-400 font-mono font-semibold">COMUNIDAD</p>
                         <Link to="auth/signup"><p className="hover:underline text-white text-start">UnderSounds para artistas</p></Link>
                        <p  className="hover:underline text-white text-start">Desarrolladores</p>
                        <p  className="hover:underline text-white text-start">Publicidad</p>
                        <p  className="hover:underline text-white text-start">Inversores</p>
                        <p  className="hover:underline text-white text-start">Proveedores</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-gray-400 font-mono font-semibold">ENLACES ÚTILES</p>
                        <p className="hover:underline text-white text-start">Asistencia</p>
                        <p className="hover:underline text-white text-start">Privacidad</p>
                        <p className="hover:underline text-white text-start">Copyright</p>
                        <p className="hover:underline text-white text-start">Terminos de uso</p>
                        <p className="hover:underline text-white text-start">Preferencias de cookies</p>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-center flex-wrap">
                    <Button variant="link" className="text-gray-400 text-sm">Legal</Button>
                    <Button variant="link" className="text-gray-400 text-sm">Centro de seguridad y privacidad</Button>
                    <Button variant="link" className="text-gray-400 text-sm">Politica de privacidad</Button>
                    <Button variant="link" className="text-gray-400 text-sm">Configuración de cookies</Button>
                    <Button variant="link" className="text-gray-400 text-sm">Accesibilidad</Button>
                </CardFooter>
            </Card>
    )
}