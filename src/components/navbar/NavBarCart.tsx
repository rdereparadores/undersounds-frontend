import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { IoCartOutline } from "react-icons/io5"
import { DialogDescription } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/hooks/cart/useCart"
import { ProductProvider } from "@/hooks/product/ProductProvider"
import { Card } from "../ui/card"
import { useEffect, useState } from "react"
import { useProduct } from "@/hooks/product/useProduct"
import { Badge } from "../ui/badge"
import { FaRegTrashAlt } from "react-icons/fa"

interface NavBarCartItemProps { cartIndex: number }

const NavBarCartItem = ({ cartIndex }: NavBarCartItemProps) => {
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
                        <Link to={`/${cart.cart?.items[cartIndex].type}/${cart.cart?.items[cartIndex].id}`}>
                            <p className="font-medium">{product.queryResultShort?.title}</p>
                        </Link>
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

export const NavBarCartEmpty = () => (
    <>
        <div className="flex flex-col items-center gap-3 mt-4">
            <img src="/carritoVacio.svg" width="100" height="100" />
            <p className="font-bold">Tu carrito esta vacío</p>
            <p className="text-center">Visita la tienda, seguro que encuentras tu nuevo crush musical</p>
            <SheetFooter>
                <SheetClose asChild>
                    <Button asChild>
                        <Link to="/shop">
                            Explorar artículos
                        </Link>
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    </>
)

const NavBarCartFilled = () => {
    const cart = useCart()
    const [totalPrice, setTotalPrice] = useState(0)
    const [shippingRate, setShippingRate] = useState(0)

    useEffect(() => {
        let newTotal = 0
        const promisesArray = []

        for (const item of cart.cart!.items) {
            promisesArray.push(
                cart.getUpdatedPrice(item).then(price => newTotal += price)
            )
        }

        Promise.all(promisesArray).then(() => {
            setTotalPrice(newTotal)
        })
        cart.getShippingRate().then(rate => setShippingRate(rate))
    }, [cart.cart, cart])

    return (
        <>
            <ScrollArea className="mt-2 h-[60%]">
                <div className="flex flex-col gap-2">
                    {cart.cart?.items.map((_item, index) => (
                        <ProductProvider key={`cart-item-${index}-${_item.id}`}>
                            <NavBarCartItem
                                cartIndex={index}
                            />
                        </ProductProvider>
                    ))}
                </div>
            </ScrollArea>

            <Separator className="m-4" />
            <div className="flex justify-between">
                <p>Total</p>
                <p className="font-bold">{(totalPrice + shippingRate).toFixed(2)} €</p>
            </div>

            <SheetFooter>
                <SheetClose asChild>
                    <Button asChild className="mt-2 w-full h-fit">
                        <Link to='/shop/cart'>
                            Ver articulos en carrito
                        </Link>
                    </Button>
                </SheetClose>
            </SheetFooter>
        </>
    )
}


export function NavBarCart() {
    const cart = useCart()
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button id='navBarCartButton'>
                    <IoCartOutline />
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[500px]">
                <SheetHeader>
                    <SheetTitle>Mi cesta</SheetTitle>
                </SheetHeader>
                <DialogDescription></DialogDescription>

                {cart.cart?.items.length == 0 ? <NavBarCartEmpty /> : <NavBarCartFilled />}
            </SheetContent>
        </Sheet>
    )
}