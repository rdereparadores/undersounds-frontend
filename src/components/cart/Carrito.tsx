import { ItemCesta } from "./ItemCesta"
import { Card } from "@/components/ui/card"

function Carrito(){
    return(
        <Card className="grow h-[80%] p-4 flex flex-col gap-6">
            <div className="flex justify-between">
                <p>Cesta</p>
            </div>
                        
            <div className="flex flex-col gap-3">
                <ItemCesta></ItemCesta>
                <ItemCesta></ItemCesta>
                <ItemCesta></ItemCesta>
                <ItemCesta></ItemCesta>
            </div>
        </Card>
    )
}

export {Carrito}