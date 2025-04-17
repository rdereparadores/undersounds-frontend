import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { ScrollArea } from "../ui/scroll-area"

//TODO hay que hacer la funcionalidad que pasandole un lista te muestre las canciones de esa lista

export const Entrada = () => {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <img src='https://picsum.photos/50' ></img>
            </TableCell>
            <TableCell>El cocodrilo</TableCell>
            <TableCell>King Africa</TableCell>
            <TableCell className="text-center">
                <Checkbox />
                <Label></Label>
            </TableCell>
        </TableRow>
    )
}


export function TableFeaturedContent() {
    return (
        <Table>
            <ScrollArea className="h-72 w-[100%] rounded-md border">
            <TableHeader>
                <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Artistas</TableHead>
                    <TableHead className="text-center">Selección</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
                    <Entrada></Entrada>
            </TableBody>
            </ScrollArea>
        </Table>
    )
}

