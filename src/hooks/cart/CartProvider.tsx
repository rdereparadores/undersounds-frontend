import { useEffect, useState } from "react"
import { CartContext, CartProps, CartItemProps } from "./CartContext"
import { toast } from "sonner"

interface CartProviderProps {
    children: React.ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const initCart = () => {
        const savedCart = localStorage.getItem('cart')
        if (!savedCart) {
            const newCart = { items: [] }
            localStorage.setItem('cart', JSON.stringify(newCart))
            return newCart
        } else {
            return JSON.parse(savedCart)
        }
    }
    const [cart, setCart] = useState<CartProps | null>(initCart())

    useEffect(() => {
        if (!cart) return
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const add = (item: CartItemProps) => {
        if (!cart) return
        const itemAlreadyInCart = cart?.items.findIndex(cartItem => {
            return (cartItem.format === item.format) && (cartItem.id === item.id) && (cartItem.type === item.type)
        })

        if (itemAlreadyInCart != -1) {
            if (item.format == 'digital') {
                toast.info('No puedes adquirir más de una copia digital')
                return
            }

            const newCart = {
                items: [...cart!.items]
            }
            newCart.items[itemAlreadyInCart!] = {
                ...newCart.items[itemAlreadyInCart!],
                quantity: newCart.items[itemAlreadyInCart!].quantity + 1
            }
            setCart(newCart)
        } else {
            setCart({
                items: [...cart!.items, item]
            })
        }
    }

    const remove = (item: CartItemProps) => {
        if (!cart) return
        const filteredItems = cart.items.filter(cartItem => 
            !(cartItem.format === item.format && cartItem.id === item.id && cartItem.type === item.type)
        )
        setCart({
            items: filteredItems
        });
    }

    const removeOne = (item: CartItemProps) => {
        if (!cart) return
        if (item.quantity > 1) {
            setQuantity(item, item.quantity - 1)
        } else {
            remove(item)
        }
    }

    const setQuantity = (item: CartItemProps, quantity: number) => {
        if (!cart) return
        const itemIndex = cart?.items.findIndex(cartItem => {
            return (cartItem.format === item.format) && (cartItem.id === item.id) && (cartItem.type === item.type)
        })

        if (itemIndex !== -1) {
            const newItems = [...cart!.items]
            newItems[itemIndex!] = {
                ...newItems[itemIndex!],
                quantity
            }

            setCart({
                items: newItems
            })
        }
    }

    const getUpdatedPrice = async ( item: CartItemProps ) => {
        switch (item.format) {
            case 'digital':
                return 6.99 * item.quantity
            case 'cd':
                return 10.99 * item.quantity
            case 'vinyl':
                return 14.99 * item.quantity
            case 'cassette':
                return 16.99 * item.quantity
            default:
                return 0
        }
    }

    return (
        <CartContext.Provider value={{ cart, add, remove, removeOne, setQuantity, getUpdatedPrice }}>
            { children }
        </CartContext.Provider>
    )
}