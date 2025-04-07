import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { SubTotalContainer } from '@/components/cart/SubTotalContainer'
import { CheckoutAddress } from "@/components/checkout/CheckoutAddress"

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
                </CardContent>
            </Card>
        </SubTotalContainer>
    )
}