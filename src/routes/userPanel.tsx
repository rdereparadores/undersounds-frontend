//import MainBar from '@/components/panel/panelBar';
import ProfileHeader from '@/components/panel/panelProfile';
import OptionsPanel from '@/components/panel/panelOptions';
import PurchaseItem from '@/components/panel/panelPurchase';
import Purchase from '@/components/panel/panelPurchase';
import Component from '@/components/panel/statistics';
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


const UserPanel = () => {
    const [activeView, setActiveView] = useState('compras');
    const [filterType, setFilterType] = useState<string>('');
    const [purchases, setPurchases] = useState<Purchase[]>([]);

    useEffect(() => {
        const dummyPurchases: Purchase[] = [
            { title: 'Arcane Season 1 (Soundtrack from the Animated Series)', description: 'The New Us Variant', date: '25/08/2024', price: '39,99€', status: 'Entregado', provider: 'Diggers Factory', image: '', type: 'cancion' },
            { title: 'KanYeWest-Graduation', description: 'Enjoy it', date: '20/02/2024', price: '29,99€', status: 'Entregado', provider: 'KanYeWest', image: "", type: 'album' },
            { title: 'Dolce Vita', description: '', date: '26/05/2024', price: '10,50€', status: 'En proceso', provider: 'MusicWorld', image: '', type: 'cancion' },
            { title: 'GNX - Album', description: 'Vinilo negro.', date: '06/12/2023', price: '9,99€', status: 'Entregado', provider: 'MusicWorld', image: '', type: 'album' },
            { title: 'Californication (LP-Vinilo)', description: 'Californication es una canción del grupo musical Red Hot Chili Peppers incluida en su séptimo álbum de estudio.', date: '20/05/1999', price: '19,99€', status: 'Entregado', provider: 'Rick Rubin', image: '', type: 'album' },
            { title: 'Gimme Love', description: 'By Joji', date: '15/01/2024', price: '4,99€', status: 'Entregado', provider: 'Nectar', image: '', type: 'cancion' },
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
            {/*<MainBar />*/}
            <ProfileHeader />

            <div className="flex flex-wrap p-5">
                {/* Opciones */}
                <div className="xl:w-1/5 min-w-[200px] p-5 sm:w-full">
                    <OptionsPanel setActiveView={setActiveView} setFilterType={setFilterType} />
                </div>

                {/* Prueba estadísticas */}
                {activeView === 'statistics' &&(
                    <div className="w-4/5">
                        <Component/>
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