import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


export const ProductContainerRatingsItem = () => {
    return (
        <Card className="h-36 min-w-72 max-w-80 flex items-center">
            <CardHeader className="py-0">
                <CardTitle className="italic">"La canción del verano"</CardTitle>
                <div className="pt-2 flex items-center gap-2">
                    <Skeleton className="rounded-full w-10 h-10" />
                    <p>@AlejPagar</p>
                </div>
            </CardHeader>
            <CardContent className="py-0 pl-0">
                <p className="overflow-ellipsis">Mu guapo mu guapo mu guapo guapisimo tio</p>
            </CardContent>
        </Card>
    )
}