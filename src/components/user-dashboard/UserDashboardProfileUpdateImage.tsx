import { useUser } from "@/hooks/user/useUser"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { MdEditSquare } from "react-icons/md"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Skeleton } from "../ui/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"

const updateUserProfileImageSchema = z.object({
    img: z.any()
        .refine((file) => file.length > 0 ? file?.[0]?.type?.startsWith("image/") : true, {
            message: "La portada debe tener formato JPG o PNG",
        })
}).refine(data => {
    return data.img?.[0] !== undefined
}, {
    message: 'Sube una imagen',
    path: ['img']
})

type UserProfileImageForm = z.infer<typeof updateUserProfileImageSchema>

export const UserDashboardProfileUpdateImage = () => {
    const user = useUser()
    const [previewImg, setPreviewImg] = useState<string | undefined>(undefined)
    const [generatingImage, setGeneratingImage] = useState<boolean>(false)
    const [previewImgLoaded, setPreviewImgLoaded] = useState<boolean>(false)
    const [aiPrompt, setAiPrompt] = useState<string>('')
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<UserProfileImageForm>({
        resolver: zodResolver(updateUserProfileImageSchema)
    })
    const imgField = watch('img')

    useEffect(() => {
        user.getUserInfo()
            .then(user => {
                setPreviewImg(user.imgUrl)
                setPreviewImgLoaded(true)
            })
    }, [])

    useEffect(() => {
        if (errors.img) {
            toast.error('Sube una imagen')
        }
    }, [errors])

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
        document.getElementById('profile-img-upload')?.click()
    }

    const handleImageAIGeneration = async () => {
        setGeneratingImage(true)
        setPreviewImgLoaded(false)
        const result = await user.generateUserProfileImageAI(aiPrompt)
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

    const onSubmit = async (data: UserProfileImageForm) => {
        console.log(console.log(data))
        const result = await user.updateUserProfileImage(data.img[0])
        if (result) {
            toast.success('Imagen actualizada correctamente')
            setTimeout(() => window.location.reload(), 1000)
        } else {
            toast.error('Ocurrió un error al subir la imagen')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='absolute right-2 bottom-2 w-8 h-8'><MdEditSquare /></Button>
            </DialogTrigger>
            <DialogContent className='w-fit pt-12'>
                <DialogHeader>
                    <DialogTitle>¿Ya te has aburrido de tu foto de perfil?</DialogTitle>
                    <DialogDescription>Actualízala o deja que la IA lo haga por ti.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-wrap justify-center items-center gap-4 mb-4'>
                        <Input type='file' id='profile-img-upload' accept='image/*' {...register('img')} style={{ display: 'none' }} />
                        {!previewImgLoaded && <Skeleton className='w-32 h-32 rounded-full' />}
                        <img src={previewImg} className={`w-32 h-32 rounded-full ${previewImgLoaded ? '' : 'hidden'}`} />
                        <div className='flex flex-col gap-2 items-center grow'>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button type='button' disabled={generatingImage} className='w-full' variant='outline'>Generar con IA</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex gap-2">
                                        <Input onChange={(e) => setAiPrompt(e.target.value)} placeholder="Escribe el prompt" />
                                        <PopoverClose asChild>
                                            <Button onClick={handleImageAIGeneration}>Generar</Button>
                                        </PopoverClose>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <div className="flex flex-col gap-2">
                                <Button type='button' onClick={handleImageUpload} className='w-full' variant='outline'>Subir desde el dispositivo</Button>
                                <p className="text-xs">400x400px recomendado<br /> Formatos admitidos: JPG, PNG</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className='gap-2'>
                        <DialogClose asChild>
                            <Button type='submit' className='w-full'>Confirmar</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}