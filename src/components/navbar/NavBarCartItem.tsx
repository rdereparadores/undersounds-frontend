import {
    SheetClose
} from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { Link } from "react-router"
import { useCart } from "@/hooks/cart/useCart"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { FaRegTrashAlt } from "react-icons/fa"
import { PopulatedCartItemProps } from "@/hooks/cart/CartContext"

export const NavBarCartItem = ({ item }: { item: PopulatedCartItemProps }) => {
    const cart = useCart()

    return (
        <Card className="flex p-4 gap-2">
            <SheetClose asChild>
                <Link to={`/${item.type}/${item.id}`}>
                    <img className="w-28 h-28 flex rounded-lg" src={item.imgUrl}></img>
                </Link>
            </SheetClose>
            <div className="flex grow">
                <div className="flex justify-between grow">
                    <div>
                        <SheetClose asChild>
                            <Link to={`/${item.type}/${item.id}`}>
                                <p className="font-medium">{item.title}</p>
                            </Link>
                        </SheetClose>
                        <div className="flex gap-2 py-2">
                            <Badge>{item.type == 'song' ? 'Canción' : 'Álbum'}</Badge>
                            <Badge variant='outline'>{item.format}</Badge>
                        </div>
                        <p className="text-sm">Unidades: {item.quantity}</p>
                        <p className="font-medium text-lg">{item.price.toFixed(2)} €</p>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <div>
                        <Button variant="destructive"
                            onClick={() => {
                                cart.remove(item)
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