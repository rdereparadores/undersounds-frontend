import { z } from 'zod'
import { Button } from '../ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { DatePicker } from '../ui/new-date-picker'
import { useUser } from '@/hooks/user/useUser'
import { toast } from 'sonner'

const maxBirthdate = new Date(Date.now())
maxBirthdate.setFullYear(maxBirthdate.getFullYear() - 16);

const profileFormSchema = z.object({
    name: z.string().max(30, 'Máximo 30 caracteres').optional(),
    surname: z.string().max(50, 'Máximo 50 caracteres').optional(),
    birthDate: z.date().max(maxBirthdate, 'Debes tener al menos 16 años').optional()

})

export const UserDashboardProfileUpdateForm = ({ namePlaceholder, surNamePlaceholder, birthDatePlaceholder }: { namePlaceholder: string, surNamePlaceholder: string, birthDatePlaceholder: Date }) => {
    const user = useUser()
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            surname: '',
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

                    <FormField control={form.control} name='surname' render={({ field }) => (
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