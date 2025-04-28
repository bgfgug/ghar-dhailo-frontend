
import { useQuery } from '@tanstack/react-query';
import { promoApi } from '@/services/api';

export function usePromos() {
  return useQuery({
    queryKey: ['promos'],
    queryFn: promoApi.getAll
  });
}

export function useActivePromos() {
  return useQuery({
    queryKey: ['promos', 'active'],
    queryFn: promoApi.getActivePromos
  });
}
