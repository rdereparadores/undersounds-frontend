import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/product/useProduct";
import { useState } from "react";


export const ProductContainerRatingsItem = () => {
    const [imgLoaded, setImgLoaded] = useState(false)
    const product = useProduct()
    return (
        <Card className="h-36 max-w-96 flex items-center">
            <CardHeader className="py-0">
                <CardTitle className="italic">"{product.queryResult?.ratings.list[0].title}"</CardTitle>
                <div className="pt-2 flex items-center gap-2">
                    {!imgLoaded && <Skeleton className="rounded-full w-10 h-10" />}
                    <img className="rounded-full w-10 h-10" hidden={!imgLoaded} src={product.queryResult?.ratings.list[0].userImgUrl} onLoad={() => {setImgLoaded(true)}}/>
                    <p>@{product.queryResult?.ratings.list[0].username}</p>
                </div>
            </CardHeader>
        </Card>
    )
}