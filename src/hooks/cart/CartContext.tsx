import { createContext } from "react"

export interface CartItemProps {
    type: string,
    format: 'cd' | 'digital' | 'cassette' | 'vinyl',
    quantity: number,
    id: string,
    title?: string,
    price?: number,
    imgUrl?: string
}

export interface CartProps {
    items: CartItemProps[]
}

interface CartContextProps {
    cart: CartProps | null,
    add: (item: CartItemProps) => void,
    remove: (item: CartItemProps) => void,
    removeOne: (item: CartItemProps) => void,
    setQuantity: (item: CartItemProps, quantity: number) => void,
    getUpdatedPrice: (item: CartItemProps) => Promise<number>,
    getShippingRate: () => Promise<number>,
    getTotalPrice: () => Promise<number>
}

export const CartContext = createContext<CartContextProps>({
    cart: null,
    add: () => {},
    remove: () => {},
    removeOne: () => {},
    setQuantity: () => {},
    getUpdatedPrice: async () => (0),
    getShippingRate: async () => (0),
    getTotalPrice: async () => (0)
})