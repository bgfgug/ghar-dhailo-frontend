
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/context/CartContext';
import formatPrice from '@/utils/formatPrice';
import ButtonLoading from '@/components/ui/skeletons/ButtonLoading';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  items, 
  subtotal, 
  deliveryFee, 
  isSubmitting,
  onSubmit 
}) => {
  const total = subtotal + deliveryFee;

  return (
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
        onClick={onSubmit}
        aria-label="Place your order"
      >
        {isSubmitting ? (
          <>
            <ButtonLoading className="mr-2" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingBag className="mr-2" size={20} />
            Place Order ({formatPrice(total)})
          </>
        )}
      </Button>
      
      <p className="text-center text-gray-500 text-sm mt-4">
        By placing your order, you agree to our terms and conditions.
      </p>
    </div>
  );
};

export default OrderSummary;
