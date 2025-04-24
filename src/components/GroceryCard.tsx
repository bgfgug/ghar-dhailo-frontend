
import React from 'react';
import { Plus, Check } from 'lucide-react';
import { GroceryItem } from '@/data/groceries';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPriceWithUnit } from '@/utils/formatPrice';

interface GroceryCardProps {
  item: GroceryItem;
}

const GroceryCard = ({ item }: GroceryCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  
  const cartItem = items.find(
    cartItem => cartItem.id === item.id && cartItem.itemType === 'grocery'
  );
  
  const handleAddToCart = () => {
    addItem(item, 'grocery');
  };
  
  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(item.id, cartItem.quantity + 1);
    }
  };
  
  const handleDecrement = () => {
    if (cartItem && cartItem.quantity > 0) {
      updateQuantity(item.id, cartItem.quantity - 1);
    }
  };

  return (
    <div className="nepal-card">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {item.vegetarian && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Veg
            </span>
          )}
          {item.organic && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
              Organic
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            {item.name_np && (
              <p className="text-sm text-gray-500 font-nepali">{item.name_np}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {formatPriceWithUnit(item.price, item.unit)}
            </p>
            {item.unitAlt && (
              <span className="text-xs text-gray-500">({item.unitAlt})</span>
            )}
          </div>
        </div>

        <div className="mt-3">
          {!cartItem ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-saffron-200 text-saffron-700 hover:bg-saffron-50"
              onClick={handleAddToCart}
              disabled={!item.inStock}
            >
              {item.inStock ? (
                <>
                  <Plus size={16} className="mr-1" />
                  Add
                </>
              ) : (
                "Out of Stock"
              )}
            </Button>
          ) : (
            <div className="flex items-center justify-between border border-gray-200 rounded-md">
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="px-3 py-1">{cartItem.quantity}</span>
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroceryCard;
