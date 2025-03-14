import {Card} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface ItemsCestaProps {nombre:string, formato:string, precio:number, url:string}

function ItemCesta({nombre,formato,precio,url}:ItemsCestaProps) {
  return (
     <Card className="flex p-4 gap-2">
      <img className="w-32 h-32 flex rounded-lg" src={url}></img>

      <div className="flex flex-col grow">

        <div className="flex justify-between grow">

          <div>
            <p>Nombre {nombre}</p>
            <p>Formato: {formato}</p>
            <p>En stock</p>
          </div>

          <p>${precio}</p>

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