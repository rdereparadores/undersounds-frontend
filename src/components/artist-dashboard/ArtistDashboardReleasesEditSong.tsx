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
import { ArtistDashboardReleasesNewSongGenreCard } from './ArtistDashboardReleasesNewSongGenreCard'
import { ArtistDashboardReleasesNewSongCollaborators } from './ArtistDashboardReleasesNewSong'
import { useProduct } from '@/hooks/product/useProduct'
import { SongProps } from '@/hooks/product/ProductContext'

const updateSongSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    img: z.any()
        .refine((file) => file.length > 0 ? file?.[0]?.type?.startsWith("image/") : true, {
            message: "La portada debe tener formato JPG o PNG",
        }),

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

type NewSongFormData = z.infer<typeof updateSongSchema>

export const ArtistDashboardReleasesEditSong = (song: SongProps) => {
    const [selectedGenreList, setSelectedGenreList] = useState<string[]>([])
    const artistRelease = useArtistRelease()
    const product = useProduct()
    const [previewImgLoaded, setPreviewImgLoaded] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    const [generatingImage, setGeneratingImage] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<NewSongFormData>({
        resolver: zodResolver(updateSongSchema)
    })

    const imgField = watch('img')
    const title = watch('title')

    useEffect(() => {
        const fetchDatosVersion = async () => {

            if(song._id === undefined) return
            //TODO arreglar los por defecto de genre
            //setSelectedGenreList(result.genres)

            setValue('id', song._id)
            setValue('title', song.title )
            setValue('description', song.description)
            setValue('priceDigital', song.pricing.digital)
            setValue('priceVinyl', song.pricing.vinyl)
            setValue('priceCassette', song.pricing.cassette)
            setValue('priceCd', song.pricing.cd)

            if (song?.imgUrl) {
                setPreviewImg(song.imgUrl)
                setPreviewImgLoaded(true)
                
                const response = await fetch(song.imgUrl)
                const blob = await response.blob()
                const file = new File([blob], 'image.png', { type: blob.type })
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(file)
                console.log(dataTransfer.files)
                setValue('img', dataTransfer.files)
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
    }, [song, setValue, product])

    const onSubmit = async (data: NewSongFormData) => {
        const result = await artistRelease.updateSong({
            ...data,
            song: data.song[0],
            img: data.img[0],
            collaborators: [],
            genres: selectedGenreList,
        })
        console.log(result)
        if(result !== null) window.location.reload()
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
        <div>
            <h1 className="text-3xl font-medium">Editar canción</h1>

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
                            <Input {...register(('title'))} defaultValue={song.title} type='text' />
                            {errors.title && <span className='text-sm text-red-600'>El título no puede estar vacío</span>}
                        </div>

                        <div className='flex flex-col gap-2 grow'>
                            <Label htmlFor='description' aria-multiline='true'>Descripción</Label>
                            <Textarea className='grow' {...register('description')} defaultValue={song.description} />
                            {errors.description && <span className='text-sm text-red-600'>La descripción no puede estar vacía</span>}
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 mb-4'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='song'>Fichero de audio</Label>
                        <Input type='file' {...register('song')}/>
                        {errors.song && <span className='text-sm text-red-600' defaultValue={song.songDir}>Debes subir un fichero de audio</span>}
                    </div>
                </div>

                <div className='flex gap-4'>
                    <div className='flex flex-col gap-4 grow'>
                        <ArtistDashboardReleasesNewSongCollaborators />
                        <Card className='grow h-fit'>
                            <CardHeader>
                                <CardTitle>Precios</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='priceDigital'>Digital</Label>
                                        <Input step='0.01' type='number' {...register('priceDigital')} defaultValue={song.pricing.digital} />
                                        {errors.priceDigital && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='priceCd'>CD</Label>
                                        <Input step='0.01' type='number' {...register('priceCd')} defaultValue={song.pricing.cd} />
                                        {errors.priceCd && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='priceVinyl'>Vinilo</Label>
                                        <Input step='0.01' type='number' {...register('priceVinyl')} defaultValue={song.pricing.vinyl} />
                                        {errors.priceVinyl && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <Label htmlFor='priceCasette'>Cassette</Label>
                                        <Input step='0.01' type='number' {...register('priceCassette')} defaultValue={song.pricing.cassette} />
                                        {errors.priceCassette && <span className='text-sm text-red-600'>El precio debe ser superior a 1</span>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <ArtistDashboardReleasesNewSongGenreCard selectedGenreList={selectedGenreList} setSelectedGenreList={setSelectedGenreList} />

                </div>
                <div className='flex justify-end mt-4'>
                    <Button type='submit'>Actualizar</Button>
                </div>
            </form>
        </div>
    )
}