import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"

import { SubTotalContainer } from '@/components/cart/SubTotalContainer'
import { CheckoutAddress } from "@/components/checkout/CheckoutAddress"
import { CheckoutPaymentMethod } from "@/components/checkout/CheckoutPaymentMethod"

const addresses = [
    {
        alias: "Dirección 1",
        fullName: "Iván Ruiz López",
        address: "Avenida de la Universidad S/N, Norte, 10003, Cáceres",
        notes: "Entregar en despacho 53",
        addressId: "addr-001"
    },
    {
        alias: "Dirección 1",
        fullName: "Iván Ruiz López",
        address: "Avenida de la Universidad S/N, Norte, 10003, Cáceres",
        notes: "Entregar en despacho 53",
        addressId: "addr-002"
    }
]

const cards = [
    {
        alias: 'Main',
        fullName: 'Alejandro Paniagua García',
        cardLast4Digits: 4412,
        paymentMethodId: 'card-001'
    }
]

export const Checkout = () => {
    return (
        <SubTotalContainer route='checkout'>
            <Card className='grow-[3]'>
                <CardHeader>
                    <CardTitle className='text-xl'>
                        Checkout
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <CheckoutAddress addressList={addresses} />
                    <CheckoutPaymentMethod paymentMethodList={cards} />

                </CardContent>

                <CardFooter>
                </CardFooter>
            </Card>
        </SubTotalContainer>
    )
}