import { Carrito } from "../components/cart/Carrito";
import { SubTotal } from "../components/cart/SubTotal";


function PaginaCesta() {
    return (
        <div className="flex flex-wrap p-4 pt-36 gap-4 h-fit w-full">
            <Carrito></Carrito>
            <SubTotal></SubTotal>
        </div>
    )
}

export { PaginaCesta }