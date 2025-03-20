//import MainBar from '@/components/panel/PanelBar/panelBar';
import ProfileHeader from '@/components/panel/panelProfile';
import OptionsPanel from '@/components/panel/panelOptions';
import SaleItem from '@/components/panel/panelSale';
import Statistics from '@/components/panel/statistics';
import { useState, useEffect } from 'react';

interface Sale {
    title: string;
    description: string;
    price: string;
    release_date: string;
    current_version: string;
    image: string;
    versions: string[];
    type: 'cancion' | 'album';
}

const chartData = [
    { browser: "top1", visitors: 35, fill: "var(--color-top1)" },
    { browser: "top2", visitors: 25, fill: "var(--color-top2)" },
    { browser: "top3", visitors: 15, fill: "var(--color-top3)" },
    { browser: "top4", visitors: 10, fill: "var(--color-top4)" },
    { browser: "top5", visitors: 5, fill: "var(--color-top5)" },
];

const chartConfig = {
    visitors: {
        label: "Ventas",
    },
    top1: {
        label: "Flaustist",
        color: "gray",
    },
    top2: {
        label: "Lo que supe",
        color: "gray",
    },
    top3: {
        label: "Sin más",
        color: "gray",
    },
    top4: {
        label: "Síndrome de estocolmo",
        color: "gray",
    },
    top5: {
        label: "Por hacer",
        color: "gray",
    },
};

const ArtistPanel = () => {
    const [activeView, setActiveView] = useState('compras');
    const [filter, setFilter] = useState<string>('');
    const [sales, setSales] = useState<Sale[]>([]);

    useEffect(() => {
        const dummySales: Sale[] = [
            {
                title: 'Flaustist',
                description: 'El mejor álbum del año que viene.',
                price: '19,99€',
                release_date: '01/01/2024',
                current_version: 'v1.0',
                image: '',
                versions: ['v1.0', 'v1.1', 'v1.2'],
                type: "album"
            },
            {
                title: 'Lo que supe',
                description: 'Hit del invierno.',
                price: '1,29€',
                release_date: '15/02/2024',
                current_version: 'v2.0',
                image: '',
                versions: ['v2.0', 'v2.1'],
                type: "cancion"
            },
            {
                title: 'Síndrome de estocolmo',
                description: 'Sencillo que rompe esquemas.',
                price: '0,99€',
                release_date: '10/03/2024',
                current_version: 'v1.0',
                image: '',
                versions: ['v1.0'],
                type: "cancion"
            },            {
                title: 'Sin más',
                description: 'Hit del otoño.',
                price: '4,29€',
                release_date: '10/01/2024',
                current_version: 'v2.0',
                image: '',
                versions: ['v2.0', 'v2.1'],
                type: "cancion"
            },
            {
                title: 'Por hacer',
                description: 'Hit de primavera.',
                price: '2,29€',
                release_date: '15/02/2023',
                current_version: 'v2.0',
                image: '',
                versions: ['v2.0', 'v3.0'],
                type: "cancion"
            }
        ];
        setSales(dummySales);
    }, []);

    // Filtrar ventas en función del filtro seleccionado
    const filteredSales = filter
        ? sales.filter(sale => sale.type === filter)
        : sales;

    // Definir showOnlyBasic en función de si se aplica un filtro
    const showOnlyBasic = filter !== '';


    return (
        <div className="w-full">
            {/*<MainBar />*/}
            <ProfileHeader />

            <div className="flex flex-wrap p-5">
                {/* Opciones */}
                <div className="xl:w-1/5 min-w-[200px] p-5 sm:w-full">
                    <OptionsPanel setActiveView={setActiveView} setFilterType={setFilter} />
                </div>

                {/* Vista de estadísticas */}
                {activeView === 'statistics' && (
                    <div className="lg:w-4/5 w-[100%]">
                        <Statistics
                            chartData={chartData}
                            chartConfig={chartConfig}
                            totalPurchases={100}
                            userType="artista"
                        />
                    </div>
                )}

                {/* Sección de ventas */}
                {activeView === 'compras' && (
                    <div className="w-4/5 min-w-[300px] mx-auto p-5 lg:h-[400px] overflow-y-auto">
                        <h2>Reciente</h2>
                        <div className="grid gap-1 grid-cols-1">
                            {filteredSales.map((sale, index) => (
                                <SaleItem key={index} {...sale} showOnlyBasic={showOnlyBasic} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtistPanel;
