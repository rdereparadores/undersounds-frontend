import { createContext } from 'react'

interface CheckoutContextProps {
    createOrder: () => Promise<void>,
    payButtonEnabled: boolean,
    setPayButtonEnabled: (value: boolean) => void,
    setAddress: (id: string) => void,
    onSuccess: (id: string) => Promise<void>
}

export const CheckoutContext = createContext<CheckoutContextProps>({
    createOrder: async () => {},
    payButtonEnabled: false,
    setPayButtonEnabled: () => {},
    setAddress: () => {},
    onSuccess: async () => {}
})