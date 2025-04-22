import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { StarRating } from "./ProductStarRating";

interface ProductContainerRatingPopUpItemProps {
    username: string;
    rating: number;
    title: string;
    description: string;
    imgUrl: string;
    date: string;
    format: string;
}

export const ProductContainerRatingPopUpItem = ({
                                                    username,
                                                    imgUrl,
                                                    rating,
                                                    title,
                                                    description,
                                                    date,
                                                    format
                                                }: ProductContainerRatingPopUpItemProps) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <Card className="w-full">
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        {!imgLoaded && <Skeleton className="w-12 h-12 rounded-full" />}
                        <img
                            alt="Imagen de perfil del usuario"
                            hidden={!imgLoaded}
                            className="rounded-full w-12 h-12 object-cover"
                            src={imgUrl}
                            onLoad={() => {
                                setImgLoaded(true);
                            }}
                        />
                    </div>

                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="font-semibold">@{username}</p>
                                <div className="flex items-center gap-2">
                                    <StarRating value={rating} readOnly={true} emptyByDefault={true} />
                                    <span className="text-sm text-gray-500">{date}</span>
                                </div>
                            </div>
                            <Badge variant="outline" className="ml-2">
                                {format.charAt(0).toUpperCase() + format.slice(1)}
                            </Badge>
                        </div>

                        <h4 className="text-lg font-medium mb-1 italic">"{title}"</h4>
                        <p className="text-gray-700">{description}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};