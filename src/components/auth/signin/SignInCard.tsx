import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { RiNeteaseCloudMusicFill } from "react-icons/ri"
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useState, FormEvent, ChangeEvent, useEffect } from "react"
import { toast } from "sonner"

import { useAuth } from "@/hooks/auth/useAuth"

export const SignInCard = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })
    const [logInButtonDisabled, setLogInButtonDisabled] = useState(false)
    const auth = useAuth()

    useEffect(() => {
        if (searchParams.get('redirectTo')) {
            toast.info('Inicia sesión primero')
        }
    }, [searchParams])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLogInButtonDisabled(true)
        const result = await auth.logIn({
            email: input.email,
            password: input.password
        })

        if (result) {
            const redirectTo = searchParams.get('redirectTo')
            navigate(redirectTo ? redirectTo : '/')
        } else {
            setLogInButtonDisabled(false)
            toast.error('Email o contraseña incorrectos')
        }
    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <Card className='w-[400px]'>
            <CardHeader>
                <div className='flex flex-row w-full items-center justify-center'>
                    <Link to='/'>
                        <RiNeteaseCloudMusicFill className='size-32' />
                    </Link>
                </div>
                <CardTitle className='text-2xl'>Iniciar sesión</CardTitle>
                <CardDescription>Inicia sesión en tu cuenta de UnderSounds</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit}>
                    <div className='flex flex-col gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Correo electrónico</Label>
                            <Input type='email' name='email' id='email' placeholder='user@example.com' onChange={onInputChange} />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='password'>Contraseña</Label>
                            <div className='flex flex-col gap-0.5'>
                                <Input id='password' name='password' type='password' onChange={onInputChange} />
                                <a href='#' className='ml-auto text-sm hover:underline'>¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>

                        <Button disabled={logInButtonDisabled} type='submit'>Iniciar sesión</Button>
                    </div>
                </form>

                <div className='flex flex-row items-center gap-4 my-3'>
                    <Separator className='flex-1' />
                    <span>o bien</span>
                    <Separator className='flex-1' />
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
                    <Button asChild className='flex-grow' variant='outline'>
                        <Link to='/auth/signup'>Regístrate ahora</Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}