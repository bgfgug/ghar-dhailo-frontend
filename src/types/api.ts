
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
  // Nepal-specific properties
  name_np?: string;
  region?: 'kathmandu' | 'pokhara' | 'chitwan' | 'bhaktapur' | 'lalitpur' | 'other';
  dietaryOptions?: DietaryOption[];
  culturalCertifications?: CulturalCertification[];
  distance?: number; // in km
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
  // Nepal-specific properties
  name_np?: string;
  description_np?: string;
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  dietaryTags?: DietaryTag[];
  region?: 'newari' | 'madhesi' | 'pahadi' | 'himalayan' | 'thakali' | 'other';
  festivalSpecial?: string;
  ingredients?: string[];
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
  // Nepal-specific properties
  name_np?: string;
  description_np?: string;
  origin?: string;
  organicCertified?: boolean;
  seasonalAvailability?: string[];
  substitutes?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  count?: number;
  type: 'restaurant' | 'grocery';
  // Nepal-specific properties
  name_np?: string;
  description_np?: string;
  regionalSpecialty?: boolean;
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
  // Nepal-specific properties
  name_np?: string;
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  dietaryPreferences?: DietaryTag[];
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
  // Nepal-specific properties
  landmarkNearby?: string;
  isLoadSheddingAffected?: boolean;
  loadSheddingDelay?: number; // in minutes
  festivalGift?: boolean;
  specialInstructions_np?: string;
  emergencyStatus?: 'normal' | 'fuel_crisis' | 'earthquake' | 'monsoon_flood' | 'landslide';
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
  // Nepal-specific properties
  name_np?: string;
  currentLocation?: {
    lat: number;
    lng: number;
    landmark?: string;
  };
  languages?: string[];
}

// Nepal-specific types
export type DietaryTag = 
  | 'satvik' 
  | 'jain_friendly'
  | 'buddhist_fasting'
  | 'hindu_fasting'
  | 'no_onion_garlic'
  | 'no_tomato'
  | 'high_protein'
  | 'gluten_free';

export type CulturalCertification =
  | 'authentic_newari'
  | 'traditional_thakali'
  | 'himalayan_organic'
  | 'madhesi_authentic'
  | 'local_ingredient'
  | 'heritage_recipe';

export type DietaryOption =
  | 'newari'
  | 'madhesi'
  | 'pahadi'
  | 'himalayan'
  | 'thakali';

export interface FestivalGift {
  id: string;
  name: string;
  name_np: string;
  description: string;
  description_np: string;
  price: number;
  image: string;
  festival: string;
  contents: string[];
  isAvailable: boolean;
}

export interface RecipeExchange {
  id: string;
  title: string;
  title_np?: string;
  authorId: string;
  authorName: string;
  ingredients: string[];
  instructions: string;
  instructions_np?: string;
  imageUrl?: string;
  category: string;
  region?: string;
  likes: number;
  createdAt: string;
}

export interface EmergencyBundle {
  id: string;
  name: string;
  name_np: string;
  description: string;
  description_np: string;
  price: number;
  contents: GroceryItem[];
  type: 'earthquake' | 'flood' | 'landslide' | 'fuel_crisis' | 'general';
  duration: string; // e.g., "3 days", "1 week"
  personCount: number;
  image: string;
}

// Notification related types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system' | 'emergency' | 'festival';
  isRead: boolean;
  createdAt: string;
  link?: string;
  // Nepal-specific properties
  title_np?: string;
  message_np?: string;
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
