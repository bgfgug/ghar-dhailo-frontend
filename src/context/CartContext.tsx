
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem } from '../data/restaurants';
import { GroceryItem } from '../data/groceries';

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId?: string;
  itemType: 'food' | 'grocery';
};

type CartContextType = {
  items: CartItemType[];
  addItem: (item: MenuItem | GroceryItem, itemType: 'food' | 'grocery', restaurantId?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItemType[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('gharDhailoCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gharDhailoCart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: MenuItem | GroceryItem, itemType: 'food' | 'grocery', restaurantId?: string) => {
    setItems(prev => {
      // Check if item already exists in cart
      const existingItem = prev.find(
        cartItem => cartItem.id === item.id && cartItem.itemType === itemType
      );

      if (existingItem) {
        // Update quantity if item exists
        return prev.map(cartItem => 
          cartItem.id === item.id && cartItem.itemType === itemType
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item
        const newItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
          restaurantId: itemType === 'food' ? restaurantId : undefined,
          itemType,
        };
        // Show toast notification when adding item
        return [...prev, newItem];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }

    setItems(prev =>
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      getItemCount,
      getTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
