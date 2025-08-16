import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">🦍 Gorilla Store</h1>
            <p className="text-green-200 mt-1">
              Los mejores gorilas para tu familia
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart className="w-8 h-8" />
              {itemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm text-green-200">Total</div>
              <div className="font-bold">${state.total.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;