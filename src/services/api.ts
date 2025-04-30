import { mockApiCall } from '@/utils/mockDelay';
import { restaurants } from '@/data/restaurants';
import { groceries } from '@/data/groceries';
import { categories } from '@/data/categories';
import { promos } from '@/data/promos';
import { festivals } from '@/data/festivals';
import { OrderStatus, OrderTrackingInfo } from '@/types/api';
import { getDriverLocation, getRestaurantLocation, getCustomerLocation, getRouteInfo, getEstimatedDeliveryTime } from '@/services/mapsApi';

// Base API service with common functionality
const API_DELAY = 800; // Simulate network delay in ms

// Restaurant API services
export const restaurantApi = {
  getAll: async () => {
    return mockApiCall(restaurants, API_DELAY);
  },
  
  getById: async (id: string) => {
    const restaurant = restaurants.find(r => r.id === id);
    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }
    return mockApiCall(restaurant, API_DELAY);
  },
  
  searchRestaurants: async (query: string) => {
    const results = restaurants.filter(
      r => r.name.toLowerCase().includes(query.toLowerCase()) || 
           r.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase()))
    );
    return mockApiCall(results, API_DELAY);
  }
};

// Grocery API services
export const groceryApi = {
  getAll: async () => {
    return mockApiCall(groceries, API_DELAY);
  },
  
  getById: async (id: string) => {
    const grocery = groceries.find(g => g.id === id);
    if (!grocery) {
      throw new Error(`Grocery item with id ${id} not found`);
    }
    return mockApiCall(grocery, API_DELAY);
  },
  
  searchGroceries: async (query: string) => {
    const results = groceries.filter(
      g => g.name.toLowerCase().includes(query.toLowerCase()) || 
           g.category.toLowerCase().includes(query.toLowerCase())
    );
    return mockApiCall(results, API_DELAY);
  },
  
  getByCategory: async (categoryId: string) => {
    const results = groceries.filter(g => g.category === categoryId);
    return mockApiCall(results, API_DELAY);
  }
};

// Category API services
export const categoryApi = {
  getAll: async () => {
    return mockApiCall(categories, API_DELAY);
  },
  
  getById: async (id: string) => {
    const category = categories.find(c => c.id === id);
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return mockApiCall(category, API_DELAY);
  }
};

// Promo API services
export const promoApi = {
  getAll: async () => {
    return mockApiCall(promos, API_DELAY);
  },
  
  getActivePromos: async () => {
    const now = new Date();
    const active = promos.filter(p => {
      if (!p.expiry) return true;
      return new Date(p.expiry) > now;
    });
    return mockApiCall(active, API_DELAY);
  }
};

// Festival API services
export const festivalApi = {
  getAll: async () => {
    return mockApiCall(festivals, API_DELAY);
  },
  
  getUpcoming: async () => {
    const now = new Date();
    const upcoming = festivals.filter(f => new Date(f.startDate) > now);
    return mockApiCall(upcoming, API_DELAY);
  },
  
  getCurrent: async () => {
    const now = new Date();
    const current = festivals.filter(
      f => new Date(f.startDate) <= now && new Date(f.endDate) >= now
    );
    return mockApiCall(current, API_DELAY);
  }
};

// Order API
export const orderApi = {
  submitOrder: async (orderData: any) => {
    // Simulate order submission
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    return mockApiCall({
      success: true,
      orderId,
      timestamp: new Date().toISOString()
    }, 1500); // Longer delay for order submission
  },
  
  getOrderById: async (id: string) => {
    // Mock order data (will be replaced with real API)
    return mockApiCall({
      id,
      status: 'processing',
      items: [],
      total: 0,
      createdAt: new Date().toISOString()
    }, API_DELAY);
  },
  
  getUserOrders: async (userId: string) => {
    // Mock user orders (will be replaced with real API)
    return mockApiCall([], API_DELAY);
  },

  // Add the missing getOrderTracking method
  getOrderTracking: async (orderId: string): Promise<OrderTrackingInfo> => {
    // This is a mock implementation that will be replaced with actual API call
    const restaurantLocation = getRestaurantLocation();
    const customerLocation = getCustomerLocation();
    const driverLocation = getDriverLocation();
    const route = getRouteInfo();
    
    // Determine a random order status for testing
    const statuses: OrderStatus[] = ['processing', 'out_for_delivery', 'delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * 2)] as OrderStatus;
    
    return mockApiCall({
      orderId,
      status: randomStatus,
      restaurantLocation,
      customerLocation,
      driverLocation,
      driverName: 'John Driver',
      driverPhone: '+977-9812345678',
      estimatedDeliveryMinutes: getEstimatedDeliveryTime(randomStatus),
      distanceRemaining: route.distance,
      route: route.path,
      lastUpdated: new Date().toISOString()
    }, API_DELAY);
  }
};
