import { createContext } from "react"
import { AudioPlayer } from "react-use-audio-player"

export interface MusicPlayerProps {
    hidden: boolean,
    imgUrl: string,
    title: string,
    author: {
        _id: string,
        artistName: string
    },
    collaborators: {
        _id: string,
        artistName: string
    }[]
}

export interface MusicPlayerContextProps {
    player: undefined | AudioPlayer,
    playerProps: MusicPlayerProps | undefined,
    play: (songId: string) => Promise<void>,
    quit: () => void
}

export const MusicPlayerContext = createContext<MusicPlayerContextProps>({
    player: undefined,
    playerProps: undefined,
    play: async () => {},
    quit: () => {}
})