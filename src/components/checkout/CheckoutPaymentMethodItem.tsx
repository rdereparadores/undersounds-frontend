import { Card, CardContent } from "@/components/ui/card"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export interface CheckoutPaymentMethodItemProps {
    alias: string,
    fullName: string,
    cardLast4Digits: number,
    paymentMethodId: string
}

export const CheckoutPaymentMethodItem = ({ alias, fullName, cardLast4Digits, paymentMethodId }: CheckoutPaymentMethodItemProps) => (
    <Card>
        <CardContent>
            <div className='flex items-center space-x-2 mt-5'>
                <RadioGroupItem value={paymentMethodId} id={paymentMethodId} className='self-start' />

                <div className='flex flex-col'>
                    <Label className='mb-2' htmlFor={paymentMethodId}>{alias}</Label>
                    <p className='text-sm'>{fullName}</p>
                    <p className='text-sm'>Tarjeta acabada en {cardLast4Digits}</p>
                </div>
            </div>
        </CardContent>
    </Card>
)