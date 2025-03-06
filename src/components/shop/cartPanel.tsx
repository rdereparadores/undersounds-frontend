// components/shop/cartPanel.tsx
import { useCart } from '@/hooks/cartContext.tsx';

export default function CartPanel() {
    const { cart } = useCart();

    return (
        <div className="bg-white p-4 shadow rounded h-full">
            <h2 className="text-xl font-bold mb-4">Carrito</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul className="space-y-2">
                    {cart.map((product, index) => (
                        <li key={index} className="border-b pb-2">
                            <p className="font-semibold">{product.name}</p>
                            <p>${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
