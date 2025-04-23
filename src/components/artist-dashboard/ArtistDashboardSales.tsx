import React, { useCallback, useEffect, useState, useContext } from "react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { DatePickerWithRange } from "../ui/date-picker-with-range";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { DateRange } from "react-day-picker";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import {
    ArtistProfileContext,
    Transaction,
} from "@/hooks/artist-profile/ArtistProfileContext";

interface ArtistDashboardSalesTransactionItemProps {
    transaction: Transaction;
}

const ArtistDashboardSalesTransactionItem: React.FC<ArtistDashboardSalesTransactionItemProps> = ({
                                                                                                     transaction,
                                                                                                 }) => {
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <TableRow>
            <TableCell>
                <div className="flex items-center gap-2">
                    {!imgLoaded && <Skeleton className="w-10 h-10 rounded-md" />}
                    <img
                        src={
                            transaction.imgUrl ||
                            "/public/uploads/song/cover/generic.jpg"
                        }
                        alt={transaction.productTitle}
                        className="w-10 h-10 rounded-md object-cover"
                        onLoad={() => setImgLoaded(true)}
                        hidden={!imgLoaded}
                    />
                    <span>{transaction.productTitle}</span>
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="outline">
                    {transaction.format.charAt(0).toUpperCase() +
                        transaction.format.slice(1)}
                </Badge>
            </TableCell>
            <TableCell>{transaction.amount.toFixed(2)} €</TableCell>
            <TableCell>{transaction.earning.toFixed(2)} €</TableCell>
            <TableCell className="text-right">
                <Badge>
                    {new Date(transaction.date).toLocaleDateString()}
                </Badge>
            </TableCell>
        </TableRow>
    );
};

interface ArtistDashboardSalesTransactionsListProps {
    transactions: Transaction[];
    isLoading: boolean;
}

const ArtistDashboardSalesTransactionsList: React.FC<ArtistDashboardSalesTransactionsListProps> = ({
                                                                                                       transactions,
                                                                                                       isLoading,
                                                                                                   }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTransactions = transactions.slice(startIndex, endIndex);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Skeleton className="h-8 w-48" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-64 w-full" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Historial de transacciones</CardTitle>
                <CardDescription>
                    Mostrando{" "}
                    {Math.min(endIndex, transactions.length) - startIndex} de{" "}
                    {transactions.length} transacciones
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
                            currentTransactions.map((transaction, index) => (
                                <ArtistDashboardSalesTransactionItem
                                    key={`${transaction.id}-${index}`}
                                    transaction={transaction}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center"
                                >
                                    No hay transacciones en el período seleccionado
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {transactions.length > 0 && (
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            variant="outline"
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </Button>
                        <span>
              Página {currentPage} de {totalPages}
            </span>
                        <Button
                            variant="outline"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

interface ArtistDashboardSalesProps {
    initialDateRange?: DateRange;
}

export const ArtistDashboardSales: React.FC<ArtistDashboardSalesProps> = ({ initialDateRange }) => {
    const { getArtistTransactions } = useContext(ArtistProfileContext);
    const [isLoading, setIsLoading] = useState(true);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [mostSoldFormat, setMostSoldFormat] = useState<{ format: string, percentage: number } | null>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);

    const calculateTotalEarnings = useCallback((txs: Transaction[]) => {
        const total = txs.reduce((sum, t) => sum + t.earning, 0);
        setTotalEarnings(total);
    }, []);

    const calculateMostSoldFormat = useCallback((txs: Transaction[]) => {
        const formatCount: Record<string, number> = {};

        txs.forEach(t => {
            formatCount[t.format] = (formatCount[t.format] || 0) + 1;
        });

        const total = txs.length;
        const sortedFormats = Object.entries(formatCount).sort((a, b) => b[1] - a[1]);

        if (sortedFormats.length > 0) {
            const [format, count] = sortedFormats[0];
            const percentage = Math.round((count / total) * 100);
            setMostSoldFormat({ format, percentage });
        } else {
            setMostSoldFormat(null);
        }
    }, []);

    const fetchTransactions = useCallback(async () => {
        try {
            setIsLoading(true);
            const transactions = await getArtistTransactions();
            setAllTransactions(transactions);
            setFilteredTransactions(transactions);
            calculateTotalEarnings(transactions);
            calculateMostSoldFormat(transactions);
        } catch (error: unknown) {
            console.error("Error fetching transactions", error);
            const message = error instanceof Error ? error.message : "Error desconocido";
            toast.error(`Error al cargar transacciones: ${message}`);
        } finally {
            setIsLoading(false);
        }
    }, [getArtistTransactions, calculateTotalEarnings, calculateMostSoldFormat]);

    const applyDateFilter = useCallback(() => {
        if (!dateRange?.from) {
            setFilteredTransactions(allTransactions);
            calculateTotalEarnings(allTransactions);
            calculateMostSoldFormat(allTransactions);
            return;
        }

        const startDate = new Date(dateRange.from);
        startDate.setHours(0, 0, 0, 0);
        const endDate = dateRange.to ? new Date(dateRange.to) : new Date();
        endDate.setHours(23, 59, 59, 999);

        const filtered = allTransactions.filter(transaction => {
            const txDate = new Date(transaction.date);
            return txDate >= startDate && txDate <= endDate;
        });

        setFilteredTransactions(filtered);
        calculateTotalEarnings(filtered);
        calculateMostSoldFormat(filtered);
    }, [allTransactions, dateRange, calculateTotalEarnings, calculateMostSoldFormat]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    useEffect(() => {
        if (allTransactions.length > 0) {
            applyDateFilter();
        }
    }, [dateRange, allTransactions, applyDateFilter]);

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <div className="flex justify-between gap-4 flex-wrap">
                <h1 className="text-3xl font-medium">Ventas</h1>
                <div className="flex gap-2">
                    <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                    <Button onClick={applyDateFilter}>Aplicar</Button>
                </div>
            </div>

            <div className="flex gap-4 flex-wrap">
                <Card className="grow">
                    <CardHeader>
                        <CardTitle>Ganancias</CardTitle>
                        <CardDescription>
                            {dateRange?.from && dateRange?.to
                                ? `Del ${dateRange.from.toLocaleDateString()} al ${dateRange.to.toLocaleDateString()}`
                                : dateRange?.from
                                    ? `Desde ${dateRange.from.toLocaleDateString()}`
                                    : "Todo el período"}
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
                        {mostSoldFormat ? (
                            <div className="flex flex-col gap-2">
                                <p className="text-xl font-medium">{mostSoldFormat.format}</p>
                                <p className="text-sm text-muted-foreground">
                                    Representa el {mostSoldFormat.percentage}% de tus ventas
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No hay ventas registradas</p>
                        )}
                    </CardContent>
                </Card>
            </div>

            <ArtistDashboardSalesTransactionsList
                transactions={filteredTransactions}
                isLoading={isLoading}
            />
        </div>
    );
};
