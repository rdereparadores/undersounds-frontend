import {
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { Separator } from "../ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCart } from "@/hooks/cart/useCart"
import { useEffect, useState } from "react"
import { NavBarCartItem } from "./NavBarCartItem"
import { PopulatedCartProps } from "@/hooks/cart/CartContext"

export const NavBarCartFilled = () => {
    const cart = useCart()
    const [populatedCart, setPopulatedCart] = useState<PopulatedCartProps>()

    useEffect(() => {
        cart.getPopulatedCart().then(cart => setPopulatedCart(cart))
    }, [cart])

    if (populatedCart === undefined) return <></>

    return (
        <>
            <ScrollArea className="mt-2 h-[60%]">
                <div className="flex flex-col gap-2">
                    {populatedCart.items.map((_item, index) => (
                        <NavBarCartItem
                            key={index}
                            item={_item}
                        />
                    ))}
                </div>
            </ScrollArea>

            <Separator className="m-4" />
            <div className="flex justify-between items-end">
                <p>Total</p>
                <p className="font-bold text-xl">{populatedCart.totalPrice.toFixed(2)} €</p>
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