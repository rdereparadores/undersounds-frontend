import { Card, CardContent } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PurchaseProps {
    title: string;
    description: string;
    date: string;
    price: string;
    status: string;
    provider: string;
    image: string;
    showOnlyBasic?: boolean;
}



const PurchaseItem = ({
      title,
      description,
      date,
      price,
      status,
      provider,
      image,
      showOnlyBasic = false,
      }: PurchaseProps) => {
    return (
        showOnlyBasic ? (
            <Card className="p-4 flex flex-row justify-center">
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt={""}
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
                                    description: `${description}`,
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
                                    description: `${description}`,
                                })
                            }
                        >
                            Pausar
                        </Button>
                        <Button
                            onClick={() =>
                                toast(`Descargando ${title}`, {
                                    description: `${description}`,
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
        ) : (
            <Card className="p-4 flex flex-col lg:flex-row lg:justify-between">
                <div className="flex justify-center">
                    <img
                        src={image}
                        alt={""}
                        className="w-44 h-44 object-cover rounded"
                    />
                </div>
                <CardContent
                    className="flex flex-col justify-center text-center flex-grow mt-2 lg:flex-row lg:justify-between lg:text-left">
                    <div className="flex flex-col text-center lg:max-w-[300px] lg:text-left">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <p className="black">{description}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Precio</h2>
                        <p className="text-black">${price}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Fecha de compra</h2>
                        <p className="black">{date}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Estado</h2>
                        <p className="black">{status}</p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">Proveedor</h2>
                        <p className="black">{provider}</p>
                    </div>
                </CardContent>
            </Card>
        )
    );
}
export default PurchaseItem;