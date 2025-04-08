import axios from "axios"
import { ArtistReleaseContext } from "./ArtistReleaseContext"

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

    return (
        <ArtistReleaseContext.Provider value={{ generateAiCover }}>
            {children}
        </ArtistReleaseContext.Provider>
    )
}