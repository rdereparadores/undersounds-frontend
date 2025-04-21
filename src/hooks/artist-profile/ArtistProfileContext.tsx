import { createContext } from "react"
import { ShopItem } from "../shop/ShopContext";

export interface ArtistProfileItem extends ShopItem {
    plays?: number
}

export interface ArtistProfileProps {
    artist: {
        _id: string,
        artistName: string,
        artistUsername: string,
        artistBannerUrl: string,
        artistImgUrl: string,
        followers: number
    },
    topSongs: ArtistProfileItem[],
    featuredRelease: ArtistProfileItem | undefined,
    albums: ArtistProfileItem[],
    songs: ArtistProfileItem[]
}

export interface ArtistProfileContextProps {
    getArtistProfile: (artistId: string) => Promise<ArtistProfileProps>
}

export const ArtistProfileContext = createContext<ArtistProfileContextProps>({
    getArtistProfile: async () => { throw new Error("Not implemented") }
})