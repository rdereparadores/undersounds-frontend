import { Card, CardTitle, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/cart/useCart'
import { useEffect, useState } from 'react'

export interface SubTotalProps {
    children?: React.ReactNode,
    purchaseButtonEnabled: boolean,
    purchaseButtonChildren: React.ReactNode,
    purchaseButtonOnClick?: () => void
}

const SubTotal = ({ purchaseButtonEnabled, purchaseButtonChildren, purchaseButtonOnClick }: SubTotalProps) => {
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

    return (
        <Card className="h-fit grow">
            <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>{cart.cart?.items.length} artículos</CardDescription>
            </CardHeader>

            <CardContent>
                <div className='flex justify-between items-center'>
                    <p>Subtotal</p>
                    <p className=''>{totalPrice.toFixed(2)} €</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Gastos de envío</p>
                    <p className=''>{shippingRate === 0 ? 'Gratis' : `${shippingRate} €`}</p>
                </div>

                <Separator className='mt-2' />
                <div className='flex justify-between items-center'>
                    <p>Total</p>
                    <p className='text-xl font-medium'>{(totalPrice + shippingRate).toFixed(2)} €</p>
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    asChild={purchaseButtonEnabled}
                    disabled={!purchaseButtonEnabled}
                    className='w-full'
                    onClick={purchaseButtonOnClick}
                >
                    {purchaseButtonChildren}
                </Button>
            </CardFooter>
        </Card>
    )
}

export { SubTotal }