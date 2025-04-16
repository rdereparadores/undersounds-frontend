import { useGenre } from "@/hooks/genre/useGenre"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"

interface ArtistDashboardReleasesNewSongGenreCardProps {
    selectedGenreList: string[],
    setSelectedGenreList: React.Dispatch<React.SetStateAction<string[]>>
}

export const ArtistDashboardReleasesNewSongGenreCard = ({ selectedGenreList, setSelectedGenreList }: ArtistDashboardReleasesNewSongGenreCardProps) => {
    const genre = useGenre()
    const [genreList, setGenreList] = useState<string[]>([])

    useEffect(() => {
        genre.getAll()
            .then(genres => setGenreList(genres))
    }, [])

    const handleGenreAdd = (genre: string) => {
        const newGenreList = [...selectedGenreList, genre]
        setSelectedGenreList(newGenreList)
    }

    const handleGenreRemove = (genre: string) => {
        setSelectedGenreList(selectedGenreList.filter(g => g != genre))
    }

    return (
        <Card className='grow h-fit sm:w-[50%]'>
            <CardHeader>
                <CardTitle>Géneros</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='flex gap-2 flex-wrap'>
                    {selectedGenreList.map((genre, index) => (
                        <Badge key={index} onClick={() => { handleGenreRemove(genre) }}>{genre}</Badge>
                    ))}
                </div>
                <Separator className='my-4' />
                <div className='flex flex-col gap-2 max-h-96 overflow-y-auto'>
                    {genreList.filter(genre => !selectedGenreList.includes(genre)).map((genre, index) => (
                        <div key={index} className='flex gap-4 justify-between items-center'>
                            <p>{genre}</p>
                            {(() => {
                                if (!selectedGenreList.includes(genre)) {
                                    return <Button type='button' onClick={() => { handleGenreAdd(genre) }}>Añadir</Button>
                                }
                                return <></>
                            })()}
                        </div>
                    ))}
                </div>

            </CardContent>
        </Card>
    )
}