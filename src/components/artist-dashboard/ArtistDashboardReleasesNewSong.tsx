import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useArtistRelease } from '@/hooks/artist-release/useArtistRelease'
import { Skeleton } from '../ui/skeleton'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const newSongSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    img: z.any()
        .refine((file) => file.length > 0 ? file?.[0]?.type?.startsWith("image/") : true, {
            message: "La portada debe tener formato JPG o PNG",
        }).optional(),

    song: z.any()
        .refine((file) => file?.[0], {
            message: "Debes subir el archivo de audio",
        })
        .refine((file) => file?.[0]?.type?.startsWith("audio/"), {
            message: "El archivo de audio debe ser de los siguientes tipos: MP3, FLAC, WAV",
        }),

    priceDigital: z.preprocess((val) => Number(val), z.number().min(1)),
    priceVinyl: z.preprocess((val) => Number(val), z.number().min(1)),
    priceCassette: z.preprocess((val) => Number(val), z.number().min(1)),
    priceCd: z.preprocess((val) => Number(val), z.number().min(1))
}).refine(data => {
    if (data.img) return data.img?.[0] !== undefined
    return false
}, {
    message: 'Sube una imagen',
    path: ['img']
})

type NewSongFormData = z.infer<typeof newSongSchema>

export const ArtistDashboardReleasesNewSongCollaborators = () => {
    return (
        <Card className='grow'>
            <CardHeader>
                <div className='flex gap-2 justify-between'>
                    <CardTitle>Colaboradores</CardTitle>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button>+ Añadir colaborador</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className='flex flex-col gap-4'>
                                <Input type='search' placeholder='@artista' />
                                <div className='flex items-center justify-between gap-2'>
                                    <p>@pito</p>
                                    <Button>+ Añadir</Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>

            <CardContent>
                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between gap-2'>
                            <div className='flex items-center gap-2'>
                                <img src='https://picsum.photos/200' className='rounded-full w-14 h-14' />
                                <p>Matysitoflowbakan0</p>
                            </div>
                            <Button variant='destructive'>Eliminar</Button>
                        </div>
                    </CardHeader>
                </Card>
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardReleasesNewSongGenres = () => {
    return (
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
                        <Button onClick={() => {}}>Añadir</Button>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export const ArtistDashboardReleasesNewSong = () => {
    const navigate = useNavigate()
    const artistRelease = useArtistRelease()
    const [previewImgLoaded, setPreviewImgLoaded] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    const [generatingImage, setGeneratingImage] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<NewSongFormData>({
        resolver: zodResolver(newSongSchema)
    })
    const imgField = watch('img')
    const title = watch('title')

    const onSubmit = async (data: NewSongFormData) => {
        const result = await artistRelease.publishSong({
            ...data,
            song: data.song[0],
            img: data.img[0],
            collaborators: [],
            genres: ['Rock']
        })

        if (result) {
            setTimeout(() => navigate('/artist/dashboard/releases'), 1000)
        }
    }

    useEffect(() => {
        if (imgField && imgField[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewImg(e.target?.result as string)
            }
            reader.readAsDataURL(imgField[0])
        }
    }, [imgField])

    const handleImageUpload = () => {
        document.getElementById('upload-cover')?.click()
    }

    const handleImageAIGeneration = async () => {
        setGeneratingImage(true)
        setPreviewImgLoaded(false)
        const result = await artistRelease.generateAiCover(title)
        if (result === null) {
            toast.error('Ocurrió un error al generar la imagen')
            setGeneratingImage(false)
            return
        }

        const response = await fetch(result)
        const blob = await response.blob()
        const file = new File([blob], 'image.png', { type: blob.type })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        setValue('img', dataTransfer.files)

        setGeneratingImage(false)
        setPreviewImgLoaded(true)
    }

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <Breadcrumb className='mt-2'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
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
                        {!previewImgLoaded && <Skeleton className="rounded-md w-32 h-32" />}
                        <img src={previewImg} className={`rounded-md w-32 h-32 ${previewImgLoaded ? '' : 'hidden'}`} onLoad={() => { setPreviewImgLoaded(true) }} />
                        {(errors.img) && <span className='text-sm text-red-600'>Sube una imagen</span>}
                        <div className='flex flex-col gap-2'>
                            <Button onClick={handleImageUpload}>Subir portada</Button>
                            <Button disabled={generatingImage} variant='outline' onClick={handleImageAIGeneration}>Generar con IA</Button>
                        </div>
                        <Input id='upload-cover' type='file' accept='image/*' {...register('img')} className='hidden' />
                    </div>
                    <div className='flex flex-col gap-4 grow'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='title'>Título</Label>
                            <Input {...register(('title'))} />
                            {errors.title && <span className='text-sm text-red-600'>El título no puede estar vacío</span>}
                        </div>

                        <div className='flex flex-col gap-2 grow'>
                            <Label htmlFor='description' aria-multiline='true'>Descripción</Label>
                            <Textarea className='grow' {...register('description')} />
                            {errors.description && <span className='text-sm text-red-600'>La descripción no puede estar vacía</span>}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 mb-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='song'>Fichero de audio</Label>
                        <Input type='file' {...register('song')} />
                        {errors.song && <span className='text-sm text-red-600'>Debes subir un fichero de audio</span>}
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
                                    {errors.priceDigital && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='priceCd'>CD</Label>
                                    <Input step='0.01' type='number' {...register('priceCd')} />
                                    {errors.priceCd && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='priceVinyl'>Vinilo</Label>
                                    <Input step='0.01' type='number' {...register('priceVinyl')} />
                                    {errors.priceVinyl && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label htmlFor='priceCasette'>Cassette</Label>
                                    <Input step='0.01' type='number' {...register('priceCassette')} />
                                    {errors.priceCassette && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className='flex flex-col gap-4 grow'>
                        <ArtistDashboardReleasesNewSongCollaborators />
                        <ArtistDashboardReleasesNewSongGenres />
                    </div>
                </div>
                <div className='flex justify-end mt-4'>
                    <Button type='submit'>Publicar</Button>
                </div>
            </form>
        </div>
    )
}