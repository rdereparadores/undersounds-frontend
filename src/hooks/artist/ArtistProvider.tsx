import { api } from '@/lib/api'
import { ArtistContext, UpdateArtistInfoProps } from './ArtistContext'
import { toast } from 'sonner'

export const ArtistProvider = ({ children }: { children: React.ReactNode }) => {

    const getArtistInfo = async () => {
        try {
            const result = await api.get('/api/artist/profile')
            console.log(result.data.data)
            return result.data.data
        } catch {
            return undefined
        }
    }

    const updateArtistInfo = async (data: Partial<UpdateArtistInfoProps>) => {
        try {
            if (data.artistName || data.artistUsername) {
                console.log(data.artistUsername)
                const result = await api.post('/api/artist/profile/update', {
                    artistName: data.artistName,
                    artistUsername: data.artistUsername
                })
                if (result.data.error) {
                    toast.error('Error al actualizar el nombre o el nombre de usuario')
                    return false
                }
            }

            if (data.artistProfileImg) {
                const formData = new FormData()
                formData.append('artistProfileImg', data.artistProfileImg)
                const result = await api.post('/api/artist/profile/update/profileImage', formData)
                if (result.data.error) {
                    toast.error('Error al actualizar la imagen de perfil')
                    return false
                }
            }

            if (data.artistBannerImg) {
                const formData = new FormData()
                formData.append('artistBannerImg', data.artistBannerImg)
                const result = await api.post('/api/artist/profile/update/bannerImage', formData)
                if (result.data.error) {
                    toast.error('Error al actualizar la imagen del banner')
                    return false
                }
            }

            toast.success('Perfil actualizado con éxito')
            return true
        } catch {
            return false
        }
    }

    const getArtistSongs = async () => {
        try {
            const result = await api.get('/api/artist/songs')
            return result.data.data
        } catch {
            return undefined
        }
    }

    const getArtistAlbums = async () => {
        try {
            const result = await api.get('/api/artist/albums')
            return result.data.data
        } catch {
            return undefined
        }
    }

    const getSongHistoryArray = async (songId: string) => {
        try {
            const result = await api.post('/api/artist/songs/history', { songId })
            return result.data.data
        } catch {
            return null
        }
    }

    const getAlbumHistoryArray = async (albumId: string) => {
        try {
            const result = await api.post('/api/artist/albums/history', { albumId })
            return result.data.data
        } catch {
            return null
        }
    }

    return (
        <ArtistContext.Provider value={{ getArtistInfo, updateArtistInfo, getArtistSongs, getArtistAlbums, getSongHistoryArray, getAlbumHistoryArray }}>
            {children}
        </ArtistContext.Provider>
    )
}