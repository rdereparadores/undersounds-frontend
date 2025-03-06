import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {FaFacebookF, FaGoogle} from "react-icons/fa"
import {RiNeteaseCloudMusicFill} from "react-icons/ri";

function LogInCard() {
    return (
        <Card className='w-[400px]'>
            <CardHeader>
                <div className='flex flex-row w-full items-center justify-center'>
                    <RiNeteaseCloudMusicFill className='size-32'/>
                </div>
                <CardTitle className='text-2xl'>Iniciar sesión</CardTitle>
                <CardDescription>Inicia sesión en tu cuenta de UnderSounds</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Correo electrónico</Label>
                        <Input type='email' id='email' placeholder='user@example.com'/>
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Contraseña</Label>
                        <div className='flex flex-col gap-0.5'>
                            <Input id='password' type='password'/>
                            <a href='#' className='ml-auto text-sm hover:underline'>¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>

                    <Button>Iniciar sesión</Button>
                    {/*<Button variant='outline'>Registrarse</Button>*/}

                </div>

                <div className='flex flex-row items-center gap-4 my-3'>
                    <Separator className='flex-1'/>
                    <span>o bien</span>
                    <Separator className='flex-1'/>
                </div>

                <div className='flex flex-col gap-3'>
                    <Button className='w-full'>
                        <FaGoogle /> Iniciar sesión con Google
                    </Button>
                    <Button className='w-full'>
                        <FaFacebookF /> Iniciar sesión con Facebook
                    </Button>
                </div>
            </CardContent>

            <CardFooter>
                <div className='flex flex-row items-center gap-2 w-full'>
                    <span className='text-sm'>¿Aún sin cuenta?</span>
                    <Button className='flex-grow' variant='outline'>Regístrate ahora</Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export { LogInCard }