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
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingRate, setShippingRate] = useState(0)

    useEffect(() => {
        let newTotal = 0
        const promisesArray = []

        for (const item of cart.cart!.items) {
            promisesArray.push(
                cart.getUpdatedPrice(item).then(price => newTotal += price)
            )
        }

        Promise.all(promisesArray).then(() => {
            setTotalPrice(newTotal)
        })
        
        cart.getShippingRate().then(rate => setShippingRate(rate))
    }, [cart.cart, cart, shippingRate])

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
                <CardDescription>{cart.cart?.items.length} artículos</CardDescription>
            </CardHeader>

            <CardContent>
                <div className='flex justify-between items-center'>
                    <p>Subtotal</p>
                    <p className='text-right'>{totalPrice.toFixed(2)} €</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Gastos de envío</p>
                    <p className='text-right'>{
                        route == 'cart' ?
                        'Calculado en el siguiente paso' :
                        shippingRate === 0 ? 'Gratis' : `${shippingRate} €`
                    }</p>
                </div>

                <Separator className='mt-2' />
                <div className='flex justify-between items-center'>
                    <p>Total</p>
                    <p className='text-xl font-medium'>{(totalPrice + shippingRate).toFixed(2)} €</p>
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