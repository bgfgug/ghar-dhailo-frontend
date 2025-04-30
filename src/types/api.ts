
// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'driver';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

// Restaurant related types
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  image: string;
  address: string;
  isOpen: boolean;
  isFeatured?: boolean;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isAvailable: boolean;
  allergens?: string[];
}

// Grocery related types
export interface GroceryItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  unit: string;
  isAvailable: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  count?: number;
  type: 'restaurant' | 'grocery';
}

// Order related types
export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cod' | 'online' | 'card';
  paymentStatus: 'pending' | 'completed' | 'failed';
  address: string;
  phone: string;
  notes?: string;
  driverId?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
}

// New interfaces for order tracking
export interface OrderLocation {
  lat: number;
  lng: number;
}

export interface OrderTrackingInfo {
  orderId: string;
  status: OrderStatus;
  restaurantLocation: OrderLocation;
  customerLocation: OrderLocation;
  driverLocation?: OrderLocation;
  driverName?: string;
  driverPhone?: string;
  estimatedDeliveryMinutes: number;
  distanceRemaining: string; // e.g. "2.5 km"
  route: OrderLocation[];
  lastUpdated: string;
}

// Driver related types
export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isActive: boolean;
  vehicle?: {
    type: 'bike' | 'scooter' | 'car';
    licensePlate?: string;
  };
  rating?: number;
  completedOrders: number;
}

export interface DriverEarning {
  id: string;
  driverId: string;
  amount: number;
  period: {
    start: string;
    end: string;
  };
  deliveries: number;
  status: 'pending' | 'paid';
  paidAt?: string;
}

// Notification related types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Auth related types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Error type for form validations
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}
