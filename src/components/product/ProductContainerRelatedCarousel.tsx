import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShopItem } from "@/components/shop/ShopItem";
import { useProduct } from "@/hooks/product/useProduct";

export const ProductContainerRelatedCarousel = () => {
    const product = useProduct()

    return (
        <Card className="grow lg:max-w-[30%] flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Relacionado</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 flex-grow items-center justify-center">
                {product.queryResult?.related.map((item, index) => (
                    <ShopItem key={index} title={item.title} artists={item.artists} imgUrl={item.imgUrl} type={item.type} genreList={item.genres} id={item.id} />
                ))}
            </CardContent>
        </Card>
    )
}