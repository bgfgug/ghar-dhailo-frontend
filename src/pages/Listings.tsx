
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/data/restaurants';
import { Filter, X, SlidersHorizontal, Check } from 'lucide-react';

type SortOption = 'popular' | 'rating' | 'delivery';
type FilterOptions = {
  minRating: number;
  maxDeliveryTime: number | null;
  cuisine: string[];
};

const Listings = () => {
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    minRating: 0,
    maxDeliveryTime: null,
    cuisine: [],
  });

  // Get unique cuisines
  const allCuisines = [...new Set(restaurants.flatMap(r => r.cuisine))];

  // Apply filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (restaurant.rating < filters.minRating) return false;
    if (filters.maxDeliveryTime !== null && restaurant.deliveryTime > filters.maxDeliveryTime) return false;
    if (filters.cuisine.length > 0 && !restaurant.cuisine.some(c => filters.cuisine.includes(c))) return false;
    return true;
  });

  // Apply sorting
  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'delivery':
        return a.deliveryTime - b.deliveryTime;
      case 'popular':
      default:
        // Popular is a combination of high rating and low delivery time
        return (b.rating * 10 - b.deliveryTime * 0.1) - (a.rating * 10 - a.deliveryTime * 0.1);
    }
  });

  const toggleCuisine = (cuisine: string) => {
    setFilters(prev => {
      const cuisines = prev.cuisine.includes(cuisine) 
        ? prev.cuisine.filter(c => c !== cuisine)
        : [...prev.cuisine, cuisine];
      return { ...prev, cuisine: cuisines };
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Restaurants</h1>
          <p className="text-gray-500 mb-6">Find the best food in your area</p>
          
          {/* Filters and sorting */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <Filter size={16} />
              <span>Filters</span>
              {(filters.minRating > 0 || filters.maxDeliveryTime !== null || filters.cuisine.length > 0) && (
                <span className="bg-saffron-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                  {filters.minRating > 0 || filters.maxDeliveryTime !== null ? filters.cuisine.length + 1 : filters.cuisine.length}
                </span>
              )}
            </button>
            
            <div className="flex gap-2">
              <div className="bg-white border border-gray-200 rounded-md divide-x overflow-hidden">
                <button 
                  onClick={() => setSortBy('popular')}
                  className={`px-4 py-2 ${sortBy === 'popular' ? 'bg-saffron-50 text-saffron-700' : 'text-gray-700'}`}
                >
                  Popular
                </button>
                <button 
                  onClick={() => setSortBy('rating')}
                  className={`px-4 py-2 ${sortBy === 'rating' ? 'bg-saffron-50 text-saffron-700' : 'text-gray-700'}`}
                >
                  Rating
                </button>
                <button 
                  onClick={() => setSortBy('delivery')}
                  className={`px-4 py-2 ${sortBy === 'delivery' ? 'bg-saffron-50 text-saffron-700' : 'text-gray-700'}`}
                >
                  Fastest
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filter Options</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Rating filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h4>
                  <div className="flex items-center gap-2">
                    {[0, 3, 3.5, 4, 4.5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setFilters(prev => ({ ...prev, minRating: rating }))}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.minRating === rating 
                            ? 'bg-saffron-500 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {rating === 0 ? 'Any' : rating}+
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Delivery time filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Delivery Time</h4>
                  <div className="flex items-center gap-2">
                    {[null, 30, 45, 60].map(time => (
                      <button
                        key={time === null ? 'any' : time}
                        onClick={() => setFilters(prev => ({ ...prev, maxDeliveryTime: time }))}
                        className={`px-3 py-1 rounded-full text-sm ${
                          filters.maxDeliveryTime === time 
                            ? 'bg-saffron-500 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {time === null ? 'Any' : `< ${time} min`}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Cuisine filter */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cuisine</h4>
                  <div className="flex flex-wrap gap-2">
                    {allCuisines.map(cuisine => (
                      <button
                        key={cuisine}
                        onClick={() => toggleCuisine(cuisine)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                          filters.cuisine.includes(cuisine) 
                            ? 'bg-saffron-500 text-white' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {filters.cuisine.includes(cuisine) && <Check size={14} />}
                        {cuisine}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <button 
                  onClick={() => setFilters({ minRating: 0, maxDeliveryTime: null, cuisine: [] })}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="px-4 py-2 bg-saffron-500 text-white rounded-md hover:bg-saffron-600"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Results info */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-600">
              {sortedRestaurants.length} restaurants found
            </p>
            
            {/* Active filters badges */}
            {(filters.minRating > 0 || filters.maxDeliveryTime !== null || filters.cuisine.length > 0) && (
              <div className="flex gap-2 overflow-x-auto">
                {filters.minRating > 0 && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
                    {filters.minRating}+ Stars
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                      className="ml-1 text-gray-600 hover:text-gray-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {filters.maxDeliveryTime !== null && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
                    Under {filters.maxDeliveryTime} min
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, maxDeliveryTime: null }))}
                      className="ml-1 text-gray-600 hover:text-gray-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                )}
                
                {filters.cuisine.map(cuisine => (
                  <span key={cuisine} className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center">
                    {cuisine}
                    <button 
                      onClick={() => toggleCuisine(cuisine)}
                      className="ml-1 text-gray-600 hover:text-gray-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Restaurant list */}
          {sortedRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="font-medium text-xl mb-2">No restaurants found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find more options</p>
              <button 
                onClick={() => setFilters({ minRating: 0, maxDeliveryTime: null, cuisine: [] })}
                className="px-4 py-2 bg-saffron-500 text-white rounded-md hover:bg-saffron-600"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Listings;
