import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
    versions: string[];
    showOnlyBasic?: boolean;
}

const SaleItem = ({
                      title,
                      description,
                      price,
                      release_date,
                      current_version,
                      image,
                      versions,
                      showOnlyBasic = false,
                  }: SaleProps) => {
    if (showOnlyBasic) {
        return (
            <Card className="p-4 flex flex-col lg:flex-row justify-center">
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt={title}
                        className="w-44 h-44 object-cover rounded"
                    />
                </div>
                <CardContent className="flex flex-col justify-center items-center text-center flex-grow mt-2">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-black">{description}</p>
                    <div className="flex flex-col md:flex-row justify-center items-center text-center gap-6">
                        <Button
                            onClick={() =>
                                toast(`Reproduciendo ${title}`, {
                                    description: description,
                                    action: {
                                        label: "Detener",
                                        onClick: () => console.log("Detener"),
                                    },
                                })
                            }
                        >
                            Reproducir
                        </Button>
                        <Button
                            onClick={() =>
                                toast(`Pausando ${title}`, {
                                    description: description,
                                })
                            }
                        >
                            Pausar
                        </Button>
                        <Button
                            onClick={() =>
                                toast(`Descargando ${title}`, {
                                    description: description,
                                    action: {
                                        label: "Detener descarga",
                                        onClick: () => console.log("Detener descarga"),
                                    },
                                })
                            }
                        >
                            Descargar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Card className="p-4 flex flex-col lg:flex-row lg:justify-between">
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt={title}
                        className="w-44 h-44 object-cover rounded"
                    />
                </div>
                <CardContent className="flex flex-col gap-5 justify-center text-center flex-grow lg:flex-row lg:justify-between lg:text-left">
                    <div className="flex flex-col text-center lg:max-w-[300px] lg:text-left">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p className="text-black">{description}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Precio</h2>
                        <p className="text-black">${price}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Fecha de lanzamiento</h2>
                        <p className="text-black">{release_date}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Versión actual</h2>
                        <p className="text-black">{current_version}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Versiones</h2>
                        <Select>
                            <SelectTrigger className="w-[120px] text-lg">
                                <SelectValue placeholder="Elige" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Versiones disponibles</SelectLabel>
                                    {versions.map((version, index) => (
                                        <SelectItem key={index} value={version}>
                                            {version}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        );
    }
};

export default SaleItem;

