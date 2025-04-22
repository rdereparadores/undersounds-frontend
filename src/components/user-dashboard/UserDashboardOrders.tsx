import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"
import { useUser } from "@/hooks/user/useUser"
import { Order, OrderItem } from "@/hooks/user/UserContext"

export const UserDashboardOrdersOrderCardItem = ({ item }: { item: OrderItem }) => {
    const [imgLoaded, setImgLoaded] = useState(false)
    return (
        <div className="flex gap-4 justify-between">
            <div className="flex gap-4">
                {!imgLoaded && <Skeleton className="w-20 h-20 rounded-md hidden sm:block" />}
                <img src={item.imgUrl} className={`w-20 h-20 rounded-md hidden sm:block ${imgLoaded ? '' : 'hidden'}`} onLoad={() => setImgLoaded(true)} />
                <div className="flex flex-col gap-1 justify-center">
                    <p>{item.title}</p>
                    <CardDescription>{item.author}</CardDescription>
                    <div className="flex gap-2 flex-wrap">
                        <Badge className="w-fit">{item.type === 'album' ? 'Álbum' : 'Canción'}</Badge>
                        <Badge variant='outline'>{item.format}</Badge>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-between">
                <p className="text-lg"> <span className="text-sm">{item.quantity}x </span> {item.price} €</p>
            </div>
        </div>
    )
}

export const UserDashboardOrdersOrderCard = ({ order }: { order: Order }) => {
    const [open, setOpen] = useState(false)

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Pedido #{order._id}</CardTitle>
                        <CardDescription>Realizado el {(new Date(order.purchaseDate)).toLocaleDateString()}</CardDescription>
                        <CardDescription>{order.products.length} artículos</CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                        {order.paid ?
                            <Badge variant='default'>Pagado</Badge>
                        :
                            <Badge variant='destructive'>No pagado</Badge>
                        }
                        <p className="text-xl font-medium">{order.totalPrice} €</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Collapsible open={open} onOpenChange={setOpen}>
                    <div className="flex justify-between items-end gap-4">
                        <div className="flex gap-4 overflow-x-auto">
                            {order.products.map(item => (
                                <img src={item.imgUrl} className="w-16 h-16 rounded-md" />
                            ))}
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button>{open ? 'Ver menos' : 'Ver más'}</Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <Separator className="my-2" />

                        <div className="flex gap-4 flex-wrap">
                            <Card className="grow">
                                <CardHeader>
                                    <CardTitle>Artículos</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-4">
                                    {order.products.map(item => (
                                        <UserDashboardOrdersOrderCardItem item={item} />
                                    ))}
                                </CardContent>
                            </Card>

                            <div className="flex flex-col flex-wrap grow gap-4">
                                <Card className="sm:min-w-96 grow">
                                    <CardHeader>
                                        <CardTitle>Dirección</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{order.address.name} {order.address.surname}</p>
                                        <p>{order.address.address}</p>
                                        <p>{order.address.zipCode} {order.address.city}</p>
                                        <p>{order.address.country}</p>
                                    </CardContent>
                                </Card>

                                <Card className="sm:min-w-96 grow">
                                    <CardHeader>
                                        <CardTitle>Método de pago</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p>Tarjeta bancaria</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </CardContent>
        </Card>
    )
}

export const UserDashboardOrders = () => {
    const user = useUser()
    const [orders, setOrders] = useState<Order[] | undefined>(undefined)

    useEffect(() => {
        user.getOrders().then(o => setOrders(o))
    }, [])

    if (orders === undefined) return <Skeleton className="grow gap-4 flex flex-col flex-wrap" />

    return (
        <div className="grow gap-4 flex flex-col flex-wrap">
            <h1 className="text-3xl font-medium">Pedidos</h1>
            <div className="flex flex-col gap-4">
                {orders.length === 0 && <p>Sin pedidos</p>}
                {orders.map(order => (
                    <UserDashboardOrdersOrderCard order={order} />
                ))}
            </div>
        </div>
    )
}