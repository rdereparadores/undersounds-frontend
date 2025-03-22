import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"

import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6"

import { ProductContainerRatingsItem } from "./ProductContainerRatingsItem";

export const ProductContainerRatings = () => {
    return (
        <Card className="grow">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <CardTitle className="text-xl">Valoraciones</CardTitle>
                        <CardDescription>216 reseñas</CardDescription>
                    </div>
                    <Button>Ver valoraciones</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 flex-wrap justify-center">
                    <div className="w-fit gap-2 flex flex-col">
                        <Card className="bg-black w-36 h-36">
                            <CardContent className="flex flex-col items-center justify-center w-full h-full p-0">
                                <p className="text-white text-6xl">3.9</p>
                            </CardContent>
                        </Card>
                        <div className="flex mb-2 w-full justify-center">
                            <FaStar className="w-5 h-5" />
                            <FaStar className="w-5 h-5" />
                            <FaRegStarHalfStroke className="w-5 h-5" />
                            <FaRegStar className="w-5 h-5" />
                            <FaRegStar className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="flex flex-col mt-3 mr-3">
                        <div className="flex items-center gap-2">
                            <p>5</p>
                            <Progress value={40} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>4</p>
                            <Progress value={10} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>3</p>
                            <Progress value={5} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>2</p>
                            <Progress value={15} className="w-56" />
                        </div>
                        <div className="flex items-center gap-2">
                            <p>1</p>
                            <Progress value={30} className="w-56" />
                        </div>
                    </div>
                    <ProductContainerRatingsItem />
                    <Card className="h-36 min-w-72 max-w-80 flex items-center justify-center">
                        <CardDescription>Sé el primero en comentar</CardDescription>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}