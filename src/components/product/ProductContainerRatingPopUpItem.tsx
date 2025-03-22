import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";


export const ProductContainerRatingPopUpItem = () => {
    return (
        <Card className="h-36 min-w-72 grow flex items-center">
            <CardHeader className="py-0 gap-2">
                <div className="pt-2 flex items-center gap-2">
                    <Skeleton className="rounded-full w-10 h-10" />
                    <p>@AlejPagar</p>
                </div>
                <div className="flex mb-2 w-full justify-start">
                    <FaStar className="w-5 h-5" />
                    <FaStar className="w-5 h-5" />
                    <FaRegStarHalfStroke className="w-5 h-5" />
                    <FaRegStar className="w-5 h-5" />
                    <FaRegStar className="w-5 h-5" />
                </div>
            </CardHeader>
            <CardContent className="py-0 pl-0 justify-center gap-2">
                <p className="italic font-semibold">"La canción del verano"</p>
                <p className="overflow-ellipsis">Mu guapo mu guapo mu guapo guapisimo tio</p>
            </CardContent>
        </Card>
    )
}