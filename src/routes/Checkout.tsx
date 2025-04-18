import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { SubTotalContainer } from '@/components/cart/SubTotalContainer'
import { useUser } from "@/hooks/user/useUser"
import { AddressProps } from "@/hooks/user/UserContext"
import { useEffect, useState } from "react"
import { useCheckout } from "@/hooks/checkout/useCheckout"
import { CheckoutAddressItem } from "@/components/checkout/CheckoutAddressItem"
import { Separator } from "@/components/ui/separator"
import { RadioGroup } from "@/components/ui/radio-group"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { UserDashboardProfileAddressesAddCardForm } from "@/components/user-dashboard/UserDashboardProfileAddressesCard"
import { Button } from "@/components/ui/button"



export const Checkout = () => {
    const user = useUser()
    const checkout = useCheckout()
    const [ addressList, setAddressList ] = useState<AddressProps[]>([])

    useEffect(() => {
        checkout.setPayButtonEnabled(false)
        user.getAddresses().then(addresses => setAddressList(addresses))
    }, [])

    return (
        <SubTotalContainer route='checkout'>
            <Card className='grow-[3]'>
                <CardHeader>
                    <CardTitle className='text-xl'>
                        Checkout
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <h3 className='mb-2 font-medium'>Direcciones de envío</h3>
                    <RadioGroup onValueChange={(value) => {
                        checkout.setPayButtonEnabled(true)
                        checkout.setAddress(value)
                    }}>
                        {addressList.map((address, index) => (
                            <CheckoutAddressItem
                                key={index}
                                alias={address.alias}
                                fullName={address.name + ' ' + address.surname}
                                address={address.address}
                                notes={address.observations ? address.observations : ''}
                                addressId={address._id!}
                            />
                        ))}
                    </RadioGroup>
                    <Separator className='my-2' />

                    <Dialog>
                        <DialogTrigger>
                            <Button>+ Añadir dirección</Button>
                        </DialogTrigger>
                        <UserDashboardProfileAddressesAddCardForm />
                    </Dialog>
                </CardContent>
            </Card>
        </SubTotalContainer>
    )
}