import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { DatePickerWithRange } from "../ui/date-picker-with-range"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DateRange } from "react-day-picker"

export const ArtistDashboardSalesTransactionItem = () => {
    return (
        <TableRow>
            <TableCell>Canción</TableCell>
            <TableCell>CD</TableCell>
            <TableCell>18,99 €</TableCell>
            <TableCell>4,99 €</TableCell>
            <TableCell className="text-right"><Button variant='outline'>Ver desglose</Button></TableCell>
        </TableRow>
    )
}

export const ArtistDashboardSalesTransactionsList = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Historial de transacciones</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Artículo</TableHead>
                            <TableHead>Formato</TableHead>
                            <TableHead>Importe</TableHead>
                            <TableHead>Ganancia</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <ArtistDashboardSalesTransactionItem />
                        <ArtistDashboardSalesTransactionItem />
                        <ArtistDashboardSalesTransactionItem />
                    </TableBody>
                </Table>
                <Button variant='outline' className="w-full mt-2">Ver todo</Button>
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardSales = () => {
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: monthAgo,
        to: new Date(),
    })

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <div className="flex justify-between gap-4">
                <h1 className="text-3xl font-medium">Ventas</h1>
                <div className="flex gap-2">
                    <DatePickerWithRange date={date!} setDate={setDate} />
                    <Button>Aplicar</Button>
                </div>
            </div>
            <div className="flex gap-4">
                <Card className="grow">
                    <CardHeader>
                        <CardTitle>Ganancias</CardTitle>
                        <CardDescription>Beneficio neto</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-medium">2561,76 €</p>
                    </CardContent>
                </Card>
            </div>
            <ArtistDashboardSalesTransactionsList />
        </div>
    )
}