import { useAudioPlayer } from "react-use-audio-player"
import { MusicPlayerContext, MusicPlayerProps } from "./MusicPlayerContext"
import { useState } from "react"
import { useProduct } from "../product/useProduct"
import { api } from "@/lib/api"
import { toast } from "sonner"


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

    const download = async (songId: string) => {
        const result = await api.get(`/api/song/play/${songId}`, {responseType: 'blob'})
        const disposition = result.headers['content-disposition']
        const filename = disposition.match(/filename="(.+)"/)[1]
        const url = window.URL.createObjectURL(new Blob([result.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
        toast.info('Descarga iniciada')
    }

    const quit = () => {
        setPlayerProps({ ...playerProps!, hidden: true })
        player.stop()
    }

    return (
        <MusicPlayerContext.Provider value={{ player, play, playerProps, quit, download }}>
            {children}
        </MusicPlayerContext.Provider>
    )
}