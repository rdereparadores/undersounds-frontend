import { Card, CardContent,} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface ProductContainerRatingPopUpItemProps {
    username: string,
    rating: number,
    title: string,
    description: string,
    imgUrl: string
}

export const ProductContainerRatingPopUpItem = ({ username, imgUrl, rating, title, description }: ProductContainerRatingPopUpItemProps) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <Card className="h-fit w-fit flex items-center">
            <CardContent className="p-2 justify-start gap-2 flex flex-wrap">
                <div className="flex flex-col gap-2">
                    <div className="pt-2 flex items-center gap-2">
                        {!imgLoaded && <Skeleton className="w-10 h-10"/>}
                        <img hidden={!imgLoaded} className="rounded-full w-10 h-10" src={imgUrl} onLoad={() => {setImgLoaded(true)}} />
                        <p className="text-sm">@{username}</p>
                    </div>
                    <div className="flex mb-2 w-full justify-start">
                        {rating >= 1 && <FaStar className="w-5 h-5" />}
                        {rating >= 2 && <FaStar className="w-5 h-5" />}
                        {rating >= 3 && <FaStar className="w-5 h-5" />}
                        {rating >= 4 && <FaStar className="w-5 h-5" />}
                        {rating >= 5 && <FaStar className="w-5 h-5" />}
                        {rating < 2 && <FaRegStar className="w-5 h-5" />}
                        {rating < 3 && <FaRegStar className="w-5 h-5" />}
                        {rating < 4 && <FaRegStar className="w-5 h-5" />}
                        {rating < 5 && <FaRegStar className="w-5 h-5" />}
                    </div>
                </div>
                <div>
                    <p className="italic font-semibold overflow-hidden text-ellipsis line-clamp-1">{title}</p>
                    <p className="overflow-hidden text-ellipsis line-clamp-4">{description}</p>
                </div>
            </CardContent>
        </Card>
    )
}