// components/shop/CartView.tsx
import { useCart } from '@/hooks/cartContext.tsx';
import { Button } from '@/components/ui/button.tsx';

type CartViewProps = {
    onClose: () => void;
};

export default function CartView({ onClose }: CartViewProps) {
    const { cart } = useCart();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 max-h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Carrito</h2>
                    <Button onClick={onClose}>Cerrar</Button>
                </div>
                {cart.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    <ul>
                        {cart.map((product, index) => (
                            <li key={index} className="border-b py-2 flex items-center gap-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-semibold">{product.name}</h3>
                                    <p className="text-gray-500">${product.price}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
