
import React from 'react';
import { Plus, Check } from 'lucide-react';
import { GroceryItem } from '@/data/groceries';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { formatPriceWithUnit } from '@/utils/formatPrice';
import OptimizedImage from '@/components/ui/optimized-image';
import AccessibleButton from '@/components/ui/accessible-button';

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
    <article className="nepal-card" aria-labelledby={`item-${item.id}`}>
      <div className="aspect-video overflow-hidden relative">
        <OptimizedImage
          src={item.image} 
          alt={`${item.name} grocery item`}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1" role="group" aria-label="Product badges">
          {item.vegetarian && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full" aria-label="Vegetarian">
              Veg
            </span>
          )}
          {item.organic && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full" aria-label="Organic">
              Organic
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h3 id={`item-${item.id}`} className="font-medium text-gray-900">{item.name}</h3>
            {item.name_np && (
              <p className="text-sm text-gray-500 font-nepali" lang="ne">{item.name_np}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-semibold text-gray-900" aria-label={`Price: ${formatPriceWithUnit(item.price, item.unit)}`}>
              {formatPriceWithUnit(item.price, item.unit)}
            </p>
            {item.unitAlt && (
              <span className="text-xs text-gray-500">({item.unitAlt})</span>
            )}
          </div>
        </div>

        <div className="mt-3">
          {!cartItem ? (
            <AccessibleButton 
              variant="outline" 
              size="sm" 
              className="w-full border-saffron-200 text-saffron-700 hover:bg-saffron-50"
              onClick={handleAddToCart}
              disabled={!item.inStock}
              ariaLabel={item.inStock ? `Add ${item.name} to cart` : `${item.name} is out of stock`}
            >
              {item.inStock ? (
                <>
                  <Plus size={16} className="mr-1" aria-hidden="true" />
                  Add
                </>
              ) : (
                "Out of Stock"
              )}
            </AccessibleButton>
          ) : (
            <div 
              className="flex items-center justify-between border border-gray-200 rounded-md"
              role="group"
              aria-label={`Quantity controls for ${item.name}. Current quantity: ${cartItem.quantity}`}
            >
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={handleDecrement}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                -
              </button>
              <span className="px-3 py-1" aria-label="Quantity">{cartItem.quantity}</span>
              <button
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md focus:outline-none focus:ring-2 focus:ring-ring"
                onClick={handleIncrement}
                aria-label={`Increase quantity of ${item.name}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default GroceryCard;
