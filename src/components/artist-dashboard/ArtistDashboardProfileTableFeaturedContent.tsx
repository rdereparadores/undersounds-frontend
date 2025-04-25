import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { useArtist } from "@/hooks/artist/useArtist"
import { useEffect, useState } from "react"
import { ArtistSongProps } from "@/hooks/artist/ArtistContext"

interface ArtistDashboardProfileTableFeaturedContentProps {
    selectedSongsList: string[],
    setSelectedSongsList: React.Dispatch<React.SetStateAction<string[]>>
}

export const TableFeaturedContent = ({ selectedSongsList, setSelectedSongsList }: ArtistDashboardProfileTableFeaturedContentProps) => {
    const artist = useArtist()
    const [songsList, setSongsList] = useState<ArtistSongProps[]>([])

    useEffect(() => {
        artist.getArtistSongs()
            .then(songs => setSongsList(songs || []))

        selectedSongsList.forEach((s) => handleSongAdd(s))
    }, [])

    const handleSongAdd = (songId: string) => {
        const newSongsList = [...selectedSongsList, songId]
        setSelectedSongsList(newSongsList)
    }

    const handleSongRemove = (songId: string) => {
        setSelectedSongsList(selectedSongsList.filter(g => g != songId))
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Artistas</TableHead>
                    <TableHead className="text-center">Selección</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {songsList.map((songs, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">
                            <img  src={songs.imgUrl} className="size-[50px]"></img>
                        </TableCell>
                        <TableCell>{songs.title}</TableCell>
                        <TableCell>{songs.author}</TableCell>
                        <TableCell className="text-center">
                            <Checkbox
                                onCheckedChange={(e) => {
                                    if (e) {
                                        handleSongAdd(songs._id)
                                    } else {
                                        handleSongRemove(songs._id)
                                    }
                                }}
                                checked={selectedSongsList.includes(songs._id)}
                            />
                            <Label></Label>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

