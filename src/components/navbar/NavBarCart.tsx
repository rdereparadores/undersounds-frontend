import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { IoCartOutline } from "react-icons/io5"
import { DialogDescription } from "../ui/dialog"
import { useCart } from "@/hooks/cart/useCart"
import { NavBarCartEmpty } from "./NavBarCartEmpty"
import { NavBarCartFilled } from "./NavBarCartFilled"

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

                {cart.cart.items.length == 0 ? <NavBarCartEmpty /> : <NavBarCartFilled />}
            </SheetContent>
        </Sheet>
    )
}