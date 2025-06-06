
import { mockApiCall } from '@/utils/mockDelay';
import { restaurants } from '@/data/restaurants';
import { groceries } from '@/data/groceries';
import { categories } from '@/data/categories';
import { promos } from '@/data/promos';
import { festivals } from '@/data/festivals';
import { OrderStatus, OrderTrackingInfo } from '@/types/api';
import { getOrderTracking as getMapsOrderTracking } from '@/services/mapsApi';

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

// Enhanced Order API with comprehensive tracking
export const orderApi = {
  submitOrder: async (orderData: any) => {
    // Simulate order submission
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    return mockApiCall({
      success: true,
      orderId,
      timestamp: new Date().toISOString(),
      estimatedDelivery: '30-45 minutes',
      trackingUrl: `/order/tracking/${orderId}`
    }, 1500); // Longer delay for order submission
  },
  
  getOrderById: async (id: string) => {
    // Enhanced mock order data
    return mockApiCall({
      id,
      status: 'processing' as OrderStatus,
      items: [
        { name: "Dal Bhat Set", quantity: 2, price: 350 },
        { name: "Chicken Momo", quantity: 1, price: 200 }
      ],
      total: 550,
      deliveryFee: 100,
      grandTotal: 650,
      restaurant: {
        id: 'rest1',
        name: 'Kathmandu Kitchen',
        address: 'Thamel, Kathmandu'
      },
      customer: {
        name: 'John Doe',
        phone: '+977-9801234567',
        address: 'Baneshwor, Kathmandu'
      },
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    }, API_DELAY);
  },
  
  getUserOrders: async (userId: string) => {
    // Mock user order history
    return mockApiCall([
      {
        id: 'ORDER123',
        status: 'delivered',
        total: 850,
        restaurant: 'Kathmandu Kitchen',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'ORDER124',
        status: 'processing',
        total: 650,
        restaurant: 'Himalayan Delights',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      }
    ], API_DELAY);
  },
  
  // Enhanced order tracking using maps service
  getOrderTracking: async (orderId: string) => {
    return getMapsOrderTracking(orderId);
  },

  // Cancel order
  cancelOrder: async (orderId: string) => {
    return mockApiCall({
      success: true,
      orderId,
      status: 'cancelled',
      refundAmount: 650,
      refundEta: '3-5 business days'
    }, API_DELAY);
  },

  // Rate order
  rateOrder: async (orderId: string, rating: number, comment?: string) => {
    return mockApiCall({
      success: true,
      orderId,
      rating,
      comment,
      timestamp: new Date().toISOString()
    }, API_DELAY);
  }
};
