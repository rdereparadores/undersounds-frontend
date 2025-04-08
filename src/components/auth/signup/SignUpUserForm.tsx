import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/new-date-picker'
import { useAuth } from '@/hooks/auth/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpUserSchema = z.object({
    name: z.string(),
    surName: z.string(),
    userName: z.string(),
    birthDate: z.date(),
    email: z.string().email({ message: 'Email inválido' }),
    password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    confirmPassword: z.string(),
    terms: z.literal(true, {
        errorMap: () => ({ message: 'Debes aceptar los términos y condiciones' })
    })
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden'
})

type SignUpUserData = z.infer<typeof signUpUserSchema>

export const SignUpUserForm = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignUpUserData>({
        resolver: zodResolver(signUpUserSchema)
    })
    const auth = useAuth()
    const [date, setDate] = useState(new Date())
    const [signUpButtonDisabled, setSignUpButtonDisabled] = useState(false)

    useEffect(() => {
        Object.keys(errors).forEach((field: string) => {
            const errorField = field as keyof typeof errors
            if (errors[errorField]) {
                toast.error(errors[errorField]?.message)
            }
        })
    }, [errors])

    useEffect(() => {
        setValue('birthDate', date)
    }, [date, setValue])

    const onSubmit = async (data: SignUpUserData) => {
        setSignUpButtonDisabled(true)

        const result = await auth.signUpUser(data)
        if (result) {
            toast.success('Registrado con éxito')
            navigate('/auth/signin')
        } else {
            setSignUpButtonDisabled(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 mt-2'>
                <div className='flex flex-row gap-2'>
                    <div className='grid gap-2'>
                        <Label htmlFor='name'>Nombre</Label>
                        <Input type='text' placeholder='John' {...register('name')} />
                    </div>

                    <div className='grid gap-2'>
                        <Label htmlFor='surname'>Apellidos</Label>
                        <Input type='text' placeholder='Doe' {...register('surName')} />
                    </div>
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='userName'>Nombre de usuario</Label>
                    <Input type='text' placeholder='@usuario' {...register('userName')} />
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor=''>Fecha de nacimiento</Label>
                    <DatePicker date={date} setDate={(date?: Date) => { setDate(date!) }} />
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='email'>Correo electrónico</Label>
                    <Input type='email' placeholder='email@example.com' {...register('email')} />
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='password'>Contraseña</Label>
                    <Input type='password' placeholder='securepassword123' {...register('password')} />
                </div>

                <div className='grid gap-2'>
                    <Label htmlFor='confirmPassword'>Confirma tu contraseña</Label>
                    <Input type='password' placeholder='securepassword123' {...register('confirmPassword')} />
                </div>

                <div className='flex items-center space-x-2'>
                    <Checkbox {...register('terms')} onCheckedChange={(checked: boolean) => { if (checked) setValue('terms', checked) }} />
                    <Label htmlFor='terms'>Acepto los términos y condiciones</Label>
                </div>

                <Button type='submit' disabled={signUpButtonDisabled}>Registrarse</Button>
            </div>
        </form>
    )
}