import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { useArtist } from "@/hooks/artist/useArtist"
import { ArtistInfoProps } from "@/hooks/artist/ArtistContext"
import { useArtistStats } from "@/hooks/artist-stats/useArtistStats"
import { ArtistStatsProps } from "@/hooks/artist-stats/ArtistStatsContext"
import { Link } from "react-router"
import { useArtistProfile } from "@/hooks/artist-profile/useArtistProfile"
import { Transaction } from "@/hooks/artist-profile/ArtistProfileContext"

export const ArtistDashboard = () => {
    const artist = useArtist()
    const artistStats = useArtistStats()
    const { getArtistTransactions, calculateTransactionStats } = useArtistProfile()
    const [artistData, setArtistData] = useState<ArtistInfoProps | undefined>(undefined)
    const [stats, setStats] = useState<ArtistStatsProps | undefined>(undefined)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let artistInfo, statsData, transactionsData: Transaction[];

                try {
                    artistInfo = await artist.getArtistInfo();
                } catch (error) {
                    console.error("Error fetching artist info:", error);
                    artistInfo = undefined;
                }

                try {
                    statsData = await artistStats.getArtistStats();
                } catch (error) {
                    console.error("Error fetching artist stats:", error);
                    statsData = undefined;
                }

                try {
                    transactionsData = await getArtistTransactions();
                } catch (error) {
                    console.error("Error fetching transactions:", error);
                    transactionsData = [];
                }

                if (artistInfo) setArtistData(artistInfo);
                if (statsData) setStats(statsData);
                setTransactions(transactionsData || []);
            } catch (error) {
                console.error("Error fetching artist data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [artist, artistStats, getArtistTransactions])

    if (isLoading || !artistData || !stats) {
        return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />
    }

    const transactionStats = calculateTransactionStats(transactions)

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Hola, {artistData.artistUsername}</h1>

            <div className="flex flex-col md:flex-row gap-3 h-fit">
                <div className="flex-col w-full md:w-[50%] h-fit">
                    <Card className="grow min-w-fit mb-3">
                        <CardHeader className="pb-2">
                            <CardTitle>Copias vendidas</CardTitle>
                            <CardDescription>Último mes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-3xl">{stats.copiesSold.thisMonth}</p>
                            <CardDescription className="flex gap-1">
                                {stats.copiesSold.thisMonth > stats.copiesSold.pastMonth ? (
                                    <>
                                        <IoIosTrendingUp className="mt-1 text-green-500" />
                                        {calculatePercentageChange(stats.copiesSold.thisMonth, stats.copiesSold.pastMonth)}% más que el mes anterior
                                    </>
                                ) : (
                                    <>
                                        <IoIosTrendingDown className="mt-1 text-red-500" />
                                        {calculatePercentageChange(stats.copiesSold.pastMonth, stats.copiesSold.thisMonth)}% menos que el mes anterior
                                    </>
                                )}
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="grow min-w-fit h-fit">
                        <CardHeader className="pb-2">
                            <CardTitle>Oyentes únicos</CardTitle>
                            <CardDescription>Último mes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="font-bold text-3xl">{stats.monthlyListeners.thisMonth}</p>
                            <CardDescription className="flex gap-1">
                                {stats.monthlyListeners.thisMonth > stats.monthlyListeners.pastMonth ? (
                                    <>
                                        <IoIosTrendingUp className="mt-1 text-green-500" />
                                        {stats.monthlyListeners.thisMonth - stats.monthlyListeners.pastMonth} más que el mes anterior
                                    </>
                                ) : (
                                    <>
                                        <IoIosTrendingDown className="mt-1 text-red-500" />
                                        {stats.monthlyListeners.pastMonth - stats.monthlyListeners.thisMonth} menos que el mes anterior
                                    </>
                                )}
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full md:w-[50%] h-full">
                    <ArtistDashboardReviewLastSong
                        mostSoldFormat={transactionStats.mostSoldFormat}
                        salesFormat={transactionStats.salesByFormat}
                    />
                </div>
            </div>
            <div className="flex flex-wrap 2xl:flex-nowrap gap-4">
                <ArtistDashboardLastSongs topProducts={transactionStats.topProducts} />
            </div>
        </div>
    )
}

const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
}

interface ArtistDashboardLastSongsProps {
    topProducts: Array<{
        title: string;
        sales: number;
        imgUrl: string;
    }>;
}

export const ArtistDashboardLastSongs: React.FC<ArtistDashboardLastSongsProps> = ({ topProducts }) => {
    return (
        <Card className="grow w-[100%]">
            <CardHeader>
                <CardTitle className="text-xl">Productos más vendidos</CardTitle>
                <p>Descubre qué productos son los más populares</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Table>
                    <TableBody>
                        {topProducts && topProducts.length > 0 ? (
                            topProducts.map((product, index) => (
                                <ArtistDashboardLastSongsSong
                                    key={index}
                                    title={product.title}
                                    sales={product.sales}
                                    imgUrl={product.imgUrl}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No hay datos disponibles</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

interface ArtistDashboardLastSongsSongProps {
    title: string;
    sales: number;
    imgUrl: string;
}

export const ArtistDashboardLastSongsSong: React.FC<ArtistDashboardLastSongsSongProps> = ({
                                                                                              title,
                                                                                              sales,
                                                                                              imgUrl
                                                                                          }) => {
    return (
        <TableRow>
            <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                    <img
                        className="rounded-full w-12 h-12 object-cover"
                        src={imgUrl || "/default-album-cover.jpg"}
                        alt="Imagen de producto"
                    />
                    <span>{title}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center">
                    <IoIosTrendingUp className="mr-1 text-green-500" />
                    <p>Tendencia positiva</p>
                </div>
            </TableCell>
            <TableCell>{sales} ventas</TableCell>
        </TableRow>
    )
}

interface ArtistDashboardReviewLastSongProps {
    mostSoldFormat: {
        format: string;
        percentage: number;
    };
    salesFormat: Record<string, number>;
}

export const ArtistDashboardReviewLastSong: React.FC<ArtistDashboardReviewLastSongProps> = ({
                                                                                                mostSoldFormat,
                                                                                                salesFormat
                                                                                            }) => {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex justify-between items-center flex-wrap">
                    <div>
                        <CardTitle className="text-xl">Formato más vendido</CardTitle>
                        <p>Análisis de los formatos más populares de tus lanzamientos</p>
                    </div>
                    <div>
                        <Button asChild>
                            <Link to="/artist/dashboard/sales">Ver ventas</Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
                <div className="w-full">
                    {mostSoldFormat && mostSoldFormat.format ? (
                        <p className="font-bold text-xl mb-2">
                            {mostSoldFormat.format} ({mostSoldFormat.percentage}%)
                        </p>
                    ) : (
                        <p className="font-bold text-xl mb-2">No hay datos disponibles</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {salesFormat && Object.entries(salesFormat).map(([format, amount]) => (
                            <Badge
                                key={format}
                                variant={format === (mostSoldFormat?.format || '').toLowerCase() ? "default" : "outline"}
                                className="text-md"
                            >
                                {format.charAt(0).toUpperCase() + format.slice(1)}: {amount}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}