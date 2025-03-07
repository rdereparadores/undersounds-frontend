import './panelSale.css';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from "@/components/ui/select";

interface SaleProps {
    title: string;
    description: string;
    price: string;
    release_date: string;
    current_version: string;
    image: string;
    versiones: string[];
}

const SaleItem = ({
                      title,
                      description,
                      price,
                      release_date,
                      current_version,
                      image,
                      versiones,
                  }: SaleProps) => {
    return (
        <div className="sale-container">
            <div
                className="profile-image"
                style={{ backgroundImage: `url(${image})` }}
            />

            <div className="sale-detail main-info">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="sale-detail">
                <span>Fecha de lanzamiento</span>
                <p>{release_date}</p>
            </div>

            <div className="sale-detail">
                <span>Versión actual</span>
                <p>{current_version}</p>
            </div>

            <div className="sale-detail">
                <span>Precio</span>
                <p>{price}</p>
            </div>

            <div className="sale-detail">
                <span>Versiones</span>
                <Select>
                    <SelectTrigger className="w-[120px] text-lg">
                        <SelectValue placeholder="Elige" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Versiones disponibles</SelectLabel>
                            {versiones.map((version, index) => (
                                <SelectItem key={index} value={version}>
                                    {version}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default SaleItem;