import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RatingProps } from "@/hooks/ratings/RatingsContext";
import { useState } from "react";


export const ProductContainerRatingsItem = ({ item }: { item: RatingProps }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <Card className="h-36 grow flex items-center">
            <CardHeader className="py-0">
                <CardTitle className="italic">"{item.title}"</CardTitle>
                <div className="pt-2 flex items-center gap-2">
                    {!imgLoaded && <Skeleton className="rounded-full w-10 h-10" />}
                    <img alt="imagen del usuarios de la reseña" className="rounded-full w-10 h-10" hidden={!imgLoaded} src={item.authorImgUrl} onLoad={() => {setImgLoaded(true)}}/>
                    <p>@{item.authorUsername}</p>
                </div>
            </CardHeader>
        </Card>
    )
}