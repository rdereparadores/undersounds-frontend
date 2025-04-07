import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"
import { RiNeteaseCloudMusicFill } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FaFacebookF, FaGoogle } from "react-icons/fa"
import { Link } from 'react-router'
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { SignUpUserForm } from "./SignUpUserForm"
import { SignUpArtistForm } from "./SignUpArtistForm"
import { useAuth } from "@/hooks/auth/useAuth"

export const SignUpCard = () => {
    const auth = useAuth()
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
                <Tabs defaultValue='user'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='user'>Usuario</TabsTrigger>
                        <TabsTrigger value='artist'>Artista</TabsTrigger>
                    </TabsList>
                    <TabsContent value='user' className='gap-4 flex flex-col'>
                        <SignUpUserForm />
                    </TabsContent>
                    <TabsContent value='artist' className='gap-4 flex flex-col'>
                        <SignUpArtistForm />
                    </TabsContent>
                </Tabs>

                <div className='flex flex-row items-center gap-4 my-3'>
                    <Separator className='flex-1' />
                    <span>o bien</span>
                    <Separator className='flex-1' />
                </div>

                <div className='flex flex-col gap-3'>
                    <Button onClick={auth.signInGoogle} className='w-full'>
                        <FaGoogle /> Registrarse con Google
                    </Button>
                    <Button onClick={auth.signInFacebook} className='w-full'>
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