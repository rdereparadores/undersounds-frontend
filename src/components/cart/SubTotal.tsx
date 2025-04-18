import { Card, CardTitle, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/cart/useCart'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCheckout } from '@/hooks/checkout/useCheckout'

export interface SubTotalProps {
    children?: React.ReactNode,
    route: 'cart' | 'checkout'
}

const SubTotal = ({ route }: SubTotalProps) => {
    const navigate = useNavigate()
    const checkout = useCheckout()
    const cart = useCart()
    const [itemCount, setItemCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingCost, setShippingCost] = useState(0)

    useEffect(() => {
        cart.getPopulatedCart().then(cart => {
            setTotalPrice(cart.totalPrice)
            setShippingCost(cart.shippingCost)
            setItemCount(cart.items.reduce((sum, item) => sum + item.quantity, 0))
        })
    }, [cart])

    const handlePayButtonClick = () => {
        if (route == 'cart') {
            navigate('../checkout')
        } else {
            checkout.createOrder()
        }
    }

    return (
        <Card className="h-fit grow lg:max-w-md">
            <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>{itemCount} artículos</CardDescription>
            </CardHeader>

            <CardContent>
                <div className='flex justify-between items-center'>
                    <p>Subtotal</p>
                    <p className='text-right'>{(totalPrice - shippingCost).toFixed(2)} €</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Gastos de envío</p>
                    <p className='text-right'>{shippingCost.toFixed(2)} €</p>
                </div>

                <Separator className='mt-2' />
                <div className='flex justify-between items-center'>
                    <p>Total</p>
                    <p className='text-xl font-medium'>{totalPrice.toFixed(2)} €</p>
                </div>
            </CardContent>

            <CardFooter>

                <Button
                    disabled={route === 'cart' ? false : !checkout.payButtonEnabled}
                    className='w-full'
                    onClick={handlePayButtonClick}
                >
                    {
                        route == 'checkout' ? 'Tramitar pedido' : 'Pagar'
                    }
                </Button>
            </CardFooter>
        </Card>
    )
}

export { SubTotal }