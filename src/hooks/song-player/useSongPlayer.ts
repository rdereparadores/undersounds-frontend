import { useContext } from "react"
import { SongPlayerContext } from "./SongPlayerContext"

export const useSongPlayer = () => {
    return useContext(SongPlayerContext)
}