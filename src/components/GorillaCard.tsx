import React from 'react';
import { Gorilla } from '../types/gorilla';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, MapPin, Calendar, Weight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface GorillaCardProps {
  gorilla: Gorilla;
}

const GorillaCard: React.FC<GorillaCardProps> = ({ gorilla }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    console.log('Adding gorilla to cart:', gorilla.name);
    if (!gorilla.inStock) {
      toast.error('Este gorila no está disponible en este momento');
      return;
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: gorilla });
    toast.success(`${gorilla.name} ha sido añadido al carrito!`);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={gorilla.image}
          alt={gorilla.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        {!gorilla.inStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Agotado
          </Badge>
        )}
        {gorilla.inStock && (
          <Badge variant="default" className="absolute top-2 right-2 bg-green-500">
            Disponible
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl font-bold">{gorilla.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {gorilla.species}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-700 mb-4 text-sm">{gorilla.description}</p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{gorilla.age} años</span>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="w-4 h-4 text-gray-500" />
            <span>{gorilla.weight}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{gorilla.habitat}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Badge variant="outline" className="text-xs">
            {gorilla.temperament}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="text-2xl font-bold text-green-600">
          ${gorilla.price.toLocaleString()}
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={!gorilla.inStock}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {gorilla.inStock ? 'Añadir al Carrito' : 'No Disponible'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GorillaCard;