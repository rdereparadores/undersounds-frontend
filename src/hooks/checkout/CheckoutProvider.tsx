import { useState } from "react";
import { CheckoutContext } from "./CheckoutContext";
import { api } from "@/lib/api";
import { useCart } from "../cart/useCart";

interface CheckoutProviderProps {
    children: React.ReactNode
}

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
    const [payButtonEnabled, setPayButtonEnabledState] = useState(false)
    const cart = useCart()
    const [ address, setAddress ] = useState<string>()

    const createOrder = async () => {
        const result = await api.post('/api/checkout/order/create', {
            cart: cart.cart!.items,
            addressId: address
        })
        if (result.data.error) return
        window.location.replace(result.data.data.url)
    }

    const setPayButtonEnabled = (value: boolean) => {
        setPayButtonEnabledState(value)
    }

    return (
        <CheckoutContext.Provider value={{ createOrder, payButtonEnabled, setPayButtonEnabled, setAddress }}>
            {children}
        </CheckoutContext.Provider>
    )
}