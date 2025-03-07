import {Card} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function ItemCesta() {
  return (
     <Card className="w-[100%] flex p-4 gap-2">
      <img className="w-32 h-32 flex rounded-lg" src="https://picsum.photos/200"></img>

      <div className="flex flex-col grow">

        <div className="flex justify-between grow">

          <div>
            <p>Nombre articulo</p>
            <p>Formato: CD</p>
            <p>En stock</p>
          </div>

          <p>$25.99</p>

        </div>

        <div className="flex justify-end gap-2">

          <div>
            <Button variant="destructive" size="sm" >Eliminar</Button>
          </div>

          <div className="flex">
            <Button variant="outline" size="sm" className="flex rounded-e-none">-</Button>   
            <Input className="h-8 w-8 border border-input rounded-none bg-background shadow-sm"></Input>
            <Button variant="outline" size="sm" className="flex rounded-s-none">+</Button>
          </div>
        </div>

      </div>

     </Card>
  )
}

export {ItemCesta}