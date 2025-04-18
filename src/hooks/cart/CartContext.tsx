import { createContext } from "react"

export interface CartItemProps {
    format: 'cd' | 'digital' | 'cassette' | 'vinyl',
    type: 'song' | 'album',
    quantity: number,
    id: string
}

export interface PopulatedCartItemProps extends CartItemProps {
    imgUrl: string,
    title: string,
    price: number
}

export interface CartProps {
    items: CartItemProps[]
}

export interface PopulatedCartProps {
    items: PopulatedCartItemProps[],
    shippingCost: number,
    totalPrice: number
}

interface CartContextProps {
    cart: CartProps,
    clear: () => void,
    getPopulatedCart: () => Promise<PopulatedCartProps>,
    add: (item: CartItemProps) => void,
    remove: (item: Partial<CartItemProps>) => void,
    removeOne: (item: Partial<CartItemProps>) => void,
    setQuantity: (item: Partial<CartItemProps>, quantity: number) => void
}

export const CartContext = createContext<CartContextProps>({
    cart: {items: []},
    clear: () => {},
    getPopulatedCart: async () => {throw new Error()},
    add: () => {},
    remove: () => {},
    removeOne: () => {},
    setQuantity: () => {}
})