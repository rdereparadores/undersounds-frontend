import {
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Link } from "react-router"

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