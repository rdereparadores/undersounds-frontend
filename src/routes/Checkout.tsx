import { DatosPersonales } from "../components/checkout/DatosPersonales";
import { SubTotal } from "../components/cart/SubTotal";


function PaginaCheckout() {
    return (
        <div className="flex flex-wrap p-4 pt-36 gap-4 h-fit w-full">
            <DatosPersonales ></DatosPersonales>
            <SubTotal></SubTotal>
        </div>
    )
}

export { PaginaCheckout }