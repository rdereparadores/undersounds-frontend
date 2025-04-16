import { Link } from "react-router";
import { Button } from "../ui/button";
import { GiCancel } from "react-icons/gi";

export const CheckoutDeny = () => {

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-3 mt-4 min-h-96">
                <GiCancel className="h-40 w-40"/>
                <p className="font-bold text-lg">No se ha podido completar su pedido.</p>
                <p className="text-large">Vuelva a intentarlo más tarde.</p>
                <Button>
                    <Link to='/'>Volver al inicio</Link>
                </Button>
            </div>
        </>
    )
}