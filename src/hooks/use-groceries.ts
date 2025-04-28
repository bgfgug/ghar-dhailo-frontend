
import { useQuery } from '@tanstack/react-query';
import { groceryApi } from '@/services/api';

export function useGroceries() {
  return useQuery({
    queryKey: ['groceries'],
    queryFn: groceryApi.getAll
  });
}

export function useGrocery(id: string) {
  return useQuery({
    queryKey: ['grocery', id],
    queryFn: () => groceryApi.getById(id),
    enabled: !!id
  });
}

export function useGroceriesByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['groceries', 'category', categoryId],
    queryFn: () => groceryApi.getByCategory(categoryId),
    enabled: !!categoryId
  });
}

export function useSearchGroceries(query: string) {
  return useQuery({
    queryKey: ['groceries', 'search', query],
    queryFn: () => groceryApi.searchGroceries(query),
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}
