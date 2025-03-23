import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { RiNeteaseCloudMusicFill } from "react-icons/ri"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { Checkbox } from "@/components/ui/checkbox"

import { Link, useNavigate } from 'react-router'
import { ChangeEvent, FormEvent, useState } from "react"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/auth/useAuth"
import { toast } from "sonner"

export const SignUpCard = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [termsAgreed, setTermsAgreed] = useState(false)
    const [userRole, setUserRole] = useState('user')
    const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(false)
    const [input, setInput] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        artistName: ''
    })

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(input)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (input.password !== input.confirmPassword) {
            return toast.error('Las contraseñas no coinciden')
        }

        setSignUpButtonDisabled(true)
        if (userRole == 'user') {
            const result = await auth.signUpUser({
                userName: input.userName,
                email: input.email,
                password: input.password
            })
            if (result) {
                await auth.logIn({ email: input.email, password: input.password })
                navigate('/user/dashboard')
            } else {
                setSignUpButtonDisabled(false)
            }
        } else if (userRole == 'artist') {
            const result = await auth.signUpArtist({
                userName: input.userName,
                email: input.email,
                password: input.password,
                name: input.name,
                surname: input.surname,
                artistName: input.artistName
            })
            if (result) {
                await auth.logIn({ email: input.email, password: input.password })
                navigate('/artist/dashboard')
            } else {
                setSignUpButtonDisabled(false)
            }
        }
    }

    return (
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
                <form onSubmit={onSubmit}>
                    <div className='flex flex-col gap-4'>
                        <Tabs onValueChange={(value) => { setUserRole(value) }} defaultValue='user'>
                            <TabsList className='grid w-full grid-cols-2'>
                                <TabsTrigger value='user'>Usuario</TabsTrigger>
                                <TabsTrigger value='artist'>Artista</TabsTrigger>
                            </TabsList>
                            {/*<TabsContent value='user'></TabsContent>*/}
                            <TabsContent value='artist' className='gap-4 flex flex-col'>
                                <div className='flex flex-row gap-2 pt-4'>
                                    <div className='grid gap-2'>
                                        <Label htmlFor='name'>Nombre</Label>
                                        <Input required name='name' id='name' type='text' placeholder='John' onChange={onInputChange} />
                                    </div>

                                    <div className='grid gap-2'>
                                        <Label htmlFor='surname'>Apellidos</Label>
                                        <Input required name='surname' id='surname' type='text' placeholder='Doe' onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className='grid gap-2'>
                                    <Label htmlFor='userName'>Nombre artístico</Label>
                                    <Input required name='artistName' id='artistName' type='text' placeholder='matysitoflowbakan0' onChange={onInputChange} />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className='grid gap-2'>
                            <Label htmlFor='userName'>Nombre de usuario</Label>
                            <Input required name='userName' id='userName' type='text' placeholder='johndoe' onChange={onInputChange} />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='email'>Correo electrónico</Label>
                            <Input required name='email' type='email' id='email' placeholder='email@example.com' onChange={onInputChange} />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='password'>Contraseña</Label>
                            <Input required name='password' type='password' id='password' placeholder='securepassword123' onChange={onInputChange} />
                        </div>

                        <div className='grid gap-2'>
                            <Label htmlFor='confirmPassword'>Confirma tu contraseña</Label>
                            <Input required name='confirmPassword' type='password' id='confirmPassword' placeholder='securepassword123' onChange={onInputChange} />
                        </div>

                        <div className='flex items-center space-x-2'>
                            <Checkbox onCheckedChange={(checked: boolean) => { setTermsAgreed(checked) }} id='terms' />
                            <Label htmlFor='terms'>Acepto los términos y condiciones</Label>
                        </div>

                        <Button type='submit' disabled={!termsAgreed || signUpButtonDisabled} className="transition">Registrarse</Button>
                    </div>
                </form>

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
}