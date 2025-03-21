import { SubTotal, SubTotalProps } from '@/components/cart/SubTotal'

export const SubTotalContainer = ({ children, articleCount, price, purchaseButtonEnabled, purchaseButtonChildren, purchaseButtonOnClick }: SubTotalProps) => (
    <div className="flex flex-wrap pt-2 gap-4 h-fit w-full">
        {children}
        <SubTotal
            articleCount={articleCount}
            price={price}
            purchaseButtonEnabled={purchaseButtonEnabled}
            purchaseButtonChildren={purchaseButtonChildren}
            purchaseButtonOnClick={purchaseButtonOnClick}
        />
    </div>
)