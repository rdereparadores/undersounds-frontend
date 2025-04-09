import { z } from 'zod'
import { Button } from '../ui/button'
import { MdEditSquare } from "react-icons/md"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { IoAddCircleOutline } from "react-icons/io5"
import { DatePicker } from '../ui/new-date-picker'
import { useEffect, useRef, useState } from 'react'
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
import { CheckoutAddressCountrySelector } from '../checkout/CheckoutAddressCountrySelector'
import { UserInfoProps } from '@/hooks/user/userContext'
import { useUser } from '@/hooks/user/useUser'
import { toast } from 'sonner'

const maxBirthdate = new Date(Date.now())
maxBirthdate.setFullYear(maxBirthdate.getFullYear() - 16);

const profileFormSchema = z.object({
    name: z.string().max(30, 'Máximo 30 caracteres').optional(),
    surName: z.string().max(50, 'Máximo 50 caracteres').optional(),
    birthDate: z.date().max(maxBirthdate, 'Debes tener al menos 16 años').optional()

})

export const UserDashboardProfileForm = ({ namePlaceholder, surNamePlaceholder, birthDatePlaceholder }: { namePlaceholder: string, surNamePlaceholder: string, birthDatePlaceholder: Date }) => {
    const user = useUser()
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            surName: '',
            birthDate: new Date(birthDatePlaceholder)
        }

    })

    const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
        console.log(values)
        const result = await user.updateUserInfo(values)
        if (result) {
            toast.success('Perfil actualizado correctamente')
        } else {
            toast.error('Error al actualizar el perfil')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 grow'>
                <div className='flex justify-between flex-wrap grow gap-4'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem className='grow'>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder={namePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField control={form.control} name='surName' render={({ field }) => (
                        <FormItem className='grow'>
                            <FormLabel>Apellidos</FormLabel>
                            <FormControl>
                                <Input placeholder={surNamePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <FormField control={form.control} name='birthDate' render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <DatePicker date={field.value} setDate={field.onChange} />
                        <FormMessage />
                    </FormItem>
                )}
                />

                <Button type='submit'>Guardar cambios</Button>
            </form>

        </Form>
    )
}

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

export const UserDashboardProfileAddressesCardItem = () => {
    return (
        <Card className='w-fit'>
            <CardHeader>
                <div className='flex gap-2 items-center'>
                    <CardTitle>Casa</CardTitle>
                    <Badge variant='outline'>Predeterminada</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p>Iván Ruiz López</p>
                <p>Avenida de las Delicias, 2</p>
                <p>Colegio Mayor Antonio Franco</p>
                <p>10004 Cáceres</p>
                <p>666666666</p>
            </CardContent>
            <CardFooter className='gap-2 flex flex-wrap'>
                <Button className='grow'>Eliminar</Button>
                <Button className='grow' variant='outline'>Establecer como predeterminada</Button>
            </CardFooter>
        </Card>
    )
}

export const AddAdress = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <IoAddCircleOutline className='w-32 h-32' color='gray' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold">Nueva dirección</DialogTitle>
                    <DialogDescription>* Campo obligatorio</DialogDescription>
                </DialogHeader>

                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-name'>* Nombre</Label>
                            <Input id='address-name' placeholder='Nombre' />
                        </div>

                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-surname'>* Apellidos</Label>
                            <Input id='address-surname' placeholder='Apellidos' />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className='flex gap-2 grow flex-col'>
                            <CheckoutAddressCountrySelector />
                        </div>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-phone'>* Teléfono</Label>
                            <Input id='address-phone' placeholder='Teléfono' />
                        </div>
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-address1'>* Dirección 1</Label>
                        <Input id="address-address1" placeholder="Dirección 1" />
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-address2'>Dirección 2</Label>
                        <Input id="address-address2" placeholder="Dirección 2" />
                    </div>

                    <div className='flex gap-2'>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-province'>* Provincia</Label>
                            <Input id="address-province" placeholder="Provincia" />
                        </div>
                        <div className='flex gap-2 grow flex-col'>
                            <Label htmlFor='address-city'>* Ciudad</Label>
                            <Input id='address-city' placeholder='Ciudad' />
                        </div>
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-observations'>Observaciones</Label>
                        <Input id="address-observations" placeholder="Observaciones" />
                    </div>

                    <div className='flex gap-2 flex-col'>
                        <Label htmlFor='address-alias'>* Alias</Label>
                        <Input id="address-alias" placeholder="Alias" />
                    </div>
                </div>

                <DialogFooter className='gap-y-2'>
                    <DialogClose asChild>
                        <Button variant='outline'>Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button>Guardar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const UserDashboardProfileAddressesAddCard = () => {
    return (
        <Card className='w-80 min-h-64'>
            <CardContent className='p-0 flex flex-col items-center justify-center h-full'>
                <AddAdress></AddAdress>
                <CardDescription className='text-md'>Añadir dirección</CardDescription>
            </CardContent>
        </Card>
    )
}

export const UserDashboardProfileAddressesCard = () => {
    return (
        <div className='flex gap-4 flex-wrap w-full justify-center'>
            <UserDashboardProfileAddressesCardItem />
            <UserDashboardProfileAddressesCardItem />
            <UserDashboardProfileAddressesCardItem />
            <UserDashboardProfileAddressesCardItem />
            <UserDashboardProfileAddressesAddCard />
        </div>
    )
}


export const EditUserAvatar = () => {
    const user = useUser()
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onButtonClick = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    }

    const onSubmit = async () => {
        if (inputFile.current && inputFile.current.files?.length) {
            const file = inputFile.current.files[0]
            await user.updateUserProfileImage(file)
        } else {
            console.error("No se seleccionó ningún archivo");
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='absolute right-2 bottom-2 w-8 h-8'><MdEditSquare /></Button>
            </DialogTrigger>
            <DialogContent className='w-fit pt-12'>
                <DialogHeader>
                    <DialogTitle>¿Ya te has aburrido de tu foto de perfil?</DialogTitle>
                    <DialogDescription>Actualízala o deja que la IA lo haga por ti.</DialogDescription>
                </DialogHeader>
                <div className='flex justify-center items-center gap-4'>
                    <Input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                    <img src='https://picsum.photos/200' className='w-32 h-32 rounded-full hover:cursor-pointer' />
                    <div className='flex flex-col gap-2 items-center grow'>
                        <Button className='w-full' variant='outline'>Generar con IA</Button>
                        <Button onClick={onButtonClick} className='w-full' variant='outline'>Subir desde el dispositivo</Button>
                    </div>
                </div>
                <DialogFooter className='gap-2'>
                    <DialogClose asChild>
                        <Button className='w-full' onClick={onSubmit}>Confirmar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
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

    if (userInfo === undefined) return <></>

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Perfil</h1>

            <div className="flex flex-col gap-4 flex-wrap">
                <h2 className="text-2xl">Información personal</h2>

                <div className='flex gap-4 items-top justify-center flex-wrap'>
                    <div className='relative w-fit h-fit'>
                        {!imgLoaded && <Skeleton className='w-32 h-32 rounded-full' />}
                        <img src={userInfo.imgUrl} className={`w-32 h-32 rounded-full ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                        <EditUserAvatar></EditUserAvatar>
                    </div>
                    <UserDashboardProfileForm namePlaceholder={userInfo.name} surNamePlaceholder={userInfo.surName} birthDatePlaceholder={userInfo.birthDate} />
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