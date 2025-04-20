import { Link, useParams } from "react-router";
import { Button } from "../ui/button";
import { GiConfirmed } from "react-icons/gi";
import { useEffect } from "react";
import { useCheckout } from "@/hooks/checkout/useCheckout";

export const CheckoutSucces = () => {
    const params = useParams()
    const checkout = useCheckout()

    useEffect(() => {
        checkout.onSuccess(params.id!)
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-3 mt-4 min-h-96">
                <GiConfirmed className="h-40 w-40"/>
                <p className="font-bold text-lg">Muchas gracias por su pedido.</p>
                <p className="text-large">Pronto recibirá un correo de confirmación.</p>
                <Button>
                    <Link to='/user/dashboard/orders'>Ver mis pedidos</Link>
                </Button>
            </div>
        </>
    )
}