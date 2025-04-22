import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShopItemCard } from "@/components/shop/ShopItemCard"
import { ShopItem } from "@/hooks/shop/ShopContext"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

export const ProductContainerRelatedCarousel = ({ related }: { related: ShopItem[] }) => {

    return (
        <Card className="grow lg:max-w-[30%] flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Relacionado</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 flex-grow items-center justify-center">
                <Carousel>
                    <CarouselContent>
                        {related.map((item, index) => (
                            <CarouselItem key={index}>
                                <ShopItemCard item={item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </CardContent>
        </Card>
    )
}