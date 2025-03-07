//import './userPanel.css';
import './userPanel.css';
import MainBar from '../../components/panel/panel_bar/panelBar.tsx';
import ProfileHeader from '../../components/panel/panel_profile/panelProfile.tsx';
import OptionsPanel from '../../components/panel/panel_options/panelOptions.tsx';
import PurchaseItem from '../../components/panel/panel_purchase/panelPurchase.tsx';

const UserPanel = () => {
    const purchases = [
        {
            title: "Camiseta AC/DC Luxemburgo Edition",
            description: "Camiseta de Cuello Redondo para Hombre con Estampado Gráfico de AC/DC - Negra, Ligera y Transpirable",
            date: "25/01/2025",
            price: "9,00€",
            status: "Enviado",
            provider: "Camsl",
            image: ""
        }, {
            title: "Compra 4",
            description: "Descripción 4",
            date: "25/08/2024",
            price: "39,99€",
            status: "Entregado",
            provider: "ElectroStore",
            image: ""
        },
        {
            title: "Compra 3",
            description: "Descripción 3",
            date: "10/02/2024",
            price: "59,99€",
            status: "Entregado",
            provider: "SneakersPro",
            image: ""
        },
        {
            title: "Compra 2",
            description: "Descripción 2",
            date: "--/--/----",
            price: "-",
            status: "-",
            provider: "-",
            image: ""
        },
        {
            title: "Compra 1",
            description: "Descripción 1",
            date: "--/--/----",
            price: "-",
            status: "-",
            provider: "-",
            image: ""
        }
        // ... resto de las compras
    ];

    return (
        <div className="page-container">
            <MainBar />


            <div className="main-content">
                <ProfileHeader />

                <div className="panels-container">
                    <OptionsPanel />

                    <section className="purchases-section">
                        <h2>Últimas compras</h2>
                        <div className="purchases-grid">
                            {purchases.map((purchase, index) => (
                                <PurchaseItem key={index} {...purchase} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;