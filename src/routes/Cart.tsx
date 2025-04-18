import { SubTotalContainer } from "../components/cart/SubTotalContainer"
import { CartItem } from '@/components/cart/CartItem'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/cart/useCart"
import { Link } from 'react-router'
import { Button } from "@/components/ui/button"
import { PopulatedCartProps } from "@/hooks/cart/CartContext"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function Cart() {
    const cart = useCart()
    const [populatedCart, setPopulatedCart] = useState<PopulatedCartProps>()

    useEffect(() => {
        cart.getPopulatedCart().then(cart => setPopulatedCart(cart))
    }, [cart])

    if (cart.cart.items.length == 0) {
        return (
            <div className="flex flex-col items-center gap-3 mt-4">
                <img src="/carritoVacio.svg" width="100" height="100" />
                <p className="font-bold">Tu carrito esta vacío</p>
                <p className="text-center">Visita la tienda, seguro que encuentras tu nuevo crush musical</p>
                <Button asChild>
                    <Link to="/shop">
                        Explorar artículos
                    </Link>
                </Button>
            </div>
        )
    }

    if (populatedCart === undefined) return <Skeleton />

    return (
        <SubTotalContainer route='cart'>
            <Card className="grow-[3]">
                <CardHeader>
                    <CardTitle className='text-xl'>
                        Cesta
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-3">
                        {populatedCart.items.map((_item, index) =>
                            <CartItem key={index} item={_item} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </SubTotalContainer>
    )

}

