import {
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { Separator } from "../ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/hooks/cart/useCart"
import { ProductProvider } from "@/hooks/product/ProductProvider"
import { useEffect, useState } from "react"
import { NavBarCartItem } from "./NavBarCartItem"

export const NavBarCartFilled = () => {
    const cart = useCart()
    const [totalPrice, setTotalPrice] = useState(0)

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
            <div className="flex justify-between items-end">
                <p>Total</p>
                <p className="font-bold text-xl">{totalPrice.toFixed(2)} €</p>
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