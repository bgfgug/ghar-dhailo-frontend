
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import formatPrice from '@/utils/formatPrice';

interface OrderSuccessState {
  orderId: string;
  total: number;
  items: number;
  paymentMethod?: string;
}

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state as OrderSuccessState;
  
  useEffect(() => {
    // If user navigated directly to this page without order details, redirect to home
    if (!orderDetails || !orderDetails.orderId) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  if (!orderDetails || !orderDetails.orderId) {
    return null;
  }

  const getPaymentMethodDisplay = (method: string = 'cod') => {
    switch(method) {
      case 'esewa':
        return 'eSewa Wallet';
      case 'cod':
      default:
        return 'Cash on Delivery';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-6">
              <CheckCircle size={32} />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We've received your request and will deliver your items soon.
            </p>
            
            <div className="border rounded-lg p-6 bg-gray-50 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Order Summary</h2>
                <span className="text-sm text-gray-500">Order ID: {orderDetails.orderId}</span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span>{orderDetails.items} item(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium">{formatPrice(orderDetails.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span>{getPaymentMethodDisplay(orderDetails.paymentMethod)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span>30-45 minutes</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/">
                  <Home size={18} />
                  Back to Home
                </Link>
              </Button>
              <Button asChild className="gap-2">
                <Link to="/order/tracking/latest">
                  <ShoppingBag size={18} />
                  Track Order
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
