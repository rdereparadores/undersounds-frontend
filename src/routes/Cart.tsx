import { SubTotalContainer } from "../components/cart/SubTotalContainer"
import { ItemCesta } from '@/components/cart/ItemCesta'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Link } from 'react-router'

const ejemplo = [
    {
        nombre: "YHLQMDLG",
        formato: "CD",
        precio: 7.99,
        url: "https://picsum.photos/200/300"
    },
    {
        nombre: "Tickets to my downfall",
        formato: "Vinilo",
        precio: 10,
        url: "https://picsum.photos/200/300"
    },
    {
        nombre: "Thriller",
        formato: "MP3",
        precio: 15,
        url: "https://picsum.photos/200/300"
    }
]

export function Cart() {
    return (
        <SubTotalContainer
            articleCount={4}
            price={25.99}
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
                        {ejemplo.map((items, index) =>
                            <ItemCesta key={index} nombre={items.nombre} formato={items.formato}
                                precio={items.precio} url={items.url} />
                        )}
                    </div>
                </CardContent>

                <CardFooter>

                </CardFooter>
            </Card>
        </SubTotalContainer>
    )

}

