import { toast } from "sonner"
import { ArtistReleaseContext, PublishSongProps } from "./ArtistReleaseContext"
import { api } from "@/lib/api"

export const ArtistReleaseProvider = ({ children }: { children: React.ReactNode }) => {

    const generateAiCover = async (prompt: string) => {
        try {
            const result = await api.post('/api/ai/cover', {prompt})
            return result.data.msg.img_url
        } catch (_err) {
            console.log(_err)
            return null
        }
    }

    const publishSong = async (data: PublishSongProps) => {
        try {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('priceCd', data.priceCd.toString())
            formData.append('priceDigital', data.priceDigital.toString())
            formData.append('priceVinyl', data.priceVinyl.toString())
            formData.append('priceCassette', data.priceCassette.toString())
            formData.append('collaborators', data.collaborators.join(','))
            formData.append('genres', data.genres.join(','))
            formData.append('img', data.img)
            formData.append('song', data.song)

            const result = await api.post('/api/artist/release/song', formData)
            if (result.data.error) {
                toast.error('Error al publicar la canción')
                return null
            }
            toast.success('Canción publicada con éxito')
            return result.data._id
        } catch {
            toast.error('Error al publicar la canción')
            return null
        }
    }

    return (
        <ArtistReleaseContext.Provider value={{ generateAiCover, publishSong }}>
            {children}
        </ArtistReleaseContext.Provider>
    )
}