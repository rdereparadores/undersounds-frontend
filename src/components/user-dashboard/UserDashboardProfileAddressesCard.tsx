import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { IoAddCircleOutline } from "react-icons/io5"
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
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { CountrySelector } from '../common/CountrySelector'
import { useUser } from '@/hooks/user/useUser'
import { toast } from 'sonner'
import { AddressProps } from '@/hooks/user/UserContext'
import { useEffect, useState } from 'react'

const addAddressFormSchema = z.object({
    name: z.string(),
    surName: z.string(),
    country: z.string(),
    phone: z.string().refine(phone => /^[0-9]{7,15}$/.test(phone), 'Teléfono inválido'),
    address: z.string(),
    address2: z.string().optional(),
    province: z.string(),
    city: z.string(),
    observations: z.string().optional(),
    alias: z.string()
})

export const UserDashboardProfileAddressesAddCard = () => {
    const user = useUser()
    const form = useForm<z.infer<typeof addAddressFormSchema>>({
        resolver: zodResolver(addAddressFormSchema)
    })

    const onSubmit = async (data: z.infer<typeof addAddressFormSchema>) => {
        const result = await user.addAddress({
            ...data,
            phone: Number(data.phone)
        })
        if (result) {
            toast.success('Dirección creada con éxito')
        } else {
            toast.error('Error al crear la dirección')
        }
        setTimeout(() => window.location.reload(), 1000)
    }

    return (
        <Card className='w-80 min-h-64'>
            <CardContent className='p-0 flex flex-col items-center justify-center h-full'>
                <Dialog>
                    <DialogTrigger>
                        <IoAddCircleOutline className='w-32 h-32' color='gray' />
                        <CardDescription className='text-md'>Añadir dirección</CardDescription>
                    </DialogTrigger>
                    <DialogContent className='max-h-screen overflow-y-auto'>
                        <DialogHeader>
                            <DialogTitle className="font-bold">Nueva dirección</DialogTitle>
                            <DialogDescription>* Campo obligatorio</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className='flex flex-col gap-2'>
                                    <FormField control={form.control} name='alias' render={({ field }) => (
                                        <FormItem className='grow'>
                                            <FormLabel>* Alias</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className='flex gap-2 flex-wrap'>
                                        <FormField control={form.control} name='name' render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormLabel>* Nombre</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name='surName' render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormLabel>* Apellidos</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <div className='flex gap-2 flex-wrap'>
                                        <FormField control={form.control} name='country' render={() => (
                                            <FormItem className='grow'>
                                                <FormLabel>* País</FormLabel>
                                                <FormControl>
                                                    <CountrySelector setValue={(newVal) => { form.setValue('country', newVal) }} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name='phone' render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormLabel>* Teléfono</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <FormField control={form.control} name='address' render={({ field }) => (
                                        <FormItem className='grow'>
                                            <FormLabel>* Dirección 1</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name='address2' render={({ field }) => (
                                        <FormItem className='grow'>
                                            <FormLabel>Dirección 2</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <div className='flex-wrap flex gap-2'>
                                        <FormField control={form.control} name='province' render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormLabel>* Provincia</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name='city' render={({ field }) => (
                                            <FormItem className='grow'>
                                                <FormLabel>* Ciudad</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <FormField control={form.control} name='observations' render={({ field }) => (
                                        <FormItem className='grow'>
                                            <FormLabel>* Observaciones</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <DialogFooter className='mt-4'>
                                    <DialogClose asChild>
                                        <Button variant='outline'>Cancelar</Button>
                                    </DialogClose>
                                    <Button type='submit'>Guardar</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}

export const UserDashboardProfileAddressesCardItem = ({address}: {address: AddressProps}) => {
    const user = useUser()

    const handleAddressRemove = async () => {
        const result = await user.removeAddress(address._id!)
        if (!result) {
            toast.error('Error al eliminar la dirección')
            return
        }
        toast.success('Dirección eliminada')
        setTimeout(() => {window.location.reload()}, 1000)
    }

    const handleAddressSetDefault = async () => {
        const result = await user.setAddressAsDefault(address._id!)
        if (!result) {
            toast.error('Error al establecer la dirección como predeterminada')
            return
        }
        toast.success('Dirección establecida como predeterminada')
        setTimeout(() => {window.location.reload()}, 1000)
    }

    return (
        <Card className='w-fit sm:min-w-96'>
            <CardHeader>
                <div className='flex gap-2 items-center min-h-6'>
                    <CardTitle>{address.alias}</CardTitle>
                    {address.default && <Badge className='m-0' variant='outline'>Predeterminada</Badge>}
                </div>
            </CardHeader>
            <CardContent>
                <p>{address.name} {address.surName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.city} {address.province}</p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
            </CardContent>
            <CardFooter className='gap-2 flex flex-wrap'>
                <Button onClick={handleAddressRemove} className='grow'>Eliminar</Button>
                { !address.default &&
                <Button onClick={handleAddressSetDefault} className='grow' variant='outline'>Establecer como predeterminada</Button> }
            </CardFooter>
        </Card>
    )
}

export const UserDashboardProfileAddressesCard = () => {
    const user = useUser()
    const [addresses, setAddresses] = useState<AddressProps[] | undefined>(undefined)

    useEffect(() => {
        user.getAddresses()
        .then(addresses => setAddresses(addresses))
    }, [])

    if (addresses === undefined) return <></>

    return (
        <div className='flex gap-4 flex-wrap w-full justify-center'>
            {addresses.map((address, index) => (
                <UserDashboardProfileAddressesCardItem key={index} address={address} />
            ))}
            <UserDashboardProfileAddressesAddCard />
        </div>
    )
}