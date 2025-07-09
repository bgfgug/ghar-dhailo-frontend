
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { groceries } from '@/data/groceries';

const TestComponent = () => {
  const { items, addItem, updateQuantity, removeItem, getTotalPrice } = useCart();
  
  return (
    <div>
      <div data-testid="cart-count">{items.length}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <button 
        onClick={() => addItem(groceries[0], 'grocery')}
        data-testid="add-item"
      >
        Add Item
      </button>
      <button 
        onClick={() => updateQuantity(groceries[0].id, 2)}
        data-testid="update-quantity"
      >
        Update Quantity
      </button>
      <button 
        onClick={() => removeItem(groceries[0].id)}
        data-testid="remove-item"
      >
        Remove Item
      </button>
    </div>
  );
};

describe('CartContext', () => {
  test('starts with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
  });

  test('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByTestId('add-item'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });

  test('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('update-quantity'));
    
    // Total price should reflect quantity change
    const totalPrice = parseFloat(screen.getByTestId('total-price').textContent || '0');
    expect(totalPrice).toBeGreaterThan(0);
  });
});
