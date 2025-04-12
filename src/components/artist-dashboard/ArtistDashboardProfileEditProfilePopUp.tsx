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
import { Button } from "../ui/button"
import { MdEditSquare } from "react-icons/md"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useEffect, useState } from "react"
import { FaUpload } from "react-icons/fa"
import { useArtist } from "@/hooks/artist/useArtist"

const profileFormSchema = z.object({
    artistName: z.string().max(30, 'Máximo 30 caracteres').optional(),
    artistUsername: z.string().max(30, 'Máximo 30 caracteres').optional(),
    artistProfileImg: z.any().refine((file) => file?.length > 0 ? file?.[0]?.type?.startsWith('image/') : true, {
        message: 'El formato debe ser JPG o PNG'
    }),
    artistBannerImg: z.any().refine((file) => file?.length > 0 ? file?.[0]?.type?.startsWith('image/') : true, {
        message: 'El formato debe ser JPG o PNG'
    })
})

interface ArtistDashboardProfileEditProfilePopUpProps {
    profileImgPlaceholder: string,
    bannerImgPlaceholder: string
}

export function ArtistDashboardProfileEditProfilePopUp({ profileImgPlaceholder, bannerImgPlaceholder }: ArtistDashboardProfileEditProfilePopUpProps) {
    const artist = useArtist()
    const [previewProfileImg, setPreviewProfileImg] = useState<string>(profileImgPlaceholder)
    const [previewBannerImg, setPreviewBannerImg] = useState<string>(bannerImgPlaceholder)
    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            artistUsername: '',
            artistName: ''
        }
    })

    const profileImg = form.watch('artistProfileImg')
    const bannerImg = form.watch('artistBannerImg')

    useEffect(() => {
        if (profileImg && profileImg[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewProfileImg(e.target?.result as string)
            }
            reader.readAsDataURL(profileImg[0])
        }
    }, [profileImg])

    useEffect(() => {
        if (bannerImg && bannerImg[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviewBannerImg(e.target?.result as string)
            }
            reader.readAsDataURL(bannerImg[0])
        }
    }, [bannerImg])

    const onSubmit = async (values: z.infer<typeof profileFormSchema>) => {
        const result = await artist.updateArtistInfo({
            ...values,
            artistProfileImg: values.artistProfileImg[0],
            artistBannerImg: values.artistBannerImg[0]
        })
        if (result) setTimeout(() => { window.location.reload() }, 1000)
    }

    const handleBannerImgUpload = () => {
        document.getElementById('banner-img-upload')?.click()
    }

    const handleProfileImgUpload = () => {
        document.getElementById('profile-img-upload')?.click()
    }

    return (
        <Dialog>
            <DialogTrigger className="absolute top-2 right-2">
                <Button variant='default'><MdEditSquare />Editar perfil</Button>
            </DialogTrigger>
            <DialogContent className="w-fit">
                <DialogHeader>
                    <DialogTitle>Editar perfil</DialogTitle>
                    <DialogDescription>Personaliza tu perfil público</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid max-w-sm gap-1.5 w-full">
                            <div className="relative">
                                <Input type='file' id='banner-img-upload' className="hidden" accept='image/*' {...form.register('artistBannerImg')} />
                                <img src={previewBannerImg} className="w-96 h-32 object-cover rounded-md" />
                                <Button type='button' variant='outline' onClick={handleBannerImgUpload} className="w-10 h-10 absolute bottom-2 left-2"><FaUpload /></Button>
                            </div>

                            <div className="relative">
                                <Input type='file' id='profile-img-upload' className="hidden" accept='image/*' {...form.register('artistProfileImg')} />
                                <img src={previewProfileImg} className="w-32 h-32 object-cover rounded-full" />
                                <Button type='button' variant='outline' onClick={handleProfileImgUpload} className="w-10 h-10 absolute bottom-2 left-2"><FaUpload /></Button>
                            </div>

                            <FormField control={form.control} name='artistName' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre artístico</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name='artistUsername' render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type='button'>Cancelar</Button>
                                </DialogClose>
                                <Button type='submit'>Confirmar</Button>
                            </DialogFooter>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}  