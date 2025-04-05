import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { RiNeteaseCloudMusicFill } from "react-icons/ri"
import { Link, useNavigate, useSearchParams } from 'react-router'
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth } from "@/hooks/auth/useAuth"
import { useForm } from "react-hook-form"
import { ForgotPassword } from "./ForgotPassword"

const signInSchema = z.object({
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string({ message: 'Contraseña incorrecta' })
})
type SignInFormData = z.infer<typeof signInSchema>

export const SignInCard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema)
    })
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [logInButtonDisabled, setLogInButtonDisabled] = useState(false)
    const auth = useAuth()

    useEffect(() => {
        if (searchParams.get('redirectTo')) {
            toast.info('Inicia sesión primero')
        }
    }, [searchParams])

    useEffect(() => {
        if (errors.email) {
            toast(errors.email.message)
            return
        }
        if (errors.password) {
            toast(errors.password.message)
            return
        }
    }, [errors])

    const onSubmit = async (data: SignInFormData) => {

        setLogInButtonDisabled(true)
        const result = await auth.logIn({
            email: data.email,
            password: data.password
        })

        if (result === true) {
            const redirectTo = searchParams.get('redirectTo')
            navigate(redirectTo ? redirectTo : '/user/dashboard')
        } else {
            setLogInButtonDisabled(false)
            toast.error('Email o contraseña incorrectos')
        }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Correo electrónico</Label>
                            <Input type='email' {...register('email')} />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='password'>Contraseña</Label>
                            <div className='flex flex-col gap-0.5'>
                                <Input type='password' {...register('password')} />
                                <ForgotPassword></ForgotPassword>
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
                    <Button onClick={auth.signInGoogle} className='w-full'>
                        <FaGoogle /> Iniciar sesión con Google
                    </Button>
                    <Button onClick={auth.signInFacebook} className='w-full'>
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