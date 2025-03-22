import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { ProductContainerRatingPopUp } from "./ProductConatinerRatingPopUp"
import { ProductContainerInfo } from "./ProductContainerInfo"
import { ProductContainerRatings } from "./ProductContainerRatings"
import { ProductContainerRelatedCarousel } from "./ProductContainerRelatedCarousel"
import { FaPlay } from "react-icons/fa"

export const ProductContainerTrack = () => {
    return (
        <Card className="p-3 flex items-center justify-between">
            <Skeleton className="w-16 h-16 rounded-md" />
            <Button variant='link'>Lonely Road</Button>
            <Button variant='link' className="hidden sm:block">Machine Gun Kelly</Button>
            <p className="pr-2 hidden sm:block">03:25</p>
            <Button className="rounded-full w-10 h-10">
                <FaPlay className="ml-[3px]" />
            </Button>
        </Card>
    )
}

export const ProductContainerTrackList = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lista de pistas</CardTitle>
                <CardDescription>7 pistas</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <ProductContainerTrack />
                <ProductContainerTrack />
                <ProductContainerTrack />
                <ProductContainerTrack />
            </CardContent>
        </Card>
    )
}

interface ProductContainerProps {
    type: string
}

export const ProductContainer = ({ type }: ProductContainerProps) => {
    return (
        <div className='flex flex-col gap-4'>
            <ProductContainerInfo />

            <div className="flex gap-4 flex-wrap">
                <div className='flex flex-col grow gap-4'>
                    {type == 'album' && <ProductContainerTrackList />}
                    <ProductContainerRatings />
                </div>
                <ProductContainerRelatedCarousel />
                <ProductContainerRatingPopUp></ProductContainerRatingPopUp>
                </div>
        </div>
    )
}