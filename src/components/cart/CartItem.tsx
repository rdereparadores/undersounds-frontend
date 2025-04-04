import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProduct } from "@/hooks/product/useProduct"
import { useCart } from "@/hooks/cart/useCart"
import { useEffect } from "react"
import { Badge } from "../ui/badge"
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router"

export interface CartItemProps { cartIndex: number }

export const CartItem = ({ cartIndex }: CartItemProps) => {
    const product = useProduct()
    const cart = useCart()

    useEffect(() => {
        product.queryProductShort({
            type: cart.cart!.items[cartIndex].type,
            id: cart.cart!.items[cartIndex].id
        })
    }, [])

    const getPrice = () => {
        const itemFormat = cart.cart?.items?.[cartIndex]?.format && product.queryResultShort?.price
            ? (cart.cart.items[cartIndex].format as keyof typeof product.queryResultShort.price)
            : undefined;
        return product.queryResultShort?.price?.[itemFormat!] ?? 0
    }

    return (
        <Card className="flex flex-col p-4 gap-2 w-full">
            <CardContent className="p-0 w-full flex flex-col gap-2 sm:gap-0">
                <div className="flex gap-2">
                    <Link to={`/${product.queryResultShort?.type}/${product.queryResultShort?.id}`}>
                        <img className="aspect-square h-32 flex rounded-lg" src={product.queryResultShort?.imgUrl}></img>
                    </Link>
                    <div className="flex flex-col grow">
                        <div className="flex justify-between grow flex-wrap">
                            <div className="flex flex-col gap-2">
                                <Link to={`/${product.queryResultShort?.type}/${product.queryResultShort?.id}`}>
                                    <p className="font-medium w-fit">{product.queryResultShort?.title}</p>
                                </Link>
                                <div className="flex gap-2">
                                    <Badge>{product.queryResultShort?.type === 'song' ? 'Canción' : 'Álbum'}</Badge>
                                    <Badge variant='outline'>{cart.cart!.items[cartIndex].format}</Badge>
                                </div>
                                <Badge className="w-fit" variant='outline'>Unidades: {cart.cart?.items[cartIndex].quantity}</Badge>
                            </div>
                            <p className="font-medium text-lg">{(getPrice() * cart.cart!.items[cartIndex].quantity).toFixed(2)} €</p>
                        </div>
                    </div>
                </div>

                <div className="flex sm:justify-end gap-2 md:-mt-9">
                    <div>
                        <Button onClick={() => {cart.remove(cart.cart!.items[cartIndex])}} variant="destructive" ><FaRegTrashAlt /></Button>
                    </div>
                    <div className="flex">
                        <Button onClick={() => { cart.removeOne(cart.cart!.items[cartIndex]) }} className="flex w-10 rounded-e-none">-</Button>
                        <Input value={cart.cart?.items[cartIndex].quantity} className="w-14 text-center border border-input rounded-none bg-background shadow-sm" />
                        <Button onClick={() => { cart.add(cart.cart!.items[cartIndex]) }} className="flex w-10 rounded-s-none">+</Button>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}