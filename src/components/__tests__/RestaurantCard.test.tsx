
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RestaurantCard from '../RestaurantCard';
import { restaurants } from '@/data/restaurants';

const mockRestaurant = restaurants[0];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('RestaurantCard', () => {
  test('renders restaurant information correctly', () => {
    renderWithRouter(<RestaurantCard restaurant={mockRestaurant} />);
    
    expect(screen.getByText(mockRestaurant.name)).toBeInTheDocument();
    expect(screen.getByText(mockRestaurant.rating.toString())).toBeInTheDocument();
    expect(screen.getByText(`${mockRestaurant.deliveryTime} mins`)).toBeInTheDocument();
  });

  test('displays cuisine tags', () => {
    renderWithRouter(<RestaurantCard restaurant={mockRestaurant} />);
    
    mockRestaurant.cuisine.forEach(cuisine => {
      expect(screen.getByText(cuisine)).toBeInTheDocument();
    });
  });

  test('has correct link to restaurant detail page', () => {
    renderWithRouter(<RestaurantCard restaurant={mockRestaurant} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/product/${mockRestaurant.id}`);
  });
});
