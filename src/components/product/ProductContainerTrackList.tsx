import { useProduct } from "@/hooks/product/useProduct"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FaPlay } from "react-icons/fa"
import { Link } from "react-router"

export const ProductContainerTrackList = () => {
    const product = useProduct()
    const parseDuration = (seconds: number) => {
        const parsedMinutes = Math.floor(seconds / 60)
        const parsedSeconds = seconds - (parsedMinutes * 60)
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
                <CardDescription>{product.queryResult?.product.trackList?.length} pistas</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {product.queryResult?.product.trackList?.map((track, index) => (
                    <Card key={index} className="p-3 flex items-center justify-between">
                        <img alt="Imagen de cancion del album" className="w-14 h-14 rounded-md" src={track.imgUrl} />
                        <div className="flex w-full justify-between items-center">
                            <Button asChild variant='link' className="w-fit justify-start">
                                <Link to={`/song/${track.id}`}>{track.title}</Link>
                            </Button>
                            <Button variant='link' className="w-fit hidden sm:block">{track.artists.map(artist => artist.name).join(', ')}</Button>
                            <div className="flex items-center gap-2">
                                <p className="pr-2 hidden sm:block">{parseDuration(track.duration)}</p>
                                <Button className="rounded-full w-10 h-10">
                                    <FaPlay className="ml-[3px]" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}