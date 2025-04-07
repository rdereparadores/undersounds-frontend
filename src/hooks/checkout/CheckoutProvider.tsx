import { useState } from "react";
import { CheckoutContext } from "./CheckoutContext";

interface CheckoutProviderProps {
    children: React.ReactNode
}

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
    const [payButtonEnabled, setPayButtonEnabledState] = useState(false)

    const createOrder = (addressId: string) => {
        console.log(addressId)
    }

    const setPayButtonEnabled = (value: boolean) => {
        setPayButtonEnabledState(value)
    }

    return (
        <CheckoutContext.Provider value={{ createOrder, payButtonEnabled, setPayButtonEnabled }}>
            {children}
        </CheckoutContext.Provider>
    )
}