import {
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { useCart } from "@/hooks/cart/useCart"
import { Card } from "../ui/card"
import { useEffect } from "react"
import { useProduct } from "@/hooks/product/useProduct"
import { Badge } from "../ui/badge"
import { FaRegTrashAlt } from "react-icons/fa"

interface NavBarCartItemProps { cartIndex: number }

export const NavBarCartItem = ({ cartIndex }: NavBarCartItemProps) => {
    const product = useProduct()
    const cart = useCart()

    useEffect(() => {
        product.queryProductShort({
            type: cart.cart!.items[cartIndex].type,
            id: cart.cart!.items[cartIndex].id
        })
    }, [cart])

    const getPrice = () => {
        const itemFormat = cart.cart?.items?.[cartIndex]?.format && product.queryResultShort?.price
            ? (cart.cart.items[cartIndex].format as keyof typeof product.queryResultShort.price)
            : undefined;
        return product.queryResultShort?.price?.[itemFormat!] ?? 0
    }

    return (
        <Card className="flex p-4 gap-2">
            <SheetClose asChild>
                <Link to={`/${cart.cart?.items[cartIndex].type}/${cart.cart?.items[cartIndex].id}`}>
                    <img className="w-28 h-28 flex rounded-lg" src={product.queryResultShort?.imgUrl}></img>
                </Link>
            </SheetClose>
            <div className="flex grow">
                <div className="flex justify-between grow">
                    <div>
                        <SheetClose asChild>
                            <Link to={`/${cart.cart?.items[cartIndex].type}/${cart.cart?.items[cartIndex].id}`}>
                                <p className="font-medium">{product.queryResultShort?.title}</p>
                            </Link>
                        </SheetClose>
                        <div className="flex gap-2 py-2">
                            <Badge>{product.queryResultShort?.type == 'song' ? 'Canción' : 'Álbum'}</Badge>
                            <Badge variant='outline'>{cart.cart!.items[cartIndex].format}</Badge>
                        </div>
                        <p className="text-sm">Unidades: {cart.cart!.items[cartIndex].quantity}</p>
                        <p className="font-medium text-lg">{getPrice().toFixed(2)} €</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <div>
                        <Button variant="destructive"
                            onClick={() => {
                                cart.remove(cart.cart!.items[cartIndex])
                            }}
                        >
                            <FaRegTrashAlt />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}