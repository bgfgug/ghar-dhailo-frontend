
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import formatPrice from '@/utils/formatPrice';

interface FormData {
  fullName: string;
  phone: string;
  address: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
}

const Checkout = () => {
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const subtotal = getTotal();
  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^(98|97)\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid Nepali phone number (e.g., 98XXXXXXXX)';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please correct the errors in your form.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Generate a random order ID (in a real app, this would come from the server)
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Simulate API call with a timeout
    setTimeout(() => {
      // Process the order (in a real app, send data to a server)
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId} has been confirmed.`,
      });
      
      // Navigate to order success page with order details
      navigate('/order/success', { 
        state: {
          orderId,
          total,
          items: items.reduce((acc, item) => acc + item.quantity, 0)
        }
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Cart
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Delivery Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={3}
                      placeholder="Enter your delivery address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6"
                  size="lg"
                  disabled={isSubmitting || items.length === 0}
                  onClick={handleSubmit}
                >
                  <ShoppingBag className="mr-2" size={20} />
                  {isSubmitting ? "Processing..." : `Place Order (${formatPrice(total)})`}
                </Button>
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  By placing your order, you agree to our terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
