import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"

export const UserDashboardOrdersOrderCardItem = () => {
    return (
        <div className="flex gap-4 justify-between">
            <div className="flex gap-4">
                <img src='https://picsum.photos/200' className="w-20 h-20 rounded-md hidden sm:block" />
                <div className="flex flex-col gap-1 justify-center">
                    <p>Canción 1</p>
                    <CardDescription>Artista 1</CardDescription>
                    <div className="flex gap-2 flex-wrap">
                        <Badge className="w-fit">Álbum</Badge>
                        <Badge variant='outline'>Digital</Badge>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between">
                <p className="text-lg"> <span className="text-sm">2x </span> 4.99 €</p>
                <Button variant='outline' size='sm' className="mb-1">Seguimiento</Button>
            </div>
        </div>
    )
}

export const UserDashboardOrdersOrderAddress = () => {
    return (
        <Card className=''>
            <CardHeader>
                <div className='flex gap-2 items-center'>
                    <CardTitle>Casa</CardTitle>
                    <Badge variant='outline'>Predeterminada</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p>Iván Ruiz López</p>
                <p>Avenida de las Delicias, 2</p>
                <p>Colegio Mayor Antonio Franco</p>
                <p>10004 Cáceres</p>
                <p>666666666</p>
            </CardContent>
        </Card>
    )
}

export const UserDashboardOrdersOrderDetails = () => {
    return (
        <div className="flex gap-4 flex-wrap">
            <Card className="grow">
                <CardHeader>
                    <CardTitle>Artículos</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <UserDashboardOrdersOrderCardItem />
                    <UserDashboardOrdersOrderCardItem />
                    <UserDashboardOrdersOrderCardItem />
                </CardContent>
            </Card>

            <div className="flex flex-col flex-wrap grow gap-4">
                <Card className="sm:min-w-96 grow">
                    <CardHeader>
                        <CardTitle>Dirección</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Iván Ruiz López</p>
                        <p>Avenida de las Delicias, 2</p>
                        <p>Colegio Mayor Antonio Franco</p>
                        <p>10004 Cáceres</p>
                        <p>666666666</p>
                    </CardContent>
                </Card>

                <Card className="sm:min-w-96 grow">
                    <CardHeader>
                        <CardTitle>Método de pago</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>VISA acabada en 0006</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export const UserDashboardOrdersOrderCard = () => {
    const [open, setOpen] = useState(false)

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Pedido #99282</CardTitle>
                        <CardDescription>Realizado el 03/04/2025</CardDescription>
                        <CardDescription>5 artículos</CardDescription>
                    </div>
                    <p className="text-xl font-medium">26.99 €</p>
                </div>
            </CardHeader>
            <CardContent>
                <Collapsible open={open} onOpenChange={setOpen}>
                    <div className="flex justify-between items-end gap-4">
                        <div className="flex gap-4 overflow-x-auto">
                            <img src='https://picsum.photos/200' className="w-16 h-16 rounded-md" />
                            <img src='https://picsum.photos/200' className="w-16 h-16 rounded-md" />
                            <img src='https://picsum.photos/200' className="w-16 h-16 rounded-md" />
                            <img src='https://picsum.photos/200' className="w-16 h-16 rounded-md" />
                            <img src='https://picsum.photos/200' className="w-16 h-16 rounded-md" />
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button>{open ? 'Ver menos' : 'Ver más'}</Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <Separator className="my-2" />
                        <UserDashboardOrdersOrderDetails />
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}

export const UserDashboardOrders = () => {

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Pedidos</h1>
            <div className="flex flex-col gap-4">
                <UserDashboardOrdersOrderCard />
                <UserDashboardOrdersOrderCard />
                <UserDashboardOrdersOrderCard />
                <UserDashboardOrdersOrderCard />
                <UserDashboardOrdersOrderCard />
            </div>
        </div>
    )
}