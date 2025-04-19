import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"

import { FaRegStar, FaStar } from "react-icons/fa6"

import { ProductContainerRatingsItem } from "./ProductContainerRatingsItem";
import { ProductContainerRatingPopUp } from "./ProductContainerRatingPopUp";
import { useProduct } from "@/hooks/product/useProduct";
import { useEffect, useState } from "react";
import { RatingProps } from "@/hooks/product/ProductContext";
import { useParams } from "react-router";
import { Skeleton } from "../ui/skeleton";

export const ProductContainerRatings = () => {
    const params = useParams()
    const product = useProduct()
    const [ratings, setRatings] = useState<RatingProps | undefined>()

    useEffect(() => {
        product.getProductRatings(params.id!).then(result => setRatings(result!))
    }, [product, params.id])

    if (ratings === undefined) return <Skeleton className="grow flex flex-col" />

    return (
        <Card className="grow flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <CardTitle className="text-xl">Valoraciones</CardTitle>
                        <CardDescription>{ratings.totalRatings} valoraciones</CardDescription>
                    </div>
                    <ProductContainerRatingPopUp ratings={ratings}/>
                </div>
            </CardHeader>
            <CardContent className="flex gap-2 h-full">
                <div className="flex gap-2 flex-wrap justify-center w-full">
                    <div className="w-fit gap-2 flex flex-col">
                        <Card className="bg-black w-36 h-36">
                            <CardContent className="flex flex-col items-center justify-center w-full h-full p-0">
                                <p className="text-white text-6xl">{ratings.averageRating}</p>
                            </CardContent>
                        </Card>
                        <div className="flex mb-2 justify-center">
                            {Array.from({ length: 5 }, (_, index) => (
                                ratings.averageRating > index ? (
                                    <FaStar key={index} className="w-5 h-5" />
                                ) : (
                                    <FaRegStar key={index} className="w-5 h-5" />
                                )
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col mt-3 mr-3">
                        <div className="flex items-center gap-2">
                            <p>5</p>
                            <Progress value={ratings.ratings.reduce((sum, rating) => rating.rating === 5 ? sum + 1 : sum, 0) / ratings.totalRatings * 100} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>4</p>
                            <Progress value={ratings.ratings.reduce((sum, rating) => rating.rating === 4 ? sum + 1 : sum, 0) / ratings.totalRatings * 100} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>3</p>
                            <Progress value={ratings.ratings.reduce((sum, rating) => rating.rating === 3 ? sum + 1 : sum, 0) / ratings.totalRatings * 100} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>2</p>
                            <Progress value={ratings.ratings.reduce((sum, rating) => rating.rating === 2 ? sum + 1 : sum, 0) / ratings.totalRatings * 100} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>1</p>
                            <Progress value={ratings.ratings.reduce((sum, rating) => rating.rating === 1 ? sum + 1 : sum, 0) / ratings.totalRatings * 100} className="w-56" />
                        </div>
                    </div>
                    <div className="grow">
                        {
                            (() => {
                                if (ratings.totalRatings == 0) {
                                    return (
                                        <Card className="h-36 min-w-72 max-w-80 flex items-center justify-center">
                                            <CardDescription>Sé el primero en comentar</CardDescription>
                                        </Card>
                                    )
                                } else {
                                    return <ProductContainerRatingsItem />
                                }
                            })()
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}