import {Card} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function SubTotal(){
    return(
        <Card className="min-w-72 w-72 grow h-32 flex p-4 flex-col justify-between">
            <div>
                <p>Subtotal (2 productos):</p>
                <p>51.98$</p>
            </div>
            <Button>Tramitar Pedido</Button>
        </Card>
    )
}

export {SubTotal}