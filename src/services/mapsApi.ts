
// This is a placeholder for Google Maps API integration
// Replace the mockup functions with actual Google Maps API calls when you have the API key

import { OrderStatus } from "@/types/api";

// Mock coordinates for demonstration (these are Kathmandu coordinates)
const KATHMANDU_CENTER = { lat: 27.7172, lng: 85.3240 };

interface Coordinates {
  lat: number;
  lng: number;
}

interface RouteInfo {
  distance: string;
  duration: string;
  path: Coordinates[];
}

// Mock delivery locations in Kathmandu area
const mockLocations = {
  restaurant: { lat: 27.7065, lng: 85.3206 }, // Thamel area
  customer: { lat: 27.6980, lng: 85.3592 },  // Baneshwor area
  driver: { lat: 27.7019, lng: 85.3370 }     // Somewhere in between
};

// Mock route path points
const mockRoutePath: Coordinates[] = [
  mockLocations.restaurant,
  { lat: 27.7050, lng: 85.3240 },
  { lat: 27.7020, lng: 85.3290 },
  { lat: 27.7000, lng: 85.3340 },
  { lat: 27.7019, lng: 85.3370 }, // current driver position
  { lat: 27.6990, lng: 85.3450 },
  { lat: 27.6980, lng: 85.3520 },
  mockLocations.customer
];

// Get estimated delivery time based on order status
export const getEstimatedDeliveryTime = (status: OrderStatus): number => {
  switch (status) {
    case 'pending':
      return 45;
    case 'processing':
      return 35;
    case 'out_for_delivery':
      return 20;
    case 'delivered':
      return 0;
    case 'cancelled':
      return 0;
    default:
      return 30;
  }
};

// Mock function to get the current driver location
export const getDriverLocation = (): Coordinates => {
  return mockLocations.driver;
};

// Mock function to get restaurant location
export const getRestaurantLocation = (): Coordinates => {
  return mockLocations.restaurant;
};

// Mock function to get customer location
export const getCustomerLocation = (): Coordinates => {
  return mockLocations.customer;
};

// Mock function to get route information
export const getRouteInfo = (): RouteInfo => {
  return {
    distance: "5.2 km",
    duration: "18 mins",
    path: mockRoutePath
  };
};

// Helper to check if Maps API is loaded - simplified for static version
export const isMapsApiLoaded = (): boolean => {
  // For static mode, we'll always return false so the API doesn't load
  return false;
};

// This will be updated with your actual API key
export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// Function to load Google Maps API script - modified to work in static mode
export const loadGoogleMapsApi = (callback: () => void) => {
  // In static mode, we won't actually load the script
  // The callback is still called to maintain API compatibility
  setTimeout(callback, 100);
};

// Add missing getOrderTracking function to fix the TS error
export const getOrderTracking = (orderId: string) => {
  return Promise.resolve({
    orderId,
    status: 'out_for_delivery' as OrderStatus,
    restaurantLocation: mockLocations.restaurant,
    customerLocation: mockLocations.customer,
    driverLocation: mockLocations.driver,
    driverName: "Rajesh Kumar",
    driverPhone: "+977-9801234567",
    estimatedDeliveryMinutes: 20,
    distanceRemaining: "2.5 km",
    route: mockRoutePath,
    lastUpdated: new Date().toISOString()
  });
};
