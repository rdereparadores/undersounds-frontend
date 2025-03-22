import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProductContainerRatingPopUpItem } from "./ProductContainerRatingPopUpItem"
import { ScrollArea } from "@/components/ui/scroll-area"


export function ProductContainerRatingPopUp() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Ver valoraciones</Button>
            </DialogTrigger>
            <DialogContent className="sm:w-screen">
                <DialogHeader>
                    <DialogTitle>Valoraciones</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>    
                    <ScrollArea className="max-h-96">   
                        <div className="flex flex-col gap-2"> 
                            <ProductContainerRatingPopUpItem></ProductContainerRatingPopUpItem>
                            <ProductContainerRatingPopUpItem></ProductContainerRatingPopUpItem>
                            <ProductContainerRatingPopUpItem></ProductContainerRatingPopUpItem>
                            <ProductContainerRatingPopUpItem></ProductContainerRatingPopUpItem>
                        </div>
                    </ScrollArea>   
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
