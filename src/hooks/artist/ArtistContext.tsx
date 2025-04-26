import { createContext } from 'react'
import { UserInfoProps } from '../user/UserContext'
import { AlbumProps, SongProps } from '../product/ProductContext'

export interface UpdateArtistInfoProps {
    artistName: string,
    artistUsername: string,
    artistProfileImg: File,
    artistBannerImg: File
}

export interface ArtistInfoProps extends UserInfoProps {
    artistName: string,
    artistUsername: string,
    artistImgUrl: string,
    artistBannerUrl: string
}

export interface ArtistSongProps {
    _id: string,
    title: string,
    description: string,
    imgUrl: string,
    author: string,
    artistName: string,
    duration: number,
    version?: number,
    versionHistory?: string[],
    collaborators?: {
        _id: string,
        artistUsername: string,
        artistName: string,
        artistImgUrl: string 
    }[]
}

export interface ArtistAlbumProps {
    _id: string,
    title: string,
    imgUrl: string,
    author: string,
    duration: number,
    trackList: string[],
    version?: number
}


export interface ArtistContextProps {
    getArtistInfo: () => Promise<ArtistInfoProps | undefined>,
    getArtistSongs: () => Promise<ArtistSongProps[] | undefined>,
    getArtistAlbums: () => Promise<ArtistAlbumProps[] | undefined>,
    updateArtistInfo: (data: Partial<UpdateArtistInfoProps>) => Promise<boolean>,
    getSongHistoryArray: (songId: string) => Promise<SongProps[]>,
    getAlbumHistoryArray: (albumId: string) => Promise<AlbumProps[]> 
}

export const ArtistContext = createContext<ArtistContextProps>({
    getArtistInfo: async () => { throw new Error() },
    getArtistSongs: async () => [],
    getArtistAlbums: async () => [],
    updateArtistInfo: async () => { throw new Error() },
    getSongHistoryArray: async () => [],
    getAlbumHistoryArray: async () => [] 
})