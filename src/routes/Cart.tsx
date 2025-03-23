import { SubTotalContainer } from "../components/cart/SubTotalContainer"
import { CartItem } from '@/components/cart/CartItem'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/cart/useCart"
import { Link } from 'react-router'
import { Button } from "@/components/ui/button"

export function Cart() {
    const cart = useCart()

    return (
        <>
            {
                cart.cart!.items.length == 0 &&
                <div className="flex flex-col items-center gap-3 mt-4">
                    <img src="/public/icons/carritoVacio.svg" width="100" height="100" />
                    <p className="font-bold">Tu carrito esta vacío</p>
                    <p className="text-center">Visita la tienda, seguro que encuentras tu nuevo crush musical</p>
                    <Button asChild>
                        <Link to="/shop">
                            Explorar artículos
                        </Link>
                    </Button>
                </div>
            }
            {
                cart.cart!.items.length > 0 &&
                <SubTotalContainer
                    purchaseButtonEnabled={true}
                    purchaseButtonChildren={<Link to='../checkout'>Tramitar compra</Link>}
                >
                    <Card className="grow-[3]">
                        <CardHeader>
                            <CardTitle className='text-xl'>
                                Cesta
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-col gap-3">
                                {cart.cart?.items.map((_item, index) =>
                                    <CartItem key={index} cartIndex={index} />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </SubTotalContainer>
            }
        </>
    )

}

