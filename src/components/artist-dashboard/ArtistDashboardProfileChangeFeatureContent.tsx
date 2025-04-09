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
import { Button } from "../ui/button"
import { TableFeaturedContent } from "./ArtistDashboardProfileTableFeaturedContent"



export function ChangeFeatureContent() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="outline">Cambiar</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Destacar canción</DialogTitle>
                    <DialogDescription>
                        <p>Estas son todas las canciones que puedes destacar.</p>
                        <TableFeaturedContent />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button>Cancelar</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button>Confirmar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}