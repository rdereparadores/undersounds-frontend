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
import { ItemCesta } from "../cart/ItemCesta"
import { DialogDescription } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CartProps { emptyCart: boolean }

const NavBarCestaEmpty = () => (
    <>
        <div className="flex flex-col items-center gap-2">
            <img src="icons/carritoVacio.svg" width="100" height="100" />
            <p className="font-bold">Tu carrito esta vacío</p>
            <p className="text-center">Explora multitud de artículos a buen precio desde nuestra página principal</p>
            <SheetFooter>
                <SheetClose asChild>
                    <Button asChild>
                        <Link to="/shop">
                            Explorar Articulos
                        </Link>
                    </Button>
                </SheetClose>
            </SheetFooter>
        </div>
    </>
)

const NavBarCestaNotEmpty = () => ( /* {items}:ItemsCestaProps*/
    <>
        <ScrollArea className="mt-2 h-[60%] pr-4">
            <div className="flex flex-col gap-2">
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url="" ></ItemCesta>
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url=""></ItemCesta>
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url=""></ItemCesta>
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url="" ></ItemCesta>
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url="" ></ItemCesta>
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url="" ></ItemCesta>
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url="" ></ItemCesta>
                <ItemCesta nombre="YHLQMDG" formato="CD" precio={17} url="" ></ItemCesta>
                {/* {items.map((items,index) => 
                <ItemCesta key={index} nombre={items.nombre} formato={items.formato}
                precio={items.precio} url={items.url}/>
            )}*/}
            </div>
        </ScrollArea>

        <Separator className="m-4" />
        <div className="flex justify-between">
            <p>Total</p>
            <p className="font-bold">PrecioTotal</p>
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


export function NavBarCart({ emptyCart }: CartProps) {
    return (
        <Sheet>

            <SheetTrigger asChild>
                <Button>
                    <IoCartOutline />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Mi cesta</SheetTitle>
                </SheetHeader>
                <DialogDescription></DialogDescription>

                {emptyCart ? <NavBarCestaEmpty /> : <NavBarCestaNotEmpty />} {/*items={ejemplo}*/}
            </SheetContent>
        </Sheet>
    )
}