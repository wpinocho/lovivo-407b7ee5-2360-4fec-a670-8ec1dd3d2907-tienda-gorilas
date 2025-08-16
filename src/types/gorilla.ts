export interface Gorilla {
  id: number;
  name: string;
  species: string;
  price: number;
  image: string;
  description: string;
  age: number;
  weight: string;
  habitat: string;
  temperament: string;
  inStock: boolean;
}

export interface CartItem extends Gorilla {
  quantity: number;
}