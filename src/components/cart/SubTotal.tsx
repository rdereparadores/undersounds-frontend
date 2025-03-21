import { Card, CardTitle, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export interface SubTotalProps {
    children?: React.ReactNode,
    articleCount: number,
    price: number,
    shippingPrice?: number,
    purchaseButtonEnabled: boolean,
    purchaseButtonChildren: React.ReactNode,
    purchaseButtonOnClick?: () => void
}

const SubTotal = ({ articleCount, price, shippingPrice, purchaseButtonEnabled, purchaseButtonChildren, purchaseButtonOnClick }: SubTotalProps) => {

    return (
        <Card className="h-fit grow">
            <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>{articleCount} artículos</CardDescription>
            </CardHeader>

            <CardContent>
                <div className='flex justify-between items-center'>
                    <p>Subtotal</p>
                    <p className=''>{price} €</p>
                </div>
                <div className='flex justify-between items-center'>
                    <p>Gastos de envío</p>
                    <p className=''>{shippingPrice ? `${shippingPrice} €` : 'Gratis'}</p>
                </div>

                <Separator className='mt-2' />
                <div className='flex justify-between items-center'>
                    <p>Total</p>
                    <p className='text-xl font-medium'>{shippingPrice ? shippingPrice + price : price} €</p>
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