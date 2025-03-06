import { Card, CardContent } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useCart } from '@/hooks/cartContext.tsx';
import { Product } from '../../routes/Shop';

type ProductCardProps = {
    product: Product;
    isCartVisible: boolean;
};

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleComprar = () => {
        console.log("Añadiendo al carrito:", product); // DEBUG
        addToCart(product);
    };

    return (
        <Card className={`p-4 flex flex-col justify-between min-h-[300px]`}>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
            />
            <CardContent className="flex flex-col flex-grow justify-between mt-2">
                <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-500">{product.description}</p>
                    <p className="mt-1 font-bold">${product.price}</p>
                </div>
                <Button className="mt-2 w-full" onClick={handleComprar}>
                    Comprar
                </Button>
            </CardContent>
        </Card>
    );
}
