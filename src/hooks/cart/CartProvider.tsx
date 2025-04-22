import { useEffect, useState } from "react"
import { CartContext, CartProps, CartItemProps } from "./CartContext"
import { toast } from "sonner"
import { api } from '@/lib/api'

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
    const [cart, setCart] = useState<CartProps>(initCart())

    useEffect(() => {
        if (!cart) return
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const getPopulatedCart = async () => {
        const items = await Promise.all(cart.items.map(async (item) => {
            console.log(item)
            const query = item.type === 'song' ? {songId: item.id} : {albumId: item.id}
            const product = await api.post(`/api/${item.type}/info`, query)
            return {
                ...item,
                imgUrl: product.data.data[item.type].imgUrl as string,
                title: product.data.data[item.type].title as string,
                price: product.data.data[item.type].pricing[item.format] as number
            }
        }))
        const shippingCost = items.find(item => item.format != 'digital') ? 4.99 : 0
        const totalPrice = items.reduce((itemA, itemB) => itemA + (itemB.price * itemB.quantity), 0) + shippingCost
        return {
            items,
            shippingCost,
            totalPrice
        }
    }

    const add = (item: CartItemProps) => {
        const itemAlreadyInCartIndex = cart.items.findIndex(cartItem => 
            cartItem.id === item.id && 
            cartItem.format === item.format)

        if (itemAlreadyInCartIndex !== -1) {
            if (item.format === 'digital') {
                toast.info('No puedes adquirir más de una copia digital')
                return
            }

            const newItems = [...cart.items]
            newItems[itemAlreadyInCartIndex] = {
                ...newItems[itemAlreadyInCartIndex],
                quantity: newItems[itemAlreadyInCartIndex].quantity + item.quantity
            }

            setCart({ items: newItems })
        } else {
            toast.success('Producto añadido al carrito')
            setCart({ items: [...cart.items, item] })
        }
        
    }

    const remove = (item: Partial<CartItemProps>) => {
        const filteredItems = cart.items.filter(cartItem =>
            !(cartItem.id === item.id &&
              cartItem.format === item.format)
        )
        setCart({
            items: filteredItems
        })
        toast.info('Producto eliminado del carrito')
    }

    const removeOne = (item: Partial<CartItemProps>) => {
        const cartItem = cart.items.find(cartItem => cartItem.id === item.id && cartItem.format === item.format)
        if (cartItem!.quantity > 1) {
            setQuantity(cartItem!, cartItem!.quantity - 1)
        } else {
            remove(cartItem!)
        }
    }

    const setQuantity = (item: Partial<CartItemProps>, quantity: number) => {
        if (quantity < 1) {
            remove(item)
            return
        }

        const itemIndex = cart.items.findIndex(cartItem =>
            cartItem.id === item.id &&
            cartItem.format === item.format
        )

        if (itemIndex !== -1) {
            const newItems = [...cart.items]
            newItems[itemIndex] = {
                ...newItems[itemIndex],
                quantity
            }

            setCart({
                items: newItems
            })
        }
    }

    const clear = () => {
        setCart({items: []})
    }

    return (
        <CartContext.Provider value={{
            cart,
            add,
            remove,
            removeOne,
            setQuantity,
            getPopulatedCart,
            clear
        }}>
            {children}
        </CartContext.Provider>
    )
}