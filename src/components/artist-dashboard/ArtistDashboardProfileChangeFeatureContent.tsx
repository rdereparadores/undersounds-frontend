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
import { useState } from "react"


export function ChangeFeatureContent() {

    const [selectedSongsList, setSelectedSongsList] = useState<string[]>([])
    
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
                        <TableFeaturedContent selectedSongsList={selectedSongsList} setSelectedSongsList={setSelectedSongsList}/>
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