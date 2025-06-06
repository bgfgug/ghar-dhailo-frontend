
import { useMutation, useQuery } from '@tanstack/react-query';
import { orderApi } from '@/services/api';
import { OrderStatus } from '@/types/api';
import { 
  getEstimatedDeliveryTime, 
  getRouteInfo, 
  getDriverLocation,
  getOrderTracking,
  calculateDistance,
  getLocationInfo
} from '@/services/mapsApi';

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

// Enhanced order tracking with real-time updates
export function useOrderTracking(orderId: string) {
  return useQuery({
    queryKey: ['order', orderId, 'tracking'],
    queryFn: () => getOrderTracking(orderId),
    enabled: !!orderId,
    refetchInterval: (data) => {
      // Stop refetching if order is delivered or cancelled
      const status = data?.status;
      return (status === 'delivered' || status === 'cancelled') ? false : 10000;
    },
  });
}

// Driver location tracking
export function useDriverLocation(driverId: string) {
  return useQuery({
    queryKey: ['driver', driverId, 'location'],
    queryFn: () => {
      return Promise.resolve(getDriverLocation());
    },
    enabled: !!driverId,
    refetchInterval: 5000, // 5 seconds for real-time tracking
  });
}

// Delivery estimates with route calculation
export function useDeliveryEstimate(orderId: string, status: OrderStatus) {
  return useQuery({
    queryKey: ['order', orderId, 'estimate'],
    queryFn: () => {
      const routeInfo = getRouteInfo();
      return Promise.resolve({
        estimatedMinutes: getEstimatedDeliveryTime(status),
        route: routeInfo,
        distance: routeInfo.distance,
        duration: routeInfo.duration
      });
    },
    enabled: !!orderId && (status === 'out_for_delivery' || status === 'processing'),
    refetchInterval: 30000, // 30 seconds
  });
}

// Location information
export function useLocationInfo(type: 'restaurant' | 'customer' | 'driver') {
  return useQuery({
    queryKey: ['location', type],
    queryFn: () => Promise.resolve(getLocationInfo(type)),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Distance calculation between locations
export function useDistanceCalculation(from?: { lat: number; lng: number }, to?: { lat: number; lng: number }) {
  return useQuery({
    queryKey: ['distance', from, to],
    queryFn: () => {
      if (!from || !to) return Promise.resolve('0 km');
      return Promise.resolve(calculateDistance(from, to));
    },
    enabled: !!(from && to),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
