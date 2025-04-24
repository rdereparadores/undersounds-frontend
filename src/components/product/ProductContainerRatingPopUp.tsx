import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProductContainerRatingPopUpItem } from "./ProductContainerRatingPopUpItem"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RatingProps } from "@/hooks/ratings/RatingsContext"


export function ProductContainerRatingPopUp({ ratings }: { ratings: RatingProps[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Ver valoraciones</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="-mt-2">
                    <DialogTitle>Valoraciones</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-96">
                    <div className="flex flex-col gap-2">
                        {ratings.map((rating, index) => (
                            <ProductContainerRatingPopUpItem
                                key={index}
                                username={rating.authorUsername}
                                imgUrl={rating.authorImgUrl}
                                title={rating.title}
                                description={rating.description}
                                rating={rating.rating}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}