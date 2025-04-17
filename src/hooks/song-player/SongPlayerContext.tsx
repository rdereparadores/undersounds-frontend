import { createContext } from "react";
import { AudioPlayer } from "react-use-audio-player";

export interface SongPlayerContextProps {
    player: undefined | AudioPlayer,
    name: string,
    artist: string,
    imgUrl: string,
    hidden: boolean,
    setName: (name: string) => void,
    setArtist: (artist: string) => void,
    setImgUrl: (imgUrl: string) => void,
    setHidden: (hidden: boolean) => void,
    play: (songUrl: string) => void
}

export const SongPlayerContext = createContext<SongPlayerContextProps>({
    player: undefined,
    name: '',
    artist: '',
    imgUrl: '',
    hidden: true,
    setName: () => {},
    setArtist: () => {},
    setImgUrl: () => {},
    setHidden: () => {},
    play: () => {}
})