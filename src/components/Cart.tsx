import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id: number) => {
    console.log('Removing item from cart:', id);
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success('Gorila removido del carrito');
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    console.log('Updating quantity:', id, quantity);
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleCheckout = () => {
    console.log('Processing checkout for items:', state.items);
    toast.success('¡Compra procesada exitosamente! Tus gorilas llegarán pronto.');
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrito de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Tu carrito está vacío
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Carrito de Compras ({state.items.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-grow">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                <p className="text-gray-600 text-xs">{item.species}</p>
                <p className="font-bold text-green-600">
                  ${item.price.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                ${state.total.toLocaleString()}
              </span>
            </div>
            <Button onClick={handleCheckout} className="w-full" size="lg">
              Proceder al Pago
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Cart;