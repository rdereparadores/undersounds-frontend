import { useProduct } from "@/hooks/product/useProduct"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FaPlay } from "react-icons/fa"

export const ProductContainerTrackList = () => {
    const product = useProduct()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de pistas</CardTitle>
                <CardDescription>{product.queryResult?.product.trackList?.length} pistas</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {product.queryResult?.product.trackList?.map((track, index) => (
                    <Card key={index} className="p-3 flex items-center justify-between">
                        <img className="w-16 h-16 rounded-md" src={track.imgUrl} />
                        <div className="flex w-full justify-between items-center">
                            <Button variant='link' className="w-fit justify-start">{track.title}</Button>
                            <Button variant='link' className="w-fit hidden sm:block">{track.artists.map(artist => artist.name).join(', ')}</Button>
                            <div className="flex items-center gap-2">
                                <p className="pr-2">{Math.floor(track.duration / 60)}:{track.duration - (Math.floor(track.duration / 60) * 60)}</p>
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