import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShopItem } from "@/components/shop/ShopItem";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const ProductContainerRelatedCarousel = () => {

    return (
        <Card className="w-full lg:max-w-[30%] grow h-fit flex-shrink-0">
            <CardHeader>
                <CardTitle className="text-xl">Relacionado</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center w-full">
                    <Carousel opts={{ align: 'center' }} className="w-full max-w-[80%]">
                        <CarouselContent>
                            <CarouselItem className="basis-1/2 lg:basis-full">
                                <ShopItem title='Pito' artists={[{ name: 'pito', id: 22 }]} imgUrl='http://picsum.photos/200' type='album' genreList={['pop']} id={2} />
                            </CarouselItem>
                            <CarouselItem className="basis-1/2 lg:basis-full">
                                <ShopItem title='Pito' artists={[{ name: 'pito', id: 22 }]} imgUrl='http://picsum.photos/200' type='album' genreList={['pop']} id={2} />
                            </CarouselItem>
                            <CarouselItem className="basis-1/2 lg:basis-full">
                                <ShopItem title='Pito' artists={[{ name: 'pito', id: 22 }]} imgUrl='http://picsum.photos/200' type='album' genreList={['pop']} id={2} />
                            </CarouselItem>
                        </CarouselContent>

                        <CarouselPrevious className="max-sm:hidden" />
                        <CarouselNext  className="max-sm:hidden" />
                    </Carousel>
                </div>
            </CardContent>
        </Card>
    )
}