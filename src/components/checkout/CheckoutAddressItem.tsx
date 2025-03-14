import { Card, CardContent } from "@/components/ui/card"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export interface CheckoutAddressItemProps {
    alias: string,
    fullName: string,
    address: string,
    notes: string,
    addressId: string
}

export const CheckoutAddressItem = ({ alias, fullName, address, notes, addressId }: CheckoutAddressItemProps) => (
    <Card>
        <CardContent>
            <div className='flex items-center space-x-2 mt-5'>
                <RadioGroupItem value={addressId} id={addressId} className='self-start' />

                <div className='flex flex-col'>
                    <Label className='mb-2' htmlFor={addressId}>{alias}</Label>
                    <p className='text-sm'>{fullName}</p>
                    <p className='text-sm'>{address}</p>
                    <p className='text-sm'>{notes}</p>
                </div>
            </div>
        </CardContent>
    </Card>
)