import { Carrito } from "./Carrito";
import { SubTotal } from "./SubTotal";

const ejemplo = [
    {
        nombre: "YHLQMDLG",
        formato: "CD",
        precio: 7.99,
        url: "https://picsum.photos/200/300"
    },
    {
        nombre: "Tickets to my downfall",
        formato: "Vinilo",
        precio: 10,
        url:"https://picsum.photos/200/300"
    },
    {
        nombre: "Thriller",
        formato: "MP3",
        precio: 15,
        url:"https://picsum.photos/200/300"
    }
]

export function Cart(){
    return(
        <div className="flex p-2 gap-4 flex-wrap mt-48">
            <Carrito items={ejemplo}></Carrito>
            <SubTotal></SubTotal>
        </div>
    )

}