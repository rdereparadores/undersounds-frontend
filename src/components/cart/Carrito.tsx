import { ItemCesta } from "./ItemCesta"
import { Card } from "@/components/ui/card"
import { ItemsCestaProps } from "./ItemCesta"

interface ItemsProps {items:ItemsCestaProps[]}

function Carrito({items}:ItemsProps){
    return(
        <Card className="grow h-[80%] p-4 flex flex-col gap-6">
            <div className="flex justify-between">
                <p>Cesta</p>
            </div>
                        
            <div className="flex flex-col gap-3">
                {items.map((items,index) =>
                    <ItemCesta key={index} nombre={items.nombre} formato={items.formato} 
                    precio={items.precio} url={items.url}/>
                )}
            </div>
        </Card>
    )
}

export {Carrito}