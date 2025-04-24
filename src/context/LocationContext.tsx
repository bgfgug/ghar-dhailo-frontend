
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Location = {
  id: string;
  name: string;
  name_np?: string;
};

type LocationContextType = {
  locations: Location[];
  currentLocation: Location;
  setCurrentLocation: (locationId: string) => void;
};

const defaultLocations: Location[] = [
  { id: 'kathmandu', name: 'Kathmandu', name_np: 'काठमाडौं' },
  { id: 'pokhara', name: 'Pokhara', name_np: 'पोखरा' },
  { id: 'lalitpur', name: 'Lalitpur', name_np: 'ललितपुर' },
  { id: 'bhaktapur', name: 'Bhaktapur', name_np: 'भक्तपुर' },
  { id: 'butwal', name: 'Butwal', name_np: 'बुटवल' }
];

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [locations] = useState<Location[]>(defaultLocations);
  const [currentLocation, setCurrentLocationState] = useState<Location>(defaultLocations[0]);

  // Load saved location on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('gharDhailoLocation');
    if (savedLocation) {
      try {
        const locationId = JSON.parse(savedLocation);
        const location = defaultLocations.find(loc => loc.id === locationId);
        if (location) {
          setCurrentLocationState(location);
        }
      } catch (error) {
        console.error('Failed to parse location from localStorage', error);
      }
    }
  }, []);

  const setCurrentLocation = (locationId: string) => {
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      setCurrentLocationState(location);
      localStorage.setItem('gharDhailoLocation', JSON.stringify(locationId));
    }
  };

  return (
    <LocationContext.Provider value={{ 
      locations, 
      currentLocation, 
      setCurrentLocation 
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
