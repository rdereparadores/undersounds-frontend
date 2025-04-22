import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Link } from "react-router"
import { SongProps } from "@/hooks/product/ProductContext"

export const ProductContainerTrackList = ({ trackList }: { trackList: Partial<SongProps>[] }) => {
    const parseDuration = (seconds: number) => {
        const parsedMinutes = Math.floor(seconds / 60)
        const parsedSeconds = Math.floor(seconds) - (parsedMinutes * 60)
        let parsedDuration = ''
        parsedDuration += (parsedMinutes < 10) ? `0${parsedMinutes}` : parsedMinutes.toString()
        parsedDuration += ':'
        parsedDuration += (parsedSeconds < 10) ? `0${parsedSeconds}` : parsedSeconds.toString()
        return parsedDuration
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de pistas</CardTitle>
                <CardDescription>{trackList.length} pistas</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {trackList.map((track, index) => (
                    <Card key={index} className="p-3 flex items-center justify-between">
                        <img alt="Imagen de cancion del album" className="w-14 h-14 rounded-md" src={track.imgUrl} />
                        <div className="flex w-full justify-between items-center">
                            <Button asChild variant='link' className="w-fit justify-start">
                                <Link to={`/song/${track._id}`}>{track.title}</Link>
                            </Button>
                            <Button variant='link' className="w-fit hidden sm:block">{track.collaborators!.map(c => c.artistName).join(', ')}</Button>
                            <div className="flex items-center gap-2">
                                <p className="pr-2 hidden sm:block">{parseDuration(track.duration!)}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}