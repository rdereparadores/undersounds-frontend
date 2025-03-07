// components/shop/cartPanel.tsx
import { useCart } from '../../hooks/cartContext.tsx';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CartPanel() {
    const { cart, updateQuantity, removeFromCart } = useCart();

    return (
        <div className="bg-white p-4 shadow-md rounded-lg w-full">
            <h2 className="text-lg font-semibold mb-4">Carrito</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Tu carrito está vacío.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <Card key={item.id} className="flex items-center p-2">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <CardContent className="ml-4 flex-1">
                                <h3 className="text-md font-medium">{item.name}</h3>
                                <p className="text-gray-600">${item.price}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <select
                                        className="border p-1 rounded"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                    >
                                        {[...Array(10).keys()].map((num) => (
                                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                                        ))}
                                    </select>
                                    <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                                        Eliminar
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
