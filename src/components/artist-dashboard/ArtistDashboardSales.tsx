import { useCallback, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { DatePickerWithRange } from "../ui/date-picker-with-range"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { DateRange } from "react-day-picker"
import { Skeleton } from "../ui/skeleton"
import { useArtistStats } from "@/hooks/artist-stats/useArtistStats"
import { ArtistStatsProps } from "@/hooks/artist-stats/ArtistStatsContext"
import { toast } from "sonner"
import { Badge } from "../ui/badge"

interface Transaction {
    id: string
    productTitle: string
    format: 'digital' | 'cd' | 'vinyl' | 'cassette'
    amount: number
    earning: number
    date: Date
}

export const ArtistDashboardSalesTransactionItem = ({ transaction }: { transaction: Transaction }) => {
    return (
        <TableRow>
            <TableCell>{transaction.productTitle}</TableCell>
            <TableCell>
                <Badge variant="outline">
                    {transaction.format.charAt(0).toUpperCase() + transaction.format.slice(1)}
                </Badge>
            </TableCell>
            <TableCell>{transaction.amount.toFixed(2)} €</TableCell>
            <TableCell>{transaction.earning.toFixed(2)} €</TableCell>
            <TableCell className="text-right">
                <Badge>{new Date(transaction.date).toLocaleDateString()}</Badge>
            </TableCell>
        </TableRow>
    )
}

export const ArtistDashboardSalesTransactionsList = ({ transactions }: { transactions: Transaction[] }) => {
    const [visibleTransactions, setVisibleTransactions] = useState(3)

    const showMore = () => {
        setVisibleTransactions(prev => Math.min(prev + 5, transactions.length))
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Historial de transacciones</CardTitle>
                <CardDescription>
                    Mostrando {Math.min(visibleTransactions, transactions.length)} de {transactions.length} transacciones
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Artículo</TableHead>
                            <TableHead>Formato</TableHead>
                            <TableHead>Importe</TableHead>
                            <TableHead>Ganancia</TableHead>
                            <TableHead className="text-right">Fecha</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions
                                .slice(0, visibleTransactions)
                                .map(transaction => (
                                    <ArtistDashboardSalesTransactionItem
                                        key={transaction.id}
                                        transaction={transaction}
                                    />
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No hay transacciones en el período seleccionado</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {visibleTransactions < transactions.length && (
                    <Button
                        variant='outline'
                        className="w-full mt-2"
                        onClick={showMore}
                    >
                        Ver más
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}

export const ArtistDashboardSales = () => {
    const artistStats = useArtistStats()
    const [stats, setStats] = useState<ArtistStatsProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
    const [totalEarnings, setTotalEarnings] = useState(0)

    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: monthAgo,
        to: new Date(),
    })

    const filterTransactions = (allTransactions: Transaction[], range?: DateRange) => {
        if (!range || !range.from) {
            setFilteredTransactions(allTransactions)
            calculateTotalEarnings(allTransactions)
            return
        }

        const filtered = allTransactions.filter(transaction => {
            const transactionDate = new Date(transaction.date)

            if (range.from && !range.to) {
                return transactionDate >= range.from
            }

            if (range.from && range.to) {
                return transactionDate >= range.from && transactionDate <= range.to
            }

            return true
        })

        setFilteredTransactions(filtered)
        calculateTotalEarnings(filtered)
    }

    const calculateTotalEarnings = useCallback((transactions: Transaction[]) => {
        const total = transactions.reduce((sum, transaction) => sum + transaction.earning, 0)
        setTotalEarnings(total)
    }, []);

    const memoizedFilterTransactions = useCallback(filterTransactions, [calculateTotalEarnings]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const statsData = await artistStats.getArtistStats()
                setStats(statsData)

                const generatedTransactions = generateTransactions(statsData)
                setTransactions(generatedTransactions)

                memoizedFilterTransactions(generatedTransactions, dateRange)

            } catch (error) {
                console.error("Error fetching sales data:", error)
                toast.error("Error al cargar los datos de ventas")
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [artistStats, dateRange, memoizedFilterTransactions])

    const applyDateFilter = useCallback(() => {
        memoizedFilterTransactions(transactions, dateRange)
    }, [transactions, dateRange, memoizedFilterTransactions]);

    if (isLoading) {
        return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />
    }

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <div className="flex justify-between gap-4 flex-wrap">
                <h1 className="text-3xl font-medium">Ventas</h1>
                <div className="flex gap-2">
                    <DatePickerWithRange date={dateRange!} setDate={setDateRange} />
                    <Button onClick={applyDateFilter}>Aplicar</Button>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap">
                <Card className="grow">
                    <CardHeader>
                        <CardTitle>Ganancias</CardTitle>
                        <CardDescription>
                            {dateRange?.from && dateRange?.to ? (
                                `Del ${dateRange.from.toLocaleDateString()} al ${dateRange.to.toLocaleDateString()}`
                            ) : "Período actual"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-medium">{totalEarnings.toFixed(2)} €</p>
                    </CardContent>
                </Card>

                <Card className="grow">
                    <CardHeader>
                        <CardTitle>Formato más vendido</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <p className="text-xl font-medium">{stats?.mostSoldFormat.format}</p>
                            <p className="text-sm text-muted-foreground">
                                Representa el {stats?.mostSoldFormat.percentage}% de tus ventas
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <ArtistDashboardSalesTransactionsList transactions={filteredTransactions} />
        </div>
    )
}

function generateTransactions(stats: ArtistStatsProps | null): Transaction[] {
    if (!stats) return []

    const transactions: Transaction[] = []
    const productNames = stats?.topProducts.map((p) => p.title) || []
    const formats: ('digital' | 'cd' | 'vinyl' | 'cassette')[] = ['digital', 'cd', 'vinyl', 'cassette']

    const endDate = new Date()
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 3)

    const totalSales = stats ? (stats.copiesSold.thisMonth + stats.copiesSold.pastMonth) : 0

    for (let i = 0; i < totalSales; i++) {
        const productIndex = Math.floor(Math.pow(Math.random(), 2) * productNames.length)
        const productTitle = productNames[productIndex % productNames.length] || "Producto desconocido"

        const formatWeights = stats ? [
            stats.salesFormat.digital,
            stats.salesFormat.cd,
            stats.salesFormat.vinyl,
            stats.salesFormat.cassette
        ] : [1, 1, 1, 1]
        const totalWeight = formatWeights.reduce((sum, w) => sum + w, 0)

        let formatIndex = 0
        if (totalWeight > 0) {
            const random = Math.random() * totalWeight
            let sum = 0
            for (let j = 0; j < formatWeights.length; j++) {
                sum += formatWeights[j]
                if (random <= sum) {
                    formatIndex = j
                    break
                }
            }
        }

        const format = formats[formatIndex]

        const priceMap = {
            digital: { min: 5, max: 12 },
            cd: { min: 12, max: 20 },
            vinyl: { min: 20, max: 35 },
            cassette: { min: 10, max: 18 }
        }

        const price = Math.random() * (priceMap[format].max - priceMap[format].min) + priceMap[format].min
        const earning = price * 0.7

        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()))

        transactions.push({
            id: `trans-${i}`,
            productTitle,
            format,
            amount: price,
            earning,
            date: randomDate
        })
    }

    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
}