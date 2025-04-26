import React, { useCallback, useEffect, useState } from "react";
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
    Transaction,
    FormatStats
} from "@/hooks/artist-profile/ArtistProfileContext";
import { useArtistProfile } from "@/hooks/artist-profile/useArtistProfile";

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
                        src={transaction.imgUrl || "/public/uploads/song/cover/generic.jpg"}
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
    const totalPages = Math.ceil((transactions?.length || 0) / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTransactions = transactions?.slice(startIndex, endIndex) || [];

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
                    {Math.min(endIndex, transactions?.length || 0) - startIndex} de{" "}
                    {transactions?.length || 0} transacciones
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
                        {transactions && transactions.length > 0 ? (
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

                {transactions && transactions.length > 0 && (
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
    const { getArtistTransactions, calculateTransactionStats } = useArtistProfile();
    const [isLoading, setIsLoading] = useState(true);
    const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [mostSoldFormat, setMostSoldFormat] = useState<FormatStats | null>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(initialDateRange);

    const fetchTransactions = useCallback(async () => {
        try {
            setIsLoading(true);
            const transactions = await getArtistTransactions();
            setAllTransactions(transactions || []);
            setFilteredTransactions(transactions || []);

            if (transactions && transactions.length > 0) {
                const stats = calculateTransactionStats(transactions);
                setTotalEarnings(stats.totalEarnings);
                setMostSoldFormat(stats.mostSoldFormat);
            } else {
                setTotalEarnings(0);
                setMostSoldFormat(null);
            }
        } catch (error: unknown) {
            console.error("Error fetching transactions", error);
            const message = error instanceof Error ? error.message : "Error desconocido";
            toast.error(`Error al cargar transacciones: ${message}`);

            setAllTransactions([]);
            setFilteredTransactions([]);
            setTotalEarnings(0);
            setMostSoldFormat(null);
        } finally {
            setIsLoading(false);
        }
    }, [getArtistTransactions, calculateTransactionStats]);

    const applyDateFilter = useCallback(() => {
        if (!allTransactions || allTransactions.length === 0) {
            setFilteredTransactions([]);
            setTotalEarnings(0);
            setMostSoldFormat(null);
            return;
        }

        if (!dateRange?.from) {
            setFilteredTransactions(allTransactions);
            const stats = calculateTransactionStats(allTransactions);
            setTotalEarnings(stats.totalEarnings);
            setMostSoldFormat(stats.mostSoldFormat);
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

        if (filtered.length > 0) {
            const stats = calculateTransactionStats(filtered);
            setTotalEarnings(stats.totalEarnings);
            setMostSoldFormat(stats.mostSoldFormat);
        } else {
            setTotalEarnings(0);
            setMostSoldFormat(null);
        }
    }, [allTransactions, dateRange, calculateTransactionStats]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    useEffect(() => {
        if (allTransactions && allTransactions.length > 0) {
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
                        {mostSoldFormat && mostSoldFormat.format ? (
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