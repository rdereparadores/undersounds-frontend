import { Button } from "../ui/button";
import { Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle, } from "../ui/card";

export function Footer(){
    return(
        <Card className="bg-black rounded-none flex flex-col gap-5">
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex gap-32 flex-wrap justify-center">
                <p className="text-white">Logo UnderSounds</p>
                <div className="flex flex-col gap-4  justify-start">
                    <Button variant="link" className="text-gray-400  font-mono font-semibold">EMPRESA</Button>
                    <Button variant="link" className="text-white text-start">Acerca de</Button>
                    <Button variant="link" className="text-white text-start">Empleo</Button>
                </div>

                <div className="flex flex-col gap-4 justify-start">
                    <Button variant="link" className="text-gray-400 font-mono font-semibold">COMUNIDAD</Button>
                    <Button variant="link" className="text-white text-start">UnderSounds para artistas</Button>
                    <Button variant="link" className="text-white text-start">Desarrolladores</Button>
                    <Button variant="link" className="text-white text-start">Publicidad</Button>
                    <Button variant="link" className="text-white text-start">Inversores</Button>
                    <Button variant="link" className="text-white text-start">Proveedores</Button>
                </div>

                <div className="flex flex-col gap-4 justify-start">
                    <Button variant="link" className="text-gray-400 font-mono font-semibold">ENLACES ÚTILES</Button>
                    <Button variant="link" className="text-white text-start">Asistencia</Button>
                    <Button variant="link" className="text-white text-start">Privacidad</Button>
                    <Button variant="link" className="text-white text-start">Copyright</Button>
                    <Button variant="link" className="text-white text-start">Terminos de uso</Button>
                    <Button variant="link" className="text-white text-start">Preferencias de cookies</Button>
                </div>

            </CardContent>
            <CardFooter className="flex justify-center">
                <Button variant="link" className="text-gray-400 text-sm">Legal</Button>
                <Button variant="link" className="text-gray-400 text-sm">Centro de seguridad y privacidad</Button>
                <Button variant="link" className="text-gray-400 text-sm">Politica de privacidad</Button>
                <Button variant="link" className="text-gray-400 text-sm">Configuración de cookies</Button>
                <Button variant="link" className="text-gray-400 text-sm">Accesibilidad</Button>
            </CardFooter>
        </Card>
    )
}