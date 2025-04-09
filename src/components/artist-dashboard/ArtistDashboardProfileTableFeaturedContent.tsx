import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

export const Entrada = () => {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <img src='https://picsum.photos/50' ></img>
            </TableCell>
            <TableCell>El cocodrilo</TableCell>
            <TableCell>King Africa</TableCell>
            <TableCell></TableCell>
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
            <TableCaption>Lista de las canciones disponibles para destacar.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Imagen</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Artistas</TableHead>
                    <TableHead>Álbum</TableHead>
                    <TableHead className="text-right">Selección</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <Entrada></Entrada>
                <Entrada></Entrada>
                <Entrada></Entrada>
            </TableBody>
        </Table>
    )
}

