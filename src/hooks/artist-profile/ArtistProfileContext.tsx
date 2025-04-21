import { createContext } from "react"

export interface ArtistProfileProps {
    artist: {
        id: string;
        name: string;
        artistUsername: string;
        followed: boolean;
        bannerImgUrl: string;
        profileImgUrl: string;
    };
    topSongs: {
        id: string;
        songName: string;
        imgURL: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: string;
        albumId: string | null;
        plays: number;
    }[];
    newestRelease: {
        id: string;
        title: string;
        imgUrl: string;
        artist: string;
        artistId: string;
        releaseDate: Date;
        releaseYear: number;
        type: string;
    } | null;
    albums: {
        id: string;
        title: string;
        imgUrl: string;
        artist: string;
        artistId: string;
        releaseDate: Date;
        releaseYear: number;
        type: string;
    }[];
    epsYsingles: {
        id: string;
        title: string;
        imgUrl: string;
        artist: string;
        artistId: string;
        releaseDate: Date;
        releaseYear: number;
        type: string;
    }[];
}

export interface ArtistProfileContextProps {
    getArtistProfile: (artistID: string) => Promise<ArtistProfileProps>;
    followArtist: (artistID: string) => Promise<void>;
    unfollowArtist: (artistID: string) => Promise<void>;
    isFollowing: (artistID: string) => Promise<boolean>;
}

export const ArtistProfileContext = createContext<ArtistProfileContextProps>({
    getArtistProfile: async () => { throw new Error("Not implemented") },
    followArtist: async () => { throw new Error("Not implemented") },
    unfollowArtist: async () => { throw new Error("Not implemented") },
    isFollowing: async () => { throw new Error("Not implemented") }
})