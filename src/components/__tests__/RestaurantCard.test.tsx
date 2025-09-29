
import { render } from '@testing-library/react';
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
    const { getByText } = renderWithRouter(<RestaurantCard restaurant={mockRestaurant} />);
    
    expect(getByText(mockRestaurant.name)).toBeInTheDocument();
    expect(getByText(mockRestaurant.rating.toString())).toBeInTheDocument();
    expect(getByText(`${mockRestaurant.deliveryTime} mins`)).toBeInTheDocument();
  });

  test('displays cuisine tags', () => {
    const { getByText } = renderWithRouter(<RestaurantCard restaurant={mockRestaurant} />);
    
    mockRestaurant.cuisine.forEach(cuisine => {
      expect(getByText(cuisine)).toBeInTheDocument();
    });
  });

  test('has correct link to restaurant detail page', () => {
    const { getByRole } = renderWithRouter(<RestaurantCard restaurant={mockRestaurant} />);
    
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', `/product/${mockRestaurant.id}`);
  });
});
