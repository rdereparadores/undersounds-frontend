import { SubTotal, SubTotalProps } from '@/components/cart/SubTotal'

export const SubTotalContainer = ({ children, route }: SubTotalProps) => (
    <div className="flex flex-wrap pt-2 gap-4 h-fit w-full">
        {children}
        <SubTotal
            route={route}
        />
    </div>
)