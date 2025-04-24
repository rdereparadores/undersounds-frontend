import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"

import { FaRegStar, FaStar } from "react-icons/fa6"

import { ProductContainerRatingsItem } from "./ProductContainerRatingsItem";
import { ProductContainerRatingPopUp } from "./ProductContainerRatingPopUp";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { useProductRating } from "@/hooks/ratings/useRatings";
import { RatingProps, RatingResultProps } from "@/hooks/ratings/RatingsContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ProductContainerUserRatingPopUp = () => {
    const [userRating, setUserRating] = useState<Partial<RatingProps>>({})
    const [editing, setEditing] = useState<boolean>(false)
    const productRating = useProductRating()
    const params = useParams()

    useEffect(() => {
        productRating.checkUserRating(params.id!).then(ur => {
            if (ur.rating) {
                setUserRating(ur.rating)
                setEditing(true)
            }
        })
    }, [])

    const handleSubmit = async () => {
        if (editing) {
            await productRating.updateRating(params.id!, userRating!)
        } else {
            await productRating.addRating(params.id!, userRating!)
        }
        setTimeout(() => window.location.reload(), 1000)
    }

    const handleRemove = async () => {
        await productRating.removeRating(params.id!)
        setTimeout(() => window.location.reload(), 1000)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{editing ? 'Editar' : 'Añadir'} valoración</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editing ? 'Editar' : 'Añadir'} valoración</DialogTitle>
                </DialogHeader>

                <Input onChange={(e) => setUserRating({...userRating, title: e.target.value})} defaultValue={userRating?.title} placeholder="Título" />
                <Input onChange={(e) => setUserRating({...userRating, description: e.target.value})} defaultValue={userRating?.description} placeholder="Descripción" />

                <div className="flex gap-1 justify-center">
                    <Button className="w-10 h-10" onClick={() => {setUserRating({...userRating, rating: 1})}}>
                        {userRating.rating && (userRating!.rating > 0) ? <FaStar /> : <FaRegStar/>}
                    </Button>
                    <Button className="w-10 h-10" onClick={() => {setUserRating({...userRating, rating: 2})}}>
                        {userRating.rating && (userRating!.rating > 1) ? <FaStar /> : <FaRegStar/>}
                    </Button>
                    <Button className="w-10 h-10" onClick={() => {setUserRating({...userRating, rating: 3})}}>
                        {userRating.rating && (userRating!.rating > 2) ? <FaStar /> : <FaRegStar/>}
                    </Button>
                    <Button className="w-10 h-10" onClick={() => {setUserRating({...userRating, rating: 4})}}>
                        {userRating.rating && (userRating!.rating > 3) ? <FaStar /> : <FaRegStar/>}
                    </Button>
                    <Button className="w-10 h-10" onClick={() => {setUserRating({...userRating, rating: 5})}}>
                        {userRating.rating && (userRating!.rating > 4) ? <FaStar /> : <FaRegStar/>}
                    </Button>
                </div>
                
                <div className="flex gap-2">
                    <Button className="grow" onClick={handleSubmit}>Publicar</Button>
                    {editing && <Button className="max-w-32" variant='destructive' onClick={handleRemove}>Eliminar</Button>}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export const ProductContainerRatings = () => {
    const params = useParams()
    const productRating = useProductRating()
    const [ratings, setRatings] = useState<RatingResultProps | undefined>()
    const [rateable, setRateable] = useState<boolean>(false)

    useEffect(() => {
        productRating.getProductRatings(params.id!).then(result => setRatings(result!))
        productRating.checkUserRating(params.id!).then(r => {
            if (r.rateable) setRateable(true)
        })
    }, [])

    if (ratings === undefined) return <Skeleton className="grow flex flex-col" />

    return (
        <Card className="grow flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <CardTitle className="text-xl">Valoraciones</CardTitle>
                        <CardDescription>{ratings.totalRatings} valoraciones</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        {rateable && <ProductContainerUserRatingPopUp />}
                        <ProductContainerRatingPopUp ratings={ratings.ratings}/>
                    </div>
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
                                    return <ProductContainerRatingsItem item={ratings.ratings[0]} />
                                }
                            })()
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}