import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useEffect } from 'react'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Link } from 'react-router'

const newSongSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    img: z.any()
        .refine((file) => file?.[0], {
            message: "Debes subir una portada",
        })
        .refine((file) => file?.[0]?.type?.startsWith("image/"), {
            message: "La portada debe tener formato JPG o PNG",
        }),

    song: z.any()
        .refine((file) => file?.[0], {
            message: "Debes subir el archivo de audio",
        })
        .refine((file) => file?.[0]?.type?.startsWith("audio/"), {
            message: "El archivo de audio debe ser de los siguientes tipos: MP3, FLAC, WAV",
        }),

    priceDigital: z.preprocess((val) => Number(val), z.number().min(0)),
    priceVinyl: z.preprocess((val) => Number(val), z.number().min(0)),
    priceCassette: z.preprocess((val) => Number(val), z.number().min(0)),
    priceCd: z.preprocess((val) => Number(val), z.number().min(0))
})

type NewSongFormData = z.infer<typeof newSongSchema>

export const ArtistDashboardReleasesNewSong = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewSongFormData>({
        resolver: zodResolver(newSongSchema)
    })

    const onSubmit = async (data: NewSongFormData) => {
        console.log(data.song[0])
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <Breadcrumb className='mt-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to='/artist/dashboard/releases'>Publicaciones</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        Nueva canción
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-medium">Nueva canción</h1>


            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-4 mb-4'>
                    <div className='flex flex-col gap-4 max-w-32'>
                        <img src='https://picsum.photos/200' className="rounded-md w-32 h-32" />
                        <div className='flex flex-col gap-2'>
                            <Button onClick={() => document.getElementById('upload-cover')?.click()}>Subir portada</Button>
                            <Button variant='outline'>Generar con IA</Button>
                        </div>
                        <Input id='upload-cover' type='file' {...register('img')} className='hidden' />
                    </div>
                    <div className='flex flex-col gap-4 grow'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='title'>Título</Label>
                            <Input {...register(('title'))} />
                        </div>

                        <div className='flex flex-col gap-2 grow'>
                            <Label htmlFor='description' aria-multiline='true'>Descripción</Label>
                            <Textarea className='grow' {...register('description')} />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 mb-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='song'>Fichero de audio</Label>
                        <Input type='file' {...register('song')} />
                    </div>
                </div>

                <div className='flex gap-4'>
                    <Card className='grow'>
                        <CardHeader>
                            <CardTitle>Precios</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='priceDigital'>Digital</Label>
                                    <Input step='0.01' type='number' {...register('priceDigital')} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='priceCd'>CD</Label>
                                    <Input step='0.01' type='number' {...register('priceCd')} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='priceVinyl'>Vinilo</Label>
                                    <Input step='0.01' type='number' {...register('priceVinyl')} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='priceCasette'>Cassette</Label>
                                    <Input step='0.01' type='number' {...register('priceCassette')} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className='flex flex-col gap-4 grow'>
                        <Card className='grow'>
                            <CardHeader>
                                <div className='flex gap-2 justify-between'>
                                    <CardTitle>Colaboradores</CardTitle>
                                    <Button>+ Añadir colaborador</Button>
                                </div>
                            </CardHeader>

                            <CardContent>

                            </CardContent>
                        </Card>
                        <Card className='grow'>
                            <CardHeader>
                                <CardTitle>Géneros</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex gap-2'>
                                    <Badge>Pop</Badge>
                                    <Badge>Rock</Badge>
                                    <Badge>Blues</Badge>
                                </div>
                                <Separator className='my-4' />
                                <div className='flex flex-col gap-2'>
                                    <div className='flex gap-4 justify-between items-center'>
                                        <p>Rock</p>
                                        <Button>Añadir</Button>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className='flex justify-end mt-4'>
                    <Button type='submit'>Publicar</Button>
                </div>
            </form>
        </div>
    )
}