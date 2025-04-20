import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShopItemCard } from "@/components/shop/ShopItemCard"
import { ShopItem } from "@/hooks/shop/ShopContext"

export const ProductContainerRelatedCarousel = ({ related }: { related: ShopItem[] }) => {

    return (
        <Card className="grow lg:max-w-[30%] flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Relacionado</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 flex-grow items-center justify-center">
                {related.map((item, index) => (
                    <ShopItemCard key={index} item={item}  />
                ))}
            </CardContent>
        </Card>
    )
}