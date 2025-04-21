import { useContext } from "react"
import {ArtistProfileContext} from "@/hooks/artist-profile/ArtistProfileContext.tsx";

export const useArtistProfile = () => {
    return useContext(ArtistProfileContext)
}