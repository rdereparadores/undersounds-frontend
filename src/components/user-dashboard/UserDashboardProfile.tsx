import { z } from 'zod'
import { Button } from '../ui/button'
import { MdEditSquare } from "react-icons/md"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { es } from 'date-fns/locale'
import { Separator } from '../ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { IoAddCircleOutline } from "react-icons/io5"

const maxBirthdate = new Date(Date.now())
maxBirthdate.setFullYear(maxBirthdate.getFullYear() - 16);

const profileFormSchema = z.object({
    name: z.string().max(30).optional(),
    surname: z.string().max(50).optional(),
    birthdate: z.date().max(maxBirthdate).optional()

})

export const UserDashboardProfileForm = () => {

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            surname: '',
            birthdate: new Date('2004-09-10')
        }

    })

    const onSubmit = (values: z.infer<typeof profileFormSchema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 grow'>
                <div className='flex justify-between flex-wrap grow gap-4'>
                    <FormField control={form.control} name='name' render={({ field }) => (
                        <FormItem className='grow'>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder='Juan' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField control={form.control} name='surname' render={({ field }) => (
                        <FormItem className='grow'>
                            <FormLabel>Apellidos</FormLabel>
                            <FormControl>
                                <Input placeholder='Doe Doe' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <FormField control={form.control} name='birthdate' render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                        <FormLabel>Fecha de nacimiento</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {format(field.value!, "PPP", { locale: es })}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    locale={es}
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
                />

                <Button type='submit'>Guardar cambios</Button>
            </form>

        </Form>
    )
}

export const UserDashboardProfileEmailUpdateCard = () => {

    return (
        <Card className='grow'>
            <CardHeader>
                <div className='flex gap-4 justify-between items-center'>
                    <div className='flex flex-col gap-1'>
                        <CardTitle>Correo electrónico</CardTitle>
                        <CardDescription>pepe@gmail.com</CardDescription>
                    </div>
                    <Button>Actualizar</Button>
                </div>
            </CardHeader>
        </Card>
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
                    <Button>Cambiar</Button>
                </div>
            </CardHeader>
        </Card>
    )
}

export const UserDashboardProfileAddressesCardItem = () => {
    return (
        <Card className='w-96'>
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
            <CardFooter className='gap-2'>
                <Button>Eliminar</Button>
                <Button variant='outline'>Establecer como predeterminada</Button>
            </CardFooter>
        </Card>
    )
}

export const UserDashboardProfileAddressesAddCard = () => {
    return (
        <Card className='w-96 min-h-64'>
            <CardContent className='p-0 flex flex-col items-center justify-center h-full'>
                <IoAddCircleOutline className='w-32 h-32' color='gray' />
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

export const UserDashboardProfile = () => {

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Perfil</h1>

            <div className="flex flex-col gap-4 flex-wrap">
                <h2 className="text-2xl">Información personal</h2>

                <div className='flex gap-4 items-top justify-center flex-wrap'>
                    <div className='relative w-fit h-fit'>
                        <img src='https://picsum.photos/200' className='w-32 h-32 rounded-full' />
                        <Button className='absolute right-2 bottom-2 w-8 h-8'><MdEditSquare /></Button>
                    </div>
                    <UserDashboardProfileForm />
                    <Separator orientation='vertical' className='hidden xl:block' />

                    <div className='flex flex-col gap-4 grow'>
                        <UserDashboardProfileEmailUpdateCard />
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