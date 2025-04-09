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
import { useProduct } from "@/hooks/product/useProduct"
import { DialogDescription } from "@radix-ui/react-dialog"


export function ProductContainerRatingPopUp() {
    const product = useProduct()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Ver valoraciones</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="-mt-2">
                    <DialogTitle>Valoraciones</DialogTitle>
                    <DialogDescription>{product.queryResult && product.queryResult!.ratings.list.length} valoraciones</DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-96">
                    <div className="flex flex-col gap-2">
                        {product.queryResult?.ratings.list.map((rating, index) => (
                            <ProductContainerRatingPopUpItem
                                key={index}
                                username={rating.username}
                                imgUrl={rating.userImgUrl}
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
