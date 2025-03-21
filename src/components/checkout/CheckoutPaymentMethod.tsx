import { RadioGroup } from "@/components/ui/radio-group"
import { Separator } from '@/components/ui/separator'

import { CheckoutPaymentMethodItem, CheckoutPaymentMethodItemProps } from "@/components/checkout/CheckoutPaymentMethodItem"
import { CheckoutPaymentMethodAddButton } from "@/components/checkout/CheckoutPaymentMethodAddButton"

interface CheckoutPaymentMethodProps {
    paymentMethodList: CheckoutPaymentMethodItemProps[]
}

export const CheckoutPaymentMethod = ({ paymentMethodList }: CheckoutPaymentMethodProps) => {

    return (
        <>
            <h3 className='mb-2 mt-4 font-medium'>Métodos de pago</h3>
            <RadioGroup>
                {paymentMethodList.map((card, index) => (
                    <CheckoutPaymentMethodItem
                        key={index}
                        alias={card.alias}
                        fullName={card.fullName}
                        cardLast4Digits={card.cardLast4Digits}
                        paymentMethodId={card.paymentMethodId.toString()}
                    />
                ))}
            </RadioGroup>
            <Separator className='my-2' />
            <CheckoutPaymentMethodAddButton />
        </>
    )
}