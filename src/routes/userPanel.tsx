//import MainBar from '@/components/panel/panelBar';
import ProfileHeader from '@/components/panel/panelProfile';
import OptionsPanel from '@/components/panel/panelOptions';
import PurchaseItem from '@/components/panel/panelPurchase';
import Purchase from '@/components/panel/panelPurchase';
import Statistics from '@/components/panel/statistics';
import {useState, useEffect} from 'react';


interface Purchase {
    title: string;
    description: string;
    date: string;
    price: string;
    status: string;
    provider: string;
    image: string;
    type: 'cancion' | 'album';
}

const chartData = [
    { browser: "top1", visitors: 27, fill: "var(--color-top1)" },
    { browser: "top2", visitors: 20, fill: "var(--color-top2)" },
    { browser: "top3", visitors: 18, fill: "var(--color-top3)" },
    { browser: "top4", visitors: 17, fill: "var(--color-top4)" },
    { browser: "top5", visitors: 9, fill: "var(--color-top5)" },
];

const chartConfig = {
    visitors: {
        label: "Compras",
    },
    top1: {
        label: "Olivia Rodrigo",
        color: "gray",
    },
    top2: {
        label: "Dua Lipa",
        color: "gray",
    },
    top3: {
        label: "Bad Bunny",
        color: "gray",
    },
    top4: {
        label: "Drake",
        color: "gray",
    },
    top5: {
        label: "Harry Styles",
        color: "gray",
    },
};

const totalPurchases = 58;

const UserPanel = () => {
    const [activeView, setActiveView] = useState('compras');
    const [filterType, setFilterType] = useState<string>('');
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        const dummyPurchases: Purchase[] = [
            { title: 'Arcane Season 1 (Soundtrack from the Animated Series)', description: 'The New Us Variant', date: '25/08/2024', price: '39,99€', status: 'Entregado', provider: 'Diggers Factory', image: '/images/compra1.jpg', type: 'cancion' },
            { title: 'KanYeWest-Graduation', description: 'Enjoy it', date: '20/02/2024', price: '29,99€', status: 'Entregado', provider: 'KanYeWest', image: "./images/KanYe.jpg", type: 'album' },
            { title: 'Dolce Vita', description: '', date: '26/05/2024', price: '29,99€', status: 'En proceso', provider: 'MusicWorld', image: '/images/compra2.jpg', type: 'cancion' },
            { title: 'GNX - Album', description: 'Vinilo negro.', date: '06/12/2023', price: '29,99€', status: 'Entregado', provider: 'MusicWorld', image: '../../../images/ken.webp', type: 'album' },

        ];
        setPurchases(dummyPurchases);
    }, []);

    // Filtrar compras en función del filtro seleccionado
    const filteredPurchases = filterType
        ? purchases.filter(purchase => purchase.type === filterType)
        : purchases;

    const showOnlyBasic = filterType !== '';

    return (
        <div className="w-full">
            {/*<MainBar /> */}
            <ProfileHeader />

            <div className="flex flex-wrap p-5">
                {/* Opciones */}
                <div className="xl:w-1/5 min-w-[200px] p-5 sm:w-full">
                    <OptionsPanel setActiveView={setActiveView} setFilterType={setFilterType} />
                </div>

                {/* Prueba estadísticas */}
                {activeView === 'statistics' &&(
                    <div className="lg:w-4/5 w-[100%]">
                        <Statistics
                            chartData={chartData}
                            chartConfig={chartConfig}
                            totalPurchases={totalPurchases}
                            userType="usuario"
                        />
                    </div>
                )}

                {/* Sección de compras */}
                {activeView === 'compras' && (
                    <div className="w-4/5 min-w-[300px] mx-auto p-5 lg:h-[400px] overflow-y-auto">
                        <h2>Reciente</h2>
                        <div className="grid gap-1 grid-cols-1">
                            {filteredPurchases.map((purchase, index) => (
                                <PurchaseItem key={index} {...purchase} showOnlyBasic={showOnlyBasic} />
                            ))}
                        </div>
                    </div>
                )}
            </div>


        </div>
    );

};

export default UserPanel;