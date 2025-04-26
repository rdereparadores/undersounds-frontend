import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
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
import { toast } from 'sonner'
import { useAuth } from '@/hooks/auth/useAuth'


export const UserDashboardProfileEmailUpdateCard = ({ emailPlaceholder }: { emailPlaceholder: string }) => {
    const [otpValue, setOtpValue] = useState<string>('')
    const [newEmail, setNewEmail] = useState<string>('')
    const user = useUser()
    const auth = useAuth()

    const handleSubmit = async () => {
        const result = await user.updateEmail(newEmail, otpValue)
        if (!result) {
            toast.error('Error al actualizar el correo electrónico')
        }
        toast.success('Correo electrónico actualizado')
        setTimeout(() => window.location.reload(), 1000)
    }

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
                            <Button onClick={() => { auth.requestOtp() }}>Actualizar</Button>
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
                                    <Input onChange={(e) => setNewEmail(e.target.value)} id="email" type="email" placeholder='correo@example.com' />
                                </div>
                            </div>
                            <DialogFooter>
                                <div className='flex flex-col gap-1 items-center justify-center w-full'>
                                    <p>Escribe el código enviado a tu correo:</p>
                                    <InputOTP maxLength={6}
                                        onChange={(value) => setOtpValue(value)}>
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
                                    <Button onClick={handleSubmit} className='self-end mt-2'>Actualizar</Button>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
        </Card>
    )
}

export const UserDashboardProfilePasswordUpdateCard = () => {
    const [otpValue, setOtpValue] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const user = useUser()
    const auth = useAuth()

    const handleSubmit = async () => {
        const result = await user.updatePassword(newPassword, otpValue)
        if (!result) {
            toast.error('Error al actualizar la contraseña')
        }
        toast.success('Contraseña actualizada')
        setTimeout(() => window.location.reload(), 1000)
    }

    return (
        <Card className='grow'>
            <CardHeader>
                <div className='flex gap-4 justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                        <CardTitle>Contraseña</CardTitle>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => { auth.requestOtp() }}>Actualizar</Button>
                        </DialogTrigger>
                        <DialogContent className='w-fit min-w-[25%]'>
                            <DialogHeader>
                                <DialogTitle>Cambiar contraseña</DialogTitle>
                                <DialogDescription>
                                    Cambia tu contraseña
                                </DialogDescription>
                            </DialogHeader>
                            <div className='flex flex-col justify-center gap-4'>
                                <div>
                                    <Label htmlFor="password">Nueva contraseña</Label>
                                    <Input onChange={(e) => setNewPassword(e.target.value)} id="password" type="password" />
                                </div>
                            </div>
                            <DialogFooter>
                                <div className='flex flex-col gap-1 items-center justify-center w-full'>
                                    <p>Escribe el código enviado a tu correo:</p>
                                    <InputOTP maxLength={6}
                                        onChange={(value) => setOtpValue(value)}>
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
                                    <Button onClick={handleSubmit} className='self-end mt-2'>Actualizar</Button>
                                </div>
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