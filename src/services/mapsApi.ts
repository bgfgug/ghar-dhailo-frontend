
// Static mock implementation for Maps API - no Google Maps API key required
// This provides all location and routing functionality with mock data

import { OrderStatus } from "@/types/api";

// Mock coordinates for demonstration (Kathmandu area)
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

interface LocationInfo {
  name: string;
  address: string;
  coordinates: Coordinates;
  landmark?: string;
}

// Mock delivery locations in Kathmandu area
const mockLocations = {
  restaurant: { 
    lat: 27.7065, 
    lng: 85.3206,
    name: "Kathmandu Kitchen",
    address: "Thamel, Kathmandu",
    landmark: "Near Durbar Square"
  },
  customer: { 
    lat: 27.6980, 
    lng: 85.3592,
    name: "Customer Location",
    address: "Baneshwor, Kathmandu", 
    landmark: "Near Baneshwor Chowk"
  },
  driver: { 
    lat: 27.7019, 
    lng: 85.3370,
    name: "Driver Location", 
    address: "New Road, Kathmandu",
    landmark: "Currently on route"
  }
};

// Mock route path points for realistic journey
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

// Get location info with details
export const getLocationInfo = (type: 'restaurant' | 'customer' | 'driver'): LocationInfo => {
  const location = mockLocations[type];
  return {
    name: location.name,
    address: location.address,
    coordinates: { lat: location.lat, lng: location.lng },
    landmark: location.landmark
  };
};

// Calculate distance between two points (mock calculation)
export const calculateDistance = (from: Coordinates, to: Coordinates): string => {
  // Simple mock calculation
  const distance = Math.sqrt(
    Math.pow(to.lat - from.lat, 2) + Math.pow(to.lng - from.lng, 2)
  ) * 111; // Rough km conversion
  return `${distance.toFixed(1)} km`;
};

// Get nearby landmarks for a location
export const getNearbyLandmarks = (location: Coordinates): string[] => {
  return [
    "Pashupatinath Temple",
    "Dharahara Tower", 
    "Kathmandu Durbar Square",
    "Swayambhunath Stupa",
    "Boudhanath Stupa"
  ];
};

// Mock geocoding - convert address to coordinates
export const geocodeAddress = (address: string): Promise<Coordinates> => {
  return Promise.resolve({
    lat: KATHMANDU_CENTER.lat + (Math.random() - 0.5) * 0.1,
    lng: KATHMANDU_CENTER.lng + (Math.random() - 0.5) * 0.1
  });
};

// Mock reverse geocoding - convert coordinates to address
export const reverseGeocode = (coordinates: Coordinates): Promise<string> => {
  return Promise.resolve(`Near ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}, Kathmandu`);
};

// Helper to check if Maps API is loaded - always false for static mode
export const isMapsApiLoaded = (): boolean => {
  return false;
};

// Static mode - no actual API loading
export const loadGoogleMapsApi = (callback: () => void) => {
  setTimeout(callback, 100);
};

// Order tracking with comprehensive mock data
export const getOrderTracking = (orderId: string) => {
  return Promise.resolve({
    orderId,
    status: 'out_for_delivery' as OrderStatus,
    restaurantLocation: mockLocations.restaurant,
    customerLocation: mockLocations.customer,
    driverLocation: mockLocations.driver,
    driverName: "Rajesh Kumar",
    driverPhone: "+977-9801234567",
    driverPhoto: "/placeholder.svg",
    estimatedDeliveryMinutes: 20,
    distanceRemaining: "2.5 km",
    route: mockRoutePath,
    orderItems: [
      { name: "Dal Bhat Set", quantity: 2 },
      { name: "Chicken Momo", quantity: 1 }
    ],
    totalAmount: 850,
    lastUpdated: new Date().toISOString(),
    deliveryInstructions: "Ring the bell twice",
    timeline: [
      { status: 'pending', time: '10:30 AM', completed: true },
      { status: 'processing', time: '10:45 AM', completed: true },
      { status: 'out_for_delivery', time: '11:15 AM', completed: true },
      { status: 'delivered', time: '11:45 AM', completed: false }
    ]
  });
};

// Remove Google Maps API key - not needed for static mode
export const STATIC_MODE = true;
