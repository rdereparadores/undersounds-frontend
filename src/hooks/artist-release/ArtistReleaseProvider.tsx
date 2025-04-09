import axios from "axios"
import { ArtistReleaseContext, PublishSongProps } from "./ArtistReleaseContext"

export const ArtistReleaseProvider = ({ children }: { children: React.ReactNode }) => {

    const generateAiCover = async (prompt: string) => {
        try {
            const result = await axios.post('/api/ai/cover', {prompt})
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
            formData.append('song', data.song)
            formData.append('priceDigital', data.priceDigital.toString())
            formData.append('priceCd', data.priceCd.toString())
            formData.append('priceVinyl', data.priceVinyl.toString())
            formData.append('priceCassette', data.priceCassette.toString())
            data.collaborators.forEach(collaborator => formData.append('collaborators', collaborator))
            data.genres.forEach(genre => formData.append('genres', genre))
            if (data.img) {
                formData.append('img', data.img)
            }
            if (data.imgUrl) {
                formData.append('imgUrl', data.imgUrl)
            }
            const result = await fetch('/api/artist/publish/song', {
                method: 'POST',
                body: formData
            }).then(res => res.json())
            
            console.log(result)
            return result.json().id
        } catch (_err) {
            console.log(_err)
            return null
        }
    }

    return (
        <ArtistReleaseContext.Provider value={{ generateAiCover, publishSong }}>
            {children}
        </ArtistReleaseContext.Provider>
    )
}