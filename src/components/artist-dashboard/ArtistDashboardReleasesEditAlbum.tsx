import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useArtistRelease } from '@/hooks/artist-release/useArtistRelease'
import { Skeleton } from '../ui/skeleton'
import { TableFeaturedContent } from './ArtistDashboardProfileTableFeaturedContent'
import { ScrollArea } from '../ui/scroll-area'
import { AlbumProps } from '@/hooks/product/ProductContext'

const newAlbumSchema = z.object({
    albumId: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    albumImage: z.any()
        .optional()
        .refine((file) => file.length > 0 ? file?.[0]?.type?.startsWith("image/") : true, {
            message: "La portada debe tener formato JPG o PNG",
        }),
    priceDigital: z.preprocess((val) => Number(val), z.number().optional()),
    priceVinyl: z.preprocess((val) => Number(val), z.number().optional()),
    priceCassette: z.preprocess((val) => Number(val), z.number().optional()),
    priceCd: z.preprocess((val) => Number(val), z.number().optional())
})

type NewAlbumFormData = z.infer<typeof newAlbumSchema>

export const ArtistDashboardReleasesEditAlbum = (album: AlbumProps) => {
    const artistRelease = useArtistRelease()
    const [firstRender, setFirstRender] = useState<boolean>(true)
    const [albumId, setAlbumId] = useState<string>('')
    const [selectedSongsList, setSelectedSongsList] = useState<string[]>([])
    const [previewImgLoaded, setPreviewImgLoaded] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    const [generatingImage, setGeneratingImage] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<NewAlbumFormData>({
        resolver: zodResolver(newAlbumSchema)
    })

    const albumImg = watch('albumImage')
    const title = watch('title')

    useEffect(() => {
        if (firstRender) {
            setValue('albumId', album._id)
            setAlbumId(album._id)
            setFirstRender(false)
            setPreviewImg(album.imgUrl)
            setPreviewImgLoaded(true)
            const songs = album.trackList.map((t) => t._id).filter( t => t !== undefined)
            setSelectedSongsList(songs)
            return
        }

        const fetchDatosVersion = async () => {

            if (album._id === undefined) return

            const songs = album.trackList.map((t) => t._id).filter( t => t !== undefined)
            setSelectedSongsList(songs)

            setValue('albumId', album._id)
            setValue('title', album.title)
            setValue('description', album.description)
            setValue('priceCassette', album.pricing.cassette)
            setValue('priceCd', album.pricing.cd)
            setValue('priceDigital', album.pricing.digital)
            setValue('priceVinyl', album.pricing.vinyl)

            if (album?.imgUrl) {
                const response = await fetch(album.imgUrl)
                const blob = await response.blob()
                const file = new File([blob], 'newVersionImage.png', { type: blob.type })
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(file)
                setValue('albumImage', dataTransfer.files)
                setPreviewImg(album.imgUrl)
                setPreviewImgLoaded(true)
            }

            //TODO arreglar que ya este subido el archivo de audio
            /*if (result?.songDir) {
                const response = await fetch(result.songDir)
                const blob = await response.blob()
                const file = new File([blob], 'audio.mp3', { type: blob.type })
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(file)
                console.log(dataTransfer.files)
                setValue('song', dataTransfer.files)
            }*/

        };
        fetchDatosVersion()
    }, [album, setValue])


    const onSubmit = async (data: NewAlbumFormData) => {
        const result = await artistRelease.updateAlbum({
            ...data,
            albumId,
            songArray: selectedSongsList,
            albumImage: data.albumImage[0],
        })
        if (result != null) window.location.reload()
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
        if (title !== undefined) {
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
    }

    return (
        <div>
            <h1 className="text-3xl font-medium">Editar álbum</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-4 mb-4'>
                    <div className='flex flex-col gap-4 max-w-32'>
                        {!previewImgLoaded && <Skeleton className="rounded-md w-32 h-32" />}
                        <img src={previewImg} className={`rounded-md w-32 h-32 ${previewImgLoaded ? '' : 'hidden'}`} onLoad={() => { setPreviewImgLoaded(true) }} />
                        {(errors.albumImage) && <span className='text-sm text-red-600'>Sube una imagen</span>}
                        <div className='flex flex-col gap-2'>
                            <Button onClick={handleImageUpload} type='button'>Subir portada</Button>
                            <Button disabled={generatingImage} variant='outline' onClick={handleImageAIGeneration} type='button'>Generar con IA</Button>
                        </div>
                        <Input id='upload-cover' type='file' accept='image/*' {...register('albumImage')} className='hidden' />
                    </div>
                    <div className='flex flex-col gap-4 grow'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='title'>Título</Label>
                            <Input {...register(('title'))} type='text' placeholder={album.title}/>
                            {errors.title && <span className='text-sm text-red-600'>El título no puede estar vacío</span>}
                        </div>

                        <div className='flex flex-col gap-2 grow'>
                            <Label htmlFor='description' aria-multiline='true'>Descripción</Label>
                            <Textarea className='grow' {...register('description')} placeholder={album.description}/>
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
                                        <Input step='0.01' type='number' {...register('priceDigital')} placeholder={album.pricing.digital.toString()}/>
                                        {errors.priceDigital && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='priceCd'>CD</Label>
                                        <Input step='0.01' type='number' {...register('priceCd')} placeholder={album.pricing.cd.toString()}/>
                                        {errors.priceCd && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='priceVinyl'>Vinilo</Label>
                                        <Input step='0.01' type='number' {...register('priceVinyl')} placeholder={album.pricing.vinyl.toString()}/>
                                        {errors.priceVinyl && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='priceCasette'>Cassette</Label>
                                        <Input step='0.01' type='number' {...register('priceCassette')} placeholder={album.pricing.cassette.toString()}/>
                                        {errors.priceCassette && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className='flex justify-end mt-4'>
                    <Button type='submit'>Actualizar</Button>
                </div>
            </form>
        </div>
    )
}