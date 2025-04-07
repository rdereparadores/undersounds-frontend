import { createContext } from 'react'

interface CheckoutContextProps {
    createOrder: (addressId: string) => void,
    payButtonEnabled: boolean,
    setPayButtonEnabled: (value: boolean) => void
}

export const CheckoutContext = createContext<CheckoutContextProps>({
    createOrder: () => {},
    payButtonEnabled: false,
    setPayButtonEnabled: () => {}
})