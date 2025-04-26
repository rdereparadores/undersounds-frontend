import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { useArtistRelease } from '@/hooks/artist-release/useArtistRelease'
import { Skeleton } from '../ui/skeleton'
import { TableFeaturedContent } from './ArtistDashboardProfileTableFeaturedContent'
import { ScrollArea } from '../ui/scroll-area'

const newAlbumSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    albumImage: z.any()
        .refine((file) => file.length > 0 ? file?.[0]?.type?.startsWith("image/") : true, {
            message: "La portada debe tener formato JPG o PNG",
        }),
    priceDigital: z.preprocess((val) => Number(val), z.number().min(1)),
    priceVinyl: z.preprocess((val) => Number(val), z.number().min(1)),
    priceCassette: z.preprocess((val) => Number(val), z.number().min(1)),
    priceCd: z.preprocess((val) => Number(val), z.number().min(1))
}).refine(data => {
    if (data.albumImage) return data.albumImage?.[0] !== undefined
    return false
}, {
    message: 'Sube una imagen',
    path: ['albumImage']
})

type NewAlbumFormData = z.infer<typeof newAlbumSchema>

export const ArtistDashboardReleasesNewAlbum = () => {
    //const [selectedGenreList, setSelectedGenreList] = useState<string[]>([])
    const [selectedSongsList, setSelectedSongsList] = useState<string[]>([])
    const navigate = useNavigate()
    const artistRelease = useArtistRelease()
    const [previewImgLoaded, setPreviewImgLoaded] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    const [generatingImage, setGeneratingImage] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<NewAlbumFormData>({
        resolver: zodResolver(newAlbumSchema)
    })
    const albumImg = watch('albumImage')
    const title = watch('title')

    const onSubmit = async (data: NewAlbumFormData) => {
        const result = await artistRelease.publishAlbum({
            ...data,
            songs: selectedSongsList,
            albumImage: data.albumImage[0],
        })

        if (result != null) {
            setTimeout(() => navigate('/artist/dashboard/releases'), 1000)
        }
    }

    useEffect(() => {
        if (albumImg && albumImg[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewImg(e.target?.result as string)
            }
            reader.readAsDataURL(albumImg[0])
        }
    }, [albumImg])

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
        const file = new File([blob], 'albumImage.png', { type: blob.type })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        setValue('albumImage', dataTransfer.files)

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
                        Nuevo álbum
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-3xl font-medium">Nuevo álbum</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-4 mb-4'>
                    <div className='flex flex-col gap-4 max-w-32'>
                        {!previewImgLoaded && <Skeleton className="rounded-md w-32 h-32" />}
                        <img src={previewImg} className={`rounded-md w-32 h-32 ${previewImgLoaded ? '' : 'hidden'}`} onLoad={() => { setPreviewImgLoaded(true) }} />
                        {(errors.albumImage) && <span className='text-sm text-red-600'>Sube una imagen</span>}
                        <div className='flex flex-col gap-2'>
                            <Button onClick={handleImageUpload}>Subir portada</Button>
                            <Button disabled={generatingImage} variant='outline' onClick={handleImageAIGeneration}>Generar con IA</Button>
                        </div>
                        <Input id='upload-cover' type='file' accept='image/*' {...register('albumImage')} className='hidden' />
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
                        <Label htmlFor='songs'>Elegir canciones</Label>
                        <ScrollArea className="h-72 w-[100%] rounded-md border">
                            <TableFeaturedContent selectedSongsList={selectedSongsList} setSelectedSongsList={setSelectedSongsList} />
                        </ScrollArea>
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 grow'>
                        <Card className='grow h-fit'>
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
                    </div>

                    {/*<ArtistDashboardReleasesNewSongGenreCard selectedGenreList={selectedGenreList} setSelectedGenreList={setSelectedGenreList} />*/}

                </div>
                <div className='flex justify-end mt-4'>
                    <Button type='submit'>Publicar</Button>
                </div>
            </form>
        </div>
    )
}