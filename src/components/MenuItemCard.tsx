
import React, { useState } from 'react';
import { Plus, Minus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MenuItem } from '@/data/restaurants';
import { useCart } from '@/context/CartContext';
import formatPrice from '@/utils/formatPrice';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
}

const MenuItemCard = ({ item, restaurantId }: MenuItemCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const [expanded, setExpanded] = useState(false);

  const cartItem = items.find(
    cartItem => cartItem.id === item.id && cartItem.itemType === 'food'
  );

  const handleAddToCart = () => {
    addItem(item, 'food', restaurantId);
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

  const renderSpiceLevel = () => {
    const spiceIcons = [];
    for (let i = 0; i < item.spiceLevel; i++) {
      spiceIcons.push(
        <AlertTriangle 
          key={i} 
          size={12} 
          className="text-crimson-500" 
          fill={i < item.spiceLevel ? "currentColor" : "none"} 
        />
      );
    }
    return spiceIcons;
  };

  return (
    <div className="p-4 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            {item.vegetarian && (
              <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                Veg
              </Badge>
            )}
            <div className="flex">{renderSpiceLevel()}</div>
          </div>

          {/* Item description */}
          <p className="text-sm text-gray-500 mt-1">
            {expanded ? item.description : item.description.slice(0, 65)}
            {item.description.length > 65 && !expanded && "..."}
            
            {item.description.length > 65 && (
              <button 
                onClick={() => setExpanded(!expanded)}
                className="text-saffron-600 ml-1 hover:underline"
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </p>
          
          {/* Nepali name and price */}
          <div className="flex justify-between items-center mt-2">
            {item.name_np && (
              <span className="text-xs text-gray-500 font-nepali">{item.name_np}</span>
            )}
            <span className="font-semibold text-gray-900">{formatPrice(item.price)}</span>
          </div>
        </div>
        
        <div className="ml-4 flex flex-col items-end">
          {/* Item image */}
          <div className="w-20 h-20 rounded-md overflow-hidden mb-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Add to cart button or quantity selector */}
          {!cartItem ? (
            <Button 
              variant="outline" 
              size="sm"
              className="border-saffron-200 text-saffron-700 hover:bg-saffron-50"
              onClick={handleAddToCart}
            >
              <Plus size={16} className="mr-1" />
              Add
            </Button>
          ) : (
            <div className="flex items-center border border-gray-200 rounded-md">
              <button
                className="p-1 text-gray-600 hover:bg-gray-100"
                onClick={handleDecrement}
              >
                <Minus size={16} />
              </button>
              <span className="px-2 py-1">{cartItem.quantity}</span>
              <button
                className="p-1 text-gray-600 hover:bg-gray-100"
                onClick={handleIncrement}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
