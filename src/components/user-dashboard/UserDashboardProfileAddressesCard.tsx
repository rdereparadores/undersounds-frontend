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

const addAddressFormSchema = z.object({
    name: z.string(),
    surName: z.string(),
    country: z.string(),
    phone: z.string(),
    address: z.string(),
    address2: z.string().optional(),
    province: z.string(),
    city: z.string(),
    observations: z.string().optional(),
    alias: z.string()
})

export const UserDashboardProfileAddressesAddCard = () => {
    const form = useForm<z.infer<typeof addAddressFormSchema>>({
        resolver: zodResolver(addAddressFormSchema)
    })

    const onSubmit = (data: z.infer<typeof addAddressFormSchema>) => {
        console.log(data)
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