import React from 'react';
import { CartProvider } from '../contexts/CartContext';
import Header from '../components/Header';
import GorillaCard from '../components/GorillaCard';
import Cart from '../components/Cart';
import { gorillas } from '../data/gorillas';

const Index = () => {
  console.log('Rendering Index page with', gorillas.length, 'gorillas');

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Products Grid */}
            <div className="flex-grow">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Nuestros Gorilas Disponibles
                </h2>
                <p className="text-gray-600">
                  Encuentra el compañero perfecto para tu familia. Todos nuestros gorilas están bien cuidados y entrenados.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gorillas.map((gorilla) => (
                  <GorillaCard key={gorilla.id} gorilla={gorilla} />
                ))}
              </div>
            </div>
            
            {/* Cart Sidebar */}
            <div className="lg:w-80">
              <div className="sticky top-8">
                <Cart />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="bg-green-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">🦍 Gorilla Store</h3>
            <p className="text-green-200 mb-4">
              Conectando familias con gorilas extraordinarios desde 2024
            </p>
            <div className="text-sm text-green-300">
              <p>📞 1-800-GORILLA | 📧 info@gorillastore.com</p>
              <p className="mt-2">© 2024 Gorilla Store. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;