import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProduct } from "@/hooks/product/useProduct"
import { useCart } from "@/hooks/cart/useCart"
import { Badge } from "../ui/badge"
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router"
import { PopulatedCartItemProps } from "@/hooks/cart/CartContext"

export const CartItem = ({ item }: { item: PopulatedCartItemProps }) => {
    const product = useProduct()
    const cart = useCart()

    return (
        <Card className="flex flex-col p-4 gap-2 w-full">
            <CardContent className="p-0 w-full flex flex-col gap-2 sm:gap-0">
                <div className="flex gap-2">
                    <Link to={`/${item.type}/${item.id}`}>
                        <img className="aspect-square h-32 flex rounded-lg" src={item.imgUrl}></img>
                    </Link>
                    <div className="flex flex-col grow">
                        <div className="flex justify-between grow flex-wrap">
                            <div className="flex flex-col gap-2">
                                <Link to={`/${item.type}/${item.id}`}>
                                    <p className="font-medium w-fit">{item.title}</p>
                                </Link>
                                <div className="flex gap-2">
                                    <Badge>{product.queryResultShort?.type === 'song' ? 'Canción' : 'Álbum'}</Badge>
                                    <Badge variant='outline'>{item.format}</Badge>
                                </div>
                                <Badge className="w-fit" variant='outline'>Unidades: {item.quantity}</Badge>
                            </div>
                            <p className="font-medium text-lg">{(item.quantity * item.price).toFixed(2)} €</p>
                        </div>
                    </div>
                </div>

                <div className="flex sm:justify-end gap-2 md:-mt-9">
                    <div>
                        <Button onClick={() => {cart.remove(item)}} variant="destructive" ><FaRegTrashAlt /></Button>
                    </div>
                    <div className="flex">
                        <Button onClick={() => { cart.removeOne(item) }} className="flex w-10 rounded-e-none">-</Button>
                        <Input value={item.quantity} className="w-14 text-center border border-input rounded-none bg-background shadow-sm" />
                        <Button onClick={() => { cart.add({...item, quantity: 1}) }} className="flex w-10 rounded-s-none">+</Button>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}