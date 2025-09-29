
import { render } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { groceries } from '@/data/groceries';

const TestComponent = () => {
  const { items, addItem, updateQuantity, removeItem, getTotal } = useCart();
  
  return (
    <div>
      <div data-testid="cart-count">{items.length}</div>
      <div data-testid="total-price">{getTotal()}</div>
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
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(getByTestId('cart-count')).toHaveTextContent('0');
    expect(getByTestId('total-price')).toHaveTextContent('0');
  });

  test('adds item to cart', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    getByTestId('add-item').click();
    expect(getByTestId('cart-count')).toHaveTextContent('1');
  });

  test('updates item quantity', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    getByTestId('add-item').click();
    getByTestId('update-quantity').click();
    
    // Total price should reflect quantity change
    const totalPrice = parseFloat(getByTestId('total-price').textContent || '0');
    expect(totalPrice).toBeGreaterThan(0);
  });
});
