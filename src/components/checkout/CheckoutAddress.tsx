import { RadioGroup } from "@/components/ui/radio-group"
import { Separator } from '@/components/ui/separator'

import { CheckoutAddressItem, CheckoutAddressItemProps } from "@/components/checkout/CheckoutAddressItem"
import { CheckoutAddressAddButton } from "./CheckoutAddressAddButton"

interface CheckoutAddressProps {
    addressList: CheckoutAddressItemProps[]
}

export const CheckoutAddress = ({ addressList }: CheckoutAddressProps) => {

    return (
        <>
            <h3 className='mb-2 font-medium'>Direcciones de envío</h3>
            <RadioGroup>
                {addressList.map((address, index) => (
                    <CheckoutAddressItem
                        key={index}
                        alias={address.alias}
                        fullName={address.fullName}
                        address={address.address}
                        notes={address.notes}
                        addressId={address.addressId}
                    />
                ))}
            </RadioGroup>
            <Separator className='my-2' />
            <CheckoutAddressAddButton />
        </>
    )
}