import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"

import { FaRegStar, FaStar } from "react-icons/fa6"

import { ProductContainerRatingsItem } from "./ProductContainerRatingsItem";
import { ProductContainerRatingPopUp } from "./ProductContainerRatingPopUp";
import { useProduct } from "@/hooks/product/useProduct";

export const ProductContainerRatings = () => {
    const product = useProduct()
    return (
        <Card className="grow flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <CardTitle className="text-xl">Valoraciones</CardTitle>
                        <CardDescription>{product.queryResult?.ratings.list.length} valoraciones</CardDescription>
                    </div>
                    <ProductContainerRatingPopUp />
                </div>
            </CardHeader>
            <CardContent className="flex gap-2 h-full">
                <div className="flex gap-2 flex-wrap justify-center w-full">
                    <div className="w-fit gap-2 flex flex-col">
                        <Card className="bg-black w-36 h-36">
                            <CardContent className="flex flex-col items-center justify-center w-full h-full p-0">
                                <p className="text-white text-6xl">{product.queryResult?.ratings.average}</p>
                            </CardContent>
                        </Card>
                        {product.queryResult &&
                            <div className="flex mb-2 justify-center">
                                {product.queryResult!.ratings.average >= 1 && <FaStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average >= 2 && <FaStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average >= 3 && <FaStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average >= 4 && <FaStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average >= 5 && <FaStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average < 2 && <FaRegStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average < 3 && <FaRegStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average < 4 && <FaRegStar className="w-5 h-5" />}
                                {product.queryResult!.ratings.average < 5 && <FaRegStar className="w-5 h-5" />}
                            </div>
                        }
                    </div>
                    {
                        product.queryResult &&
                        <div className="flex flex-col mt-3 mr-3">
                            <div className="flex items-center gap-2">
                                <p>5</p>
                                <Progress value={product.queryResult!.ratings.ratingCount.five / product.queryResult!.ratings.list.length * 100} className="w-56" />
                            </div>
                            <div className="flex items-center gap-2">
                                <p>4</p>
                                <Progress value={product.queryResult!.ratings.ratingCount.four / product.queryResult!.ratings.list.length * 100} className="w-56" />
                            </div>
                            <div className="flex items-center gap-2">
                                <p>3</p>
                                <Progress value={product.queryResult!.ratings.ratingCount.three / product.queryResult!.ratings.list.length * 100} className="w-56" />
                            </div>
                            <div className="flex items-center gap-2">
                                <p>2</p>
                                <Progress value={product.queryResult!.ratings.ratingCount.two / product.queryResult!.ratings.list.length * 100} className="w-56" />
                            </div>
                            <div className="flex items-center gap-2">
                                <p>1</p>
                                <Progress value={product.queryResult!.ratings.ratingCount.one / product.queryResult!.ratings.list.length * 100} className="w-56" />
                            </div>
                        </div>
                    }
                    <div className="grow">
                        {
                            (() => {
                                if (product.queryResult?.ratings.list.length == 0) {
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