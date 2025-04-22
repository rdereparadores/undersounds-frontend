import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { ProductContainerRatingPopUpItem } from "./ProductContainerRatingPopUpItem";
import { ProductContainerRatingForm } from "./ProductRatingForm.tsx";
import { useState, useEffect, useCallback } from "react";
import { useProductRating } from "@/hooks/ratings/useRatings";
import { RatingItemProps, RatingProps, PurchasedProductFormat } from "@/hooks/ratings/RatingsContext.tsx";
import { useParams } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { StarRating } from "./ProductStarRating";
import { toast } from "sonner";
import { Badge } from "../ui/badge.tsx";

export const ProductContainerRatings = () => {
    const params = useParams();
    const productRating = useProductRating();
    const [ratings, setRatings] = useState<RatingProps | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userRating, setUserRating] = useState<RatingItemProps[] | null>(null);
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [purchasedFormats, setPurchasedFormats] = useState<PurchasedProductFormat[]>([]);
    const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
    const [ratedFormats, setRatedFormats] = useState<string[]>([]);
    const [showFormatSelector, setShowFormatSelector] = useState(false);
    const [formatSelectorAction, setFormatSelectorAction] = useState<'edit' | 'delete'>('edit');
    const [hasRatedAnyFormat, setHasRatedAnyFormat] = useState(false);
    const [processingAction, setProcessingAction] = useState(false);

    const fetchRatings = useCallback(async () => {
        setIsLoading(true);
        const productId = params.id!;

        try {
            const result = await productRating.getProductRatings(productId);
            setRatings(result);

            const userRatingCheck = await productRating.checkUserRating(productId);
            setHasRatedAnyFormat(userRatingCheck.hasRated);
            setUserRating(userRatingCheck.ratings);

            const formatsResult = await productRating.getPurchasedFormats(productId);
            setPurchasedFormats(formatsResult.formats);
            setRatedFormats(formatsResult.ratedFormats || []);

            if (formatsResult.formats.length === 1 && !formatsResult.ratedFormats.includes(formatsResult.formats[0].format)) {
                setSelectedFormat(formatsResult.formats[0].format);
            }

        } catch (error) {
            console.error("Error fetching ratings:", error);
            toast.error("Error al cargar las valoraciones");
        } finally {
            setIsLoading(false);
        }
    }, [params.id, productRating]);

    useEffect(() => {
        (async () => {
            await fetchRatings();
        })();
    }, [fetchRatings]);

    const handleRatingSuccess = () => {
        setShowRatingForm(false);
        setIsEditing(false);
        setSelectedFormat(null);
        (async () => {
            await fetchRatings();
        })();
    };

    const performDeleteRating = async (formatToDelete: string | null) => {
        if (processingAction) return;
        setProcessingAction(true);

        if (!userRating || userRating.length === 0) {
            setProcessingAction(false);
            return;
        }

        const ratingToDelete = formatToDelete
            ? userRating.find(r => r.format === formatToDelete)
            : userRating[0];

        if (!ratingToDelete) {
            toast.error("No se pudo encontrar la valoración");
            setProcessingAction(false);
            return;
        }

        try {
            const success = await productRating.removeRating(params.id!, ratingToDelete._id);
            if (success) {
                await fetchRatings();
                setSelectedFormat(null);
            } else {
                toast.error("No se pudo eliminar la valoración");
            }
        } catch (error) {
            console.error("Error deleting rating:", error);
            toast.error("Error al eliminar la valoración");
        } finally {
            setProcessingAction(false);
        }
    };

    const handleDeleteRating = async () => {
        if (!selectedFormat && userRating && userRating.length > 1) {
            setFormatSelectorAction('delete');
            setShowFormatSelector(true);
            return;
        }

        await performDeleteRating(selectedFormat);
    };

    const performEditRating = (formatToEdit: string | null) => {
        if (processingAction) return;
        setProcessingAction(true);

        const selectedRatingFormat = formatToEdit || (userRating && userRating.length === 1 ? userRating[0].format : null);

        const ratingForFormat = userRating?.find(r => r.format === selectedRatingFormat);

        if (ratingForFormat) {
            setIsEditing(true);
            setSelectedFormat(ratingForFormat.format);
            setShowRatingForm(true);
        } else {
            toast.error("No tienes una valoración para este formato");
        }

        setProcessingAction(false);
    };

    const handleEditRating = () => {
        if (!selectedFormat && userRating && userRating.length > 1) {
            setFormatSelectorAction('edit');
            setShowFormatSelector(true);
            return;
        }

        performEditRating(selectedFormat);
    };

    const handleFormatSelection = (format: string) => {
        setSelectedFormat(format);
        setShowFormatSelector(false);

        if (formatSelectorAction === 'delete') {
            setTimeout(() => performDeleteRating(format), 0);
        } else if (formatSelectorAction === 'edit') {
            setTimeout(() => performEditRating(format), 0);
        }
    };

    const handleOpenRatingForm = () => {
        if (purchasedFormats.length === 0) {
            toast.error("Debes comprar este producto antes de poder valorarlo");
            return;
        }

        const availableFormats = purchasedFormats.filter(
            format => !ratedFormats.includes(format.format)
        );

        if (availableFormats.length === 0) {
            toast.error("Ya has valorado todos los formatos que has comprado");
            return;
        }

        if (availableFormats.length === 1) {
            setSelectedFormat(availableFormats[0].format);
        } else {
            setSelectedFormat(null);
        }

        setIsEditing(false);
        setShowRatingForm(true);
    };

    const showRatingManagementButtons = hasRatedAnyFormat;

    if (isLoading) {
        return <Skeleton className="grow flex flex-col" />;
    }

    if (!ratings) {
        return (
            <Card className="grow flex flex-col">
                <CardHeader>
                    <CardTitle className="text-xl">Valoraciones</CardTitle>
                    <CardDescription>No se pudieron cargar las valoraciones</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    const canAddMoreRatings = ratedFormats.length < purchasedFormats.length;

    return (
        <>
            {showFormatSelector && (
                <Dialog open={showFormatSelector} onOpenChange={setShowFormatSelector}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {formatSelectorAction === 'delete'
                                    ? "Seleccionar formato a eliminar"
                                    : "Seleccionar formato a editar"}
                            </DialogTitle>
                            <DialogDescription>
                                Tienes valoraciones para varios formatos.
                                Selecciona el formato que deseas {formatSelectorAction === 'delete' ? 'eliminar' : 'editar'}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-2 py-4">
                            {userRating?.map((rating) => (
                                <Button
                                    key={rating._id}
                                    onClick={() => handleFormatSelection(rating.format)}
                                    className="w-full justify-start"
                                    disabled={processingAction}
                                >
                                    {rating.format.charAt(0).toUpperCase() + rating.format.slice(1)}
                                </Button>
                            ))}
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowFormatSelector(false)}
                                disabled={processingAction}
                            >
                                Cancelar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            <Card className="grow flex flex-col">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <CardTitle className="text-xl">Valoraciones</CardTitle>
                            <CardDescription>{ratings.totalRatings} valoraciones</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            {canAddMoreRatings && (
                                <Button onClick={handleOpenRatingForm} disabled={processingAction}>
                                    {hasRatedAnyFormat ? "Valorar otro formato" : "Valorar este producto"}
                                </Button>
                            )}

                            {showRatingManagementButtons && (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={handleEditRating}
                                        disabled={processingAction}
                                    >
                                        Editar valoración
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" disabled={processingAction}>
                                                Eliminar valoración
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Se eliminará permanentemente tu valoración
                                                    de este producto.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDeleteRating}>
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </>
                            )}
                        </div>
                    </div>
                </CardHeader>

                {showRatingForm ? (
                    <CardContent>
                        {!isEditing && !selectedFormat && (
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Formato a valorar
                                </label>
                                <Select
                                    onValueChange={setSelectedFormat}
                                    defaultValue={selectedFormat || undefined}
                                    required
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona un formato" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Formatos disponibles</SelectLabel>
                                            {purchasedFormats
                                                .filter(format => !ratedFormats.includes(format.format))
                                                .map((format) => (
                                                    <SelectItem
                                                        key={format.format}
                                                        value={format.format}
                                                    >
                                                        {format.format.charAt(0).toUpperCase() + format.format.slice(1)} - Comprado el {new Date(format.purchaseDate).toLocaleDateString()}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {(selectedFormat || isEditing) ? (
                            <ProductContainerRatingForm
                                productId={params.id!}
                                existingRating={isEditing && userRating ? userRating.find(r => r.format === selectedFormat) || null : null}
                                isEditing={isEditing}
                                format={selectedFormat || ''}
                                onSuccess={handleRatingSuccess}
                                onCancel={() => {
                                    setShowRatingForm(false);
                                    setIsEditing(false);
                                    setSelectedFormat(null);
                                }}
                            />
                        ) : (
                            <div className="text-center p-4">
                                <p>Selecciona un formato para valorar</p>
                                <Button
                                    variant="outline"
                                    className="mt-2"
                                    onClick={() => {
                                        setShowRatingForm(false);
                                        setSelectedFormat(null);
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        )}
                    </CardContent>
                ) : (
                    <CardContent className="flex gap-2 h-full">
                        <div className="flex gap-2 flex-wrap justify-center w-full">
                            <div className="w-fit gap-2 flex flex-col">
                                <Card className="bg-black w-36 h-36">
                                    <CardContent className="flex flex-col items-center justify-center w-full h-full p-0">
                                        <p className="text-white text-6xl">{ratings.averageRating.toFixed(1)}</p>
                                    </CardContent>
                                </Card>
                                <div className="flex mb-2 justify-center">
                                    <StarRating value={Math.round(ratings.averageRating)} readOnly={true} emptyByDefault={true} />
                                </div>
                            </div>

                            <div className="flex flex-col mt-3 mr-3">
                                <div className="flex items-center gap-2">
                                    <p>5</p>
                                    <Progress value={ratings.totalRatings > 0 ?
                                        ratings.ratings.reduce((sum, rating) => rating.rating === 5 ? sum + 1 : sum, 0) / ratings.totalRatings * 100 : 0}
                                              className="w-56"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <p>4</p>
                                    <Progress value={ratings.totalRatings > 0 ?
                                        ratings.ratings.reduce((sum, rating) => rating.rating === 4 ? sum + 1 : sum, 0) / ratings.totalRatings * 100 : 0}
                                              className="w-56"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <p>3</p>
                                    <Progress value={ratings.totalRatings > 0 ?
                                        ratings.ratings.reduce((sum, rating) => rating.rating === 3 ? sum + 1 : sum, 0) / ratings.totalRatings * 100 : 0}
                                              className="w-56"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <p>2</p>
                                    <Progress value={ratings.totalRatings > 0 ?
                                        ratings.ratings.reduce((sum, rating) => rating.rating === 2 ? sum + 1 : sum, 0) / ratings.totalRatings * 100 : 0}
                                              className="w-56"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <p>1</p>
                                    <Progress value={ratings.totalRatings > 0 ?
                                        ratings.ratings.reduce((sum, rating) => rating.rating === 1 ? sum + 1 : sum, 0) / ratings.totalRatings * 100 : 0}
                                              className="w-56"
                                    />
                                </div>
                            </div>
                            <div className="grow">
                                {
                                    (() => {
                                        if (ratings.totalRatings === 0) {
                                            return (
                                                <Card className="h-36 min-w-72 max-w-80 flex items-center justify-center">
                                                    <CardDescription>Sé el primero en comentar</CardDescription>
                                                </Card>
                                            );
                                        } else if (ratings.ratings.length > 0) {
                                            const featuredRating = ratings.ratings[0];
                                            return (
                                                <Card className="h-36 min-w-72 max-w-80 flex flex-col p-2">
                                                    <CardTitle className="text-md italic">"{featuredRating.title}"</CardTitle>
                                                    <CardDescription className="line-clamp-2 mt-1">{featuredRating.description}</CardDescription>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <img alt={"Imagen de autor"} src={featuredRating.authorImgUrl} className="rounded-full w-8 h-8" />
                                                        <p className="text-sm">@{featuredRating.authorUsername}</p>
                                                        <Badge variant="outline">{featuredRating.format}</Badge>
                                                    </div>
                                                </Card>
                                            );
                                        }
                                    })()
                                }
                            </div>
                        </div>
                    </CardContent>
                )}

                {!showRatingForm && ratings.totalRatings > 0 && (
                    <CardContent className="pt-0">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full">Ver todas las valoraciones</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                <DialogHeader>
                                    <DialogTitle>Valoraciones</DialogTitle>
                                    <DialogDescription>{ratings.totalRatings} valoraciones</DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="max-h-[60vh]">
                                    <div className="flex flex-col gap-4 p-2">
                                        {ratings.ratings.map((rating, index) => (
                                            <ProductContainerRatingPopUpItem
                                                key={index}
                                                username={rating.authorUsername}
                                                imgUrl={rating.authorImgUrl}
                                                title={rating.title}
                                                description={rating.description}
                                                rating={rating.rating}
                                                date={new Date(rating.date).toLocaleDateString()}
                                                format={rating.format}
                                            />
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                )}
            </Card>
        </>
    );
};