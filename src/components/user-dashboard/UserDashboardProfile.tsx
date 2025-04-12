import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '../ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '../ui/input-otp'
import { UserInfoProps } from '@/hooks/user/UserContext'
import { useUser } from '@/hooks/user/useUser'
import { UserDashboardProfileUpdateImage } from './UserDashboardProfileUpdateImage'
import { UserDashboardProfileAddressesCard } from './UserDashboardProfileAddressesCard'
import { UserDashboardProfileUpdateForm } from './UserDashboardProfileUpdateForm'

export const UserDashboardProfileEmailUpdateCard = ({ emailPlaceholder }: { emailPlaceholder: string }) => {

    return (
        <Card className='grow'>
            <CardHeader>
                <div className='flex gap-4 justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                        <CardTitle>Correo electrónico</CardTitle>
                        <CardDescription>{emailPlaceholder}</CardDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Actualizar</Button>
                        </DialogTrigger>
                        <DialogContent className='w-fit min-w-[25%]'>
                            <DialogHeader>
                                <DialogTitle>Cambiar correo electrónico</DialogTitle>
                                <DialogDescription>
                                    Cambia tu correo electronico por otro.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex flex-col justify-center gap-4'>
                                <div>
                                    <Label htmlFor="email">Nuevo correo electrónico</Label>
                                    <Input id="newEmail" type="email" placeholder='correo@example.com'></Input>
                                    <Label htmlFor="email">Nuevo correo electrónico</Label>
                                    <Input id="newEmail" type="email" placeholder='correo@example.com'></Input>
                                </div>
                            </div>
                            <DialogFooter>
                                <VerificationPopUp></VerificationPopUp>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
        </Card>
    )
}

export const VerificationPopUp = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Continuar</Button>
            </DialogTrigger>
            <DialogContent className='w-fit'>
                <DialogHeader>
                    <DialogTitle>Verificar usuario</DialogTitle>
                    <DialogDescription>
                        Introduce el código que te hemos enviado al correo.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex justify-center'>
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <DialogFooter className='gap-2'>
                    <DialogClose asChild>
                        <Button>Volver a enviar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Verificar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const UserDashboardProfilePasswordUpdateCard = () => {
    return (
        <Card className='grow'>
            <CardHeader>
                <div className='flex gap-4 justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                        <CardTitle>Contraseña</CardTitle>
                        <CardDescription>Cambia tu contraseña</CardDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Cambiar</Button>
                        </DialogTrigger>
                        <DialogContent className='w-fit min-w-[25%]'>
                            <DialogHeader>
                                <DialogTitle>Cambiar contraseña</DialogTitle>
                                <DialogDescription>
                                    Cambia tu contraseña por otra.
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex flex-col justify-center gap-4'>
                                <div>
                                    <Label htmlFor="password">Nueva contraseña</Label>
                                    <Input id="newPassword" type="password" placeholder='Contraseña'></Input>
                                    <Label htmlFor="password">Confirmar nueva contraseña</Label>
                                    <Input id="newPassword" type="password" placeholder='Contraseña'></Input>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <VerificationPopUp></VerificationPopUp>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
        </Card>
    )
}

export const UserDashboardProfile = () => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const user = useUser()
    const [userInfo, setUserInfo] = useState<UserInfoProps | undefined>(undefined)

    useEffect(() => {
        user.getUserInfo()
            .then(user => setUserInfo(user))
    }, [])

    if (userInfo === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Perfil</h1>

            <div className="flex flex-col gap-4 flex-wrap">
                <h2 className="text-2xl">Información personal</h2>

                <div className='flex gap-4 items-top justify-center flex-wrap'>
                    <div className='relative w-fit h-fit'>
                        {!imgLoaded && <Skeleton className='w-32 h-32 rounded-full' />}
                        <img src={userInfo.imgUrl} className={`w-32 h-32 rounded-full ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                        <UserDashboardProfileUpdateImage />
                    </div>
                    <UserDashboardProfileUpdateForm namePlaceholder={userInfo.name} surNamePlaceholder={userInfo.surname} birthDatePlaceholder={userInfo.birthDate} />
                    <Separator orientation='vertical' className='hidden xl:block' />

                    <div className='flex flex-col gap-4 grow'>
                        <UserDashboardProfileEmailUpdateCard emailPlaceholder={userInfo.email} />
                        <UserDashboardProfilePasswordUpdateCard />
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 flex-wrap'>
                <h2 className='text-2xl'>Direcciones</h2>
                <UserDashboardProfileAddressesCard />
            </div>
        </div>
    )
}