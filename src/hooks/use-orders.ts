
import { useMutation, useQuery } from '@tanstack/react-query';
import { orderApi } from '@/services/api';
import { OrderStatus } from '@/types/api';
import { getEstimatedDeliveryTime, getRouteInfo, getDriverLocation } from '@/services/mapsApi';

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

// New hooks for tracking functionality

export function useOrderTracking(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId, 'tracking'],
    queryFn: () => orderApi.getOrderTracking(orderId),
    enabled: !!orderId,
    // Real-time updates - refetch frequently when tracking an active order
    refetchInterval: 10000, // 10 seconds
  });
}

export function useDriverLocation(driverId: string) {
  return useQuery({
    queryKey: ['driver', driverId, 'location'],
    queryFn: () => {
      // This would be replaced with actual API call when you have the Google Maps API key
      return Promise.resolve(getDriverLocation());
    },
    enabled: !!driverId,
    // Real-time updates - refetch frequently for driver location
    refetchInterval: 5000, // 5 seconds
  });
}

export function useDeliveryEstimate(orderId: string, status: OrderStatus) {
  return useQuery({
    queryKey: ['order', orderId, 'estimate'],
    queryFn: () => {
      // This would be replaced with actual API call when you have the Google Maps API
      return Promise.resolve({
        estimatedMinutes: getEstimatedDeliveryTime(status),
        route: getRouteInfo()
      });
    },
    enabled: !!orderId && (status === 'out_for_delivery' || status === 'processing'),
    // Less frequent updates for estimates
    refetchInterval: 30000, // 30 seconds
  });
}
