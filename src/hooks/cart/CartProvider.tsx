import { useEffect, useState } from "react"
import { CartContext, CartProps, CartItemProps } from "./CartContext"
import { toast } from "sonner"
import { api } from '@/lib/api'

interface CartProviderProps {
    children: React.ReactNode
}

interface ProductPrice {
    digital: number;
    cd: number;
    vinyl: number;
    cassette: number;
}

interface ProductResponse {
    id: string;
    title: string;
    type: string;
    imgUrl: string;
    price: ProductPrice;
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

    const getProductInfo = async (id: string, type: string): Promise<ProductResponse | null> => {
        try {
            // Si estamos en modo desarrollo o testing, usar datos locales
            if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
                // Simular respuesta
                return {
                    id,
                    title: `Producto ${id}`,
                    type,
                    imgUrl: "https://picsum.photos/200/300",
                    price: {
                        digital: 1.99,
                        cd: 9.99,
                        vinyl: 19.99,
                        cassette: 4.99
                    }
                };
            }

            // En producción, consultar la API
            const response = await api.post('/api/song/info', { songId: id });
            const songData = response.data.data.song;

            return {
                id: songData._id,
                title: songData.title,
                type: 'song',
                imgUrl: songData.imgUrl,
                price: songData.pricing
            };
        } catch (error) {
            console.error("Error al obtener información del producto:", error);
            return null;
        }
    };

    const add = async (item: CartItemProps) => {
        if (!cart) return

        // Intentar obtener información del producto si no la tenemos
        let productInfo = item;
        if (!item.title || !item.price) {
            const productData = await getProductInfo(item.id, item.type);
            if (productData) {
                productInfo = {
                    ...item,
                    title: productData.title,
                    imgUrl: productData.imgUrl,
                    price: productData.price[item.format]
                };
            }
        }

        // Verificar si el producto ya está en el carrito con el mismo formato
        const itemIndex = cart.items.findIndex(cartItem =>
            cartItem.id === item.id &&
            cartItem.type === item.type &&
            cartItem.format === item.format
        )

        if (itemIndex !== -1) {
            // Producto ya en carrito con mismo formato
            if (item.format === 'digital') {
                toast.info('No puedes adquirir más de una copia digital')
                return
            }

            // Incrementar cantidad
            const newItems = [...cart.items]
            newItems[itemIndex] = {
                ...newItems[itemIndex],
                quantity: newItems[itemIndex].quantity + 1
            }

            setCart({ items: newItems })
            toast.success('Producto añadido al carrito')
        } else {
            // Añadir nuevo item al carrito
            setCart({
                items: [...cart.items, productInfo]
            })
            toast.success('Producto añadido al carrito')
        }
    }

    const remove = (item: CartItemProps) => {
        if (!cart) return
        const filteredItems = cart.items.filter(cartItem =>
            !(cartItem.id === item.id &&
                cartItem.type === item.type &&
                cartItem.format === item.format)
        )
        setCart({
            items: filteredItems
        });
        toast.info('Producto eliminado del carrito')
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
        if (quantity < 1) {
            remove(item)
            return
        }

        const itemIndex = cart.items.findIndex(cartItem =>
            cartItem.id === item.id &&
            cartItem.type === item.type &&
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

    const getUpdatedPrice = async (item: CartItemProps): Promise<number> => {
        if (item.price) {
            return item.price * item.quantity;
        }

        // Si no tenemos el precio, intentar obtenerlo
        const productData = await getProductInfo(item.id, item.type);
        if (productData) {
            return productData.price[item.format] * item.quantity;
        }

        return 0;
    }

    const getShippingRate = async (): Promise<number> => {
        if (!cart) return 0
        return cart.items.some(item => item.format !== 'digital') ? 4.99 : 0
    }

    const getTotalPrice = async (): Promise<number> => {
        if (!cart || cart.items.length === 0) return 0

        let total = 0
        for (const item of cart.items) {
            total += await getUpdatedPrice(item)
        }

        // Añadir gastos de envío si aplica
        total += await getShippingRate()

        return parseFloat(total.toFixed(2))
    }

    return (
        <CartContext.Provider value={{
            cart,
            add,
            remove,
            removeOne,
            setQuantity,
            getUpdatedPrice,
            getShippingRate,
            getTotalPrice
        }}>
            {children}
        </CartContext.Provider>
    )
}