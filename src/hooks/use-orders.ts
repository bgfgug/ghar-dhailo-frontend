
import { useMutation, useQuery } from '@tanstack/react-query';
import { orderApi } from '@/services/api';

export function useSubmitOrder() {
  return useMutation({
    mutationFn: orderApi.submitOrder
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id
  });
}

export function useUserOrders(userId: string) {
  return useQuery({
    queryKey: ['orders', 'user', userId],
    queryFn: () => orderApi.getUserOrders(userId),
    enabled: !!userId
  });
}
