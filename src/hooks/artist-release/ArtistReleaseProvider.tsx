import { toast } from "sonner"
import { ArtistReleaseContext, PublishAlbumProps, PublishSongProps, UpdateSongProps } from "./ArtistReleaseContext"
import { api } from "@/lib/api"

export const ArtistReleaseProvider = ({ children }: { children: React.ReactNode }) => {

    const generateAiCover = async (prompt: string) => {
        try {
            const result = await api.post('/api/ai/image', {prompt})
            return result.data.data.imgUrl
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
            return result.data.data.id
        } catch {
            toast.error('Error al publicar la canción')
            return null
        }
    }

    const publishAlbum = async(data: PublishAlbumProps) => {
        try {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('priceCd', data.priceCd.toString())
            formData.append('priceDigital', data.priceDigital.toString())
            formData.append('priceVinyl', data.priceVinyl.toString())
            formData.append('priceCassette', data.priceCassette.toString())
            formData.append('albumImage', data.albumImage)
            formData.append('songs', data.songs.join(','))

            const result = await api.post('/api/artist/release/album', formData)
            if (result.data.error) {
                toast.error('Error al publicar el álbum')
                return null
            }
            toast.success('Álbum publicado con éxito')
            return result.data.data.id
        } catch {
            toast.error('Error al publicar el álbum')
            return null
        }
    }


    const updateSong = async (data: UpdateSongProps) => {
        try {
            console.log(data)
            const formData = new FormData()

            if(data.title) formData.append('title', data.title)
            if(data.description) formData.append('description', data.description)
            if(data.priceCd) formData.append('priceCd', data.priceCd.toString())
            if(data.priceDigital) formData.append('priceDigital', data.priceDigital.toString())
            if(data.priceVinyl) formData.append('priceVinyl', data.priceVinyl.toString())
            if(data.priceCassette) formData.append('priceCassette', data.priceCassette.toString())
            if(data.collaborators) formData.append('collaborators', data.collaborators.join(','))
            if(data.genres) formData.append('genres', data.genres.join(','))
            if(data.img) formData.append('img', data.img)
            if(data.song) formData.append('song', data.song)
            formData.append('songId',data.songId)

            console.log(formData.get('songId'))

            const result = await api.post('/api/artist/songs/update', formData)
            if (result.data.error) {
                toast.error('Error al actualizar la canción')
                return null
            }
            toast.success('Canción actualizada con éxito')
            return result.data.data.id
        } catch {
            toast.error('Error al actualizar la canción')
            return null
        }
    }

    const updateAlbum = async(data: PublishAlbumProps) => {
        try {
            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('priceCd', data.priceCd.toString())
            formData.append('priceDigital', data.priceDigital.toString())
            formData.append('priceVinyl', data.priceVinyl.toString())
            formData.append('priceCassette', data.priceCassette.toString())
            formData.append('albumImage', data.albumImage)
            formData.append('songs', data.songs.join(','))

            const result = await api.post('/api/artist/release/album', formData)
            if (result.data.error) {
                toast.error('Error al actualizar el álbum')
                return null
            }
            toast.success('Álbum actualizado con éxito')
            return result.data.data.id
        } catch {
            toast.error('Error al actualizar el álbum')
            return null
        }
    }

    return (
        <ArtistReleaseContext.Provider value={{ generateAiCover, publishSong, publishAlbum, updateSong, updateAlbum}}>
            {children}
        </ArtistReleaseContext.Provider>
    )
}