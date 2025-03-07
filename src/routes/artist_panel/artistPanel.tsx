import './artistPanel.css';
import OptionsPanel from '../../components/panel/panel_options/panelOptions.tsx';
import MainBar from '../../components/panel/panel_bar/panelBar/panelBar.tsx';
import ProfileHeader from '../../components/panel/panel_profile/panelProfile.tsx';
import SaleItem from '../../components/panel/panel_sale/panelSale.tsx';

const ArtistPanel = () => {
    const sales = [
        {
            title: "LO K NO PUDE",
            description: "Descripción",
            price: "9,99€",
            release_date: "10/05/2024",
            current_version: "v1.0",
            discográfica: "",
            image: "",
            versiones: ["v1.0", "v1.1", "v1.2"]
        },
        {
            title: "Venta 4",
            description: "Descripción 4",
            price: "0,00€",
            release_date: "--/--/----",
            current_version: "v2.0",
            discográfica: "",
            image: "",
            versiones: ["v2.0", "v2.1"]
        },
        {
            title: "Venta 3",
            description: "Descripción 3",
            price: "0,00€",
            release_date: "--/--/----",
            current_version: "v3.0",
            discográfica: "",
            image: "",
            versiones: ["v3.0", "v3.1", "v3.2"]
        },
        {
            title: "Venta 2",
            description: "Descripción 2",
            price: "0,00€",
            release_date: "--/--/----",
            current_version: "v4.0",
            discográfica: "",
            image: "",
            versiones: ["v4.0", "v4.1"]
        },
        {
            title: "Venta 1",
            description: "Descripción 1",
            price: "0,00€",
            release_date: "--/--/----",
            current_version: "v5.0",
            discográfica: "",
            image: "",
            versiones: ["v5.0"]
        }
    ];

    return (
        <div className="page-container">

            <MainBar />


            <div className="main-content">
                <ProfileHeader />

                <div className="panels-container">
                    <OptionsPanel />

                    <section className="sales-section">
                        <h2>Reciente</h2>
                        <div className="sales-grid">
                            {sales.map((sale, index) => (
                                <SaleItem key={index} {...sale} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ArtistPanel;