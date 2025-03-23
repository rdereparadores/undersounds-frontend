import { ApiContext, ApiContextSongProps } from './ApiContext'

const topSongs: ApiContextSongProps[] = [
    {
      title: "Midnight Serenade",
      artist: "Luna Rivers",
      popularNo: "1",
      coverUrl: "https://picsum.photos/id/64/300/300",
      songId: 1001
    },
    {
      title: "Electric Dreams",
      artist: "Synth Collective",
      popularNo: "2",
      coverUrl: "https://picsum.photos/id/65/300/300",
      songId: 1002
    },
    {
      title: "Océano de Recuerdos",
      artist: "Carlos Vives",
      popularNo: "3",
      coverUrl: "https://picsum.photos/id/68/300/300",
      songId: 1003
    },
    {
      title: "Urban Echoes",
      artist: "Metro Beats",
      popularNo: "4",
      coverUrl: "https://picsum.photos/id/24/300/300",
      songId: 1004
    },
    {
      title: "Whispering Wind",
      artist: "Nature Sounds",
      popularNo: "5",
      coverUrl: "https://picsum.photos/id/28/300/300",
      songId: 1005
    },
    {
      title: "Noche de Verano",
      artist: "Los Amigos",
      popularNo: "6",
      coverUrl: "https://picsum.photos/id/42/300/300",
      songId: 1006
    },
    {
      title: "Digital Heartbeat",
      artist: "Electronic Pulse",
      popularNo: "7",
      coverUrl: "https://picsum.photos/id/96/300/300",
      songId: 1007
    },
    {
      title: "Golden Horizon",
      artist: "Sunset Waves",
      popularNo: "8",
      coverUrl: "https://picsum.photos/id/91/300/300",
      songId: 1008
    },
    {
      title: "Rhythm of the Night",
      artist: "DJ Stellar",
      popularNo: "9",
      coverUrl: "https://picsum.photos/id/116/300/300",
      songId: 1009
    },
    {
      title: "Mountain Echo",
      artist: "Wilderness",
      popularNo: "10",
      coverUrl: "https://picsum.photos/id/102/300/300",
      songId: 1010
    }
  ];

interface ApiProviderProps {
    children: React.ReactNode
}

export const ApiProvider = ({ children }: ApiProviderProps) => {

    const getTop10Songs = async () => {
        return topSongs
    }

    return (
        <ApiContext.Provider value={{ getTop10Songs }}>
            {children}
        </ApiContext.Provider>
    )
}