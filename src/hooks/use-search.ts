import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { restaurants } from '@/data/restaurants';
import { groceries } from '@/data/groceries';

export interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'food' | 'grocery';
  image: string;
  price?: number;
  rating?: number;
  deliveryTime?: number;
  category?: string;
  restaurantId?: string;
}

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Search restaurants
    restaurants.forEach(restaurant => {
      if (
        restaurant.name.toLowerCase().includes(searchTerm) ||
        restaurant.name_np?.toLowerCase().includes(searchTerm) ||
        restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm)) ||
        restaurant.address.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: restaurant.id,
          name: restaurant.name,
          type: 'restaurant',
          image: restaurant.image,
          rating: restaurant.rating,
          deliveryTime: restaurant.deliveryTime,
        });
      }

      // Search menu items
      restaurant.menu.forEach(item => {
        if (
          item.name.toLowerCase().includes(searchTerm) ||
          item.name_np?.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm)
        ) {
          results.push({
            id: item.id,
            name: item.name,
            type: 'food',
            image: item.image,
            price: item.price,
            category: item.category,
            restaurantId: restaurant.id,
          });
        }
      });
    });

    // Search groceries
    groceries.forEach(item => {
      if (
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: item.id,
          name: item.name,
          type: 'grocery',
          image: item.image,
          price: item.price,
          category: item.category,
        });
      }
    });

    // Apply filters
    if (activeFilters.length > 0) {
      return results.filter(result => 
        activeFilters.includes(result.type) ||
        (result.category && activeFilters.includes(result.category))
      );
    }

    return results;
  }, [query, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  return {
    query,
    setQuery,
    searchResults,
    activeFilters,
    toggleFilter,
    clearFilters,
    hasResults: searchResults.length > 0,
    isSearching: query.trim().length > 0,
  };
};

// Popular searches hook
export const usePopularSearches = () => {
  return useQuery({
    queryKey: ['popular-searches'],
    queryFn: () => Promise.resolve([
      'Momo',
      'Dal Bhat',
      'Pizza',
      'Rice',
      'Spices',
      'Vegetables',
      'Thakali',
      'Newari Food'
    ]),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
};