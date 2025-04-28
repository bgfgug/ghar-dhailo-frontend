
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector';
import { toast } from "@/hooks/use-toast";
import { validateField, required, isNepaliPhone } from '@/utils/validate';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import DeliveryForm from '@/components/checkout/DeliveryForm';
import OrderSummary from '@/components/checkout/OrderSummary';

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

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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

    // Full name validation
    const fullNameError = validateField(formData.fullName, [
      required('Full name')
    ]);
    if (fullNameError) {
      newErrors.fullName = fullNameError;
      isValid = false;
    }

    // Phone validation
    const phoneError = validateField(formData.phone, [
      required('Phone number'),
      isNepaliPhone()
    ]);
    if (phoneError) {
      newErrors.phone = phoneError;
      isValid = false;
    }

    // Address validation
    const addressError = validateField(formData.address, [
      required('Delivery address')
    ]);
    if (addressError) {
      newErrors.address = addressError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setPaymentMethod(methodId);
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please correct the errors in your form.",
        variant: "destructive"
      });
      return;
    }

    // For eSewa payment, additional validation
    if (paymentMethod === 'esewa') {
      const esewaConfigured = document.querySelector('[data-esewa-configured="true"]');
      if (!esewaConfigured) {
        toast({
          title: "eSewa Setup Required",
          description: "Please set up your eSewa payment details first.",
          variant: "destructive"
        });
        return;
      }
    }

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleSubmit = () => {
    setShowConfirmDialog(false);
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderId} has been confirmed.`,
      });
      
      navigate('/order/success', { 
        state: {
          orderId,
          total: subtotal + deliveryFee,
          paymentMethod,
          items: items.reduce((acc, item) => acc + item.quantity, 0)
        }
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  // Render empty cart state
  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">You need to add items to your cart before checkout</p>
            <button 
              className="bg-primary text-white px-6 py-3 rounded-md font-medium"
              onClick={() => navigate('/listings')}
            >
              Browse Restaurants
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <motion.button 
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to cart"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Cart
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <DeliveryForm 
                formData={formData}
                errors={errors}
                handleChange={handleChange}
              />
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <PaymentMethodSelector 
                  onMethodChange={handlePaymentMethodChange}
                  defaultMethod={paymentMethod} 
                />
                
                {/* This hidden element will be used to track if eSewa is configured */}
                <div id="esewa-config-status" data-esewa-configured={paymentMethod === 'esewa' ? 'true' : 'false'} className="hidden"></div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OrderSummary 
                items={items}
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                isSubmitting={isSubmitting}
                onSubmit={handlePreSubmit}
              />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />

      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Confirm Your Order"
        description="Are you sure you want to place this order? You'll be charged once the order is confirmed."
        confirmText="Place Order"
        onConfirm={handleSubmit}
      />
    </div>
  );
};

export default Checkout;
