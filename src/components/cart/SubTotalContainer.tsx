import { SubTotal, SubTotalProps } from '@/components/cart/SubTotal'

export const SubTotalContainer = ({ children, purchaseButtonEnabled, purchaseButtonChildren, purchaseButtonOnClick }: SubTotalProps) => (
    <div className="flex flex-wrap pt-2 gap-4 h-fit w-full">
        {children}
        <SubTotal
            purchaseButtonEnabled={purchaseButtonEnabled}
            purchaseButtonChildren={purchaseButtonChildren}
            purchaseButtonOnClick={purchaseButtonOnClick}
        />
    </div>
)