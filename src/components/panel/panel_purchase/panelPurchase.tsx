import './panelPurchase.css';

interface PurchaseProps {
    title: string;
    description: string;
    date: string;
    price: string;
    status: string;
    provider: string;
    image: string;
}

const PurchaseItem = ({ title, description, date, price, status, provider, image }: PurchaseProps) => {
    return (
        <div className="purchase-container">
            <div
                className="album-image"
                style={{ backgroundImage: `url(${image})` }}
            />

            <div className="purchase-detail main-info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="purchase-detail">
                <span>Fecha</span>
                <p>{date}</p>
            </div>

            <div className="purchase-detail">
                <span>Precio</span>
                <p>{price}</p>
            </div>

            <div className="purchase-detail">
                <span>Estado</span>
                <p>{status}</p>
            </div>

            <div className="purchase-detail">
                <span>Proveedor</span>
                <p>{provider}</p>
            </div>
        </div>
    );
};

export default PurchaseItem;