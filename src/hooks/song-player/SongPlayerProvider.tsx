import { useAudioPlayer } from "react-use-audio-player"
import { SongPlayerContext } from "./SongPlayerContext"
import { useState } from "react"


export const SongPlayerProvider = ({ children }: { children: React.ReactNode }) => {
    const player = useAudioPlayer()
    const [ name, setName ] = useState<string>('Canción')
    const [ artist, setArtist ] = useState<string>('Artista')
    const [ imgUrl, setImgUrl ] = useState<string>('https://picsum.photos/200')
    const [ hidden, setHidden ] = useState<boolean>(true)

    const play = (songUrl: string) => {
        player.load(songUrl, undefined)
        setHidden(false)
    }

    return (
        <SongPlayerContext.Provider value={{ player, name, setName, imgUrl, setImgUrl, artist, setArtist, hidden, setHidden, play }}>
            { children }
        </SongPlayerContext.Provider>
    )
}