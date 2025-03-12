import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { RiNeteaseCloudMusicFill } from "react-icons/ri"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaFacebookF, FaGoogle } from "react-icons/fa"

import { Link } from 'react-router'

export const SignUpCard = () => (
    <Card className='w-[400px]'>
        <CardHeader>
            <div className='flex flex-row w-full items-center justify-center'>
                <Link to='/'>
                    <RiNeteaseCloudMusicFill className='size-28' />
                </Link>
            </div>
            <CardTitle className='text-2xl'>Registro</CardTitle>
            <CardDescription>Regístrate hoy en UnderSounds</CardDescription>
        </CardHeader>
        <CardContent>
            <div className='flex flex-col gap-4'>
                {/* Input para Nombre y Apellidos */}
                {/*
                    <div className='flex flex-row gap-2'>
                        <div className='grid gap-2'>
                            <Label htmlFor='name'>Nombre</Label>
                            <Input id='name' placeholder='John' />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='surname'>Apellidos</Label>
                            <Input id='surname' placeholder='Doe' />
                        </div>
                    </div>
                    */}

                <div className='grid gap-2'>
                    <Label htmlFor='username'>Nombre de usuario</Label>
                    <div className='grid'>
                        <Input id='username' placeholder='johndoe' />
                    </div>
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='email'>Correo electrónico</Label>
                    <Input type='email' id='email' placeholder='email@example.com' />
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='password'>Contraseña</Label>
                    <Input type='password' id='password' placeholder='securepassword123' />
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='confirmPassword'>Confirma tu contraseña</Label>
                    <Input type='password' id='confirmPassword' placeholder='securepassword123' />
                </div>

                <Button>Registrarse</Button>
            </div>

            <div className='flex flex-row items-center gap-4 my-3'>
                <Separator className='flex-1' />
                <span>o bien</span>
                <Separator className='flex-1' />
            </div>

            <div className='flex flex-col gap-3'>
                <Button className='w-full'>
                    <FaGoogle /> Registrarse con Google
                </Button>
                <Button className='w-full'>
                    <FaFacebookF /> Registrarse con Facebook
                </Button>
            </div>
        </CardContent>

        <CardFooter>
            <div className='flex flex-row items-center gap-2 w-full'>
                <span className='text-sm'>¿Ya tienes cuenta?</span>
                <Button asChild className='flex-grow' variant='outline'>
                    <Link to='/auth/signin'>Iniciar sesión</Link>
                </Button>
            </div>
        </CardFooter>
    </Card>
)