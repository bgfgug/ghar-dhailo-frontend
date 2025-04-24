
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Trash2, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import formatPrice from '@/utils/formatPrice';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const deliveryFee = items.length > 0 ? 100 : 0;
  const total = getTotal();
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeItem(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="md:col-span-2">
              {items.length > 0 ? (
                <div className="bg-white rounded-lg shadow-sm divide-y">
                  {items.map(item => (
                    <div key={item.id} className="p-4 flex">
                      <div className="w-20 h-20 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                        <p className="text-gray-500 text-sm">{formatPrice(item.price)} each</p>
                        
                        <div className="mt-2 flex justify-between items-center">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-gray-200 rounded">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-3 py-1">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-crimson-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Clear cart button */}
                  <div className="p-4">
                    <button
                      onClick={() => clearCart()}
                      className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Clear cart
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Looks like you haven't added any items yet</p>
                  <Button asChild>
                    <Link to="/" className="inline-block">
                      Start Shopping
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            
            {/* Order summary */}
            {items.length > 0 && (
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatPrice(total + deliveryFee)}</span>
                    </div>
                  </div>
                  
                  {/* Note about delivery */}
                  <div className="bg-yellow-50 p-3 rounded-md mb-6 flex">
                    <AlertCircle size={18} className="text-yellow-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-yellow-700">
                      Delivery time may vary based on your location and restaurant availability.
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
