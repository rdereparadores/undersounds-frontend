import { useAudioPlayer } from "react-use-audio-player"
import { MusicPlayerContext, MusicPlayerProps } from "./MusicPlayerContext"
import { useState } from "react"
import { useProduct } from "../product/useProduct"
import { api } from "@/lib/api"


export const MusicPlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const player = useAudioPlayer()
    const product = useProduct()
    const [playerProps, setPlayerProps] = useState<MusicPlayerProps>({
        hidden: true,
        imgUrl: '',
        title: '',
        author: {
            _id: '',
            artistName: ''
        },
        collaborators: []
    })

    const play = async (songId: string) => {
        const song = await product.getSongInfo(songId)

        const result = await api.get(`/api/song/play/${songId}`, {responseType: 'blob'})
        const audioBlob = new Blob([result.data], { type: 'audio/mpeg' })
        const audioUrl = URL.createObjectURL(audioBlob)
        player.load(audioUrl, { format: 'mp3', autoplay: true })
        
        setPlayerProps({
            hidden: false,
            imgUrl: song!.imgUrl,
            title: song!.title,
            author: {
                _id: song!.author._id,
                artistName: song!.author.artistName
            },
            collaborators: song!.collaborators.map(c => ({
                _id: c._id,
                artistName: c.artistName
            }))
        })
    }

    const quit = () => {
        setPlayerProps({ ...playerProps!, hidden: true })
        player.stop()
    }

    return (
        <MusicPlayerContext.Provider value={{ player, play, playerProps, quit }}>
            {children}
        </MusicPlayerContext.Provider>
    )
}