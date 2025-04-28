
import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '@/services/api';
import type { Restaurant } from '@/data/restaurants';

export function useRestaurants() {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantApi.getAll
  });
}

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantApi.getById(id),
    enabled: !!id
  });
}

export function useSearchRestaurants(query: string) {
  return useQuery({
    queryKey: ['restaurants', 'search', query],
    queryFn: () => restaurantApi.searchRestaurants(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
