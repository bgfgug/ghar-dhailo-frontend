import { useState, useEffect, useCallback } from 'react';
import { OrderStatus } from '@/types/api';

interface Location {
  lat: number;
  lng: number;
}

interface MockLocationUpdate {
  driverLocation: Location;
  distanceRemaining: string;
  estimatedMinutes: number;
  status: OrderStatus;
}

export const useMockLocation = (orderId: string, initialStatus: OrderStatus) => {
  const [locationData, setLocationData] = useState<MockLocationUpdate>({
    driverLocation: { lat: 27.7172, lng: 85.3240 },
    distanceRemaining: '3.2 km',
    estimatedMinutes: 15,
    status: initialStatus
  });

  const [isUpdating, setIsUpdating] = useState(true);

  // Simulate location updates
  useEffect(() => {
    if (!isUpdating || locationData.status === 'delivered') return;

    const interval = setInterval(() => {
      setLocationData(prev => {
        // Simulate movement towards destination
        const newLat = prev.driverLocation.lat + (Math.random() - 0.5) * 0.002;
        const newLng = prev.driverLocation.lng + (Math.random() - 0.5) * 0.002;
        
        // Decrease distance and time
        const currentDistance = parseFloat(prev.distanceRemaining);
        const newDistance = Math.max(0, currentDistance - 0.1);
        const newMinutes = Math.max(0, prev.estimatedMinutes - 1);

        // Update status based on progress
        let newStatus = prev.status;
        if (newDistance < 0.5 && prev.status === 'out_for_delivery') {
          newStatus = 'delivered';
          setIsUpdating(false);
        }

        return {
          driverLocation: { lat: newLat, lng: newLng },
          distanceRemaining: `${newDistance.toFixed(1)} km`,
          estimatedMinutes: newMinutes,
          status: newStatus
        };
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isUpdating, locationData.status]);

  const stopUpdates = useCallback(() => setIsUpdating(false), []);
  const startUpdates = useCallback(() => setIsUpdating(true), []);

  return {
    ...locationData,
    isUpdating,
    stopUpdates,
    startUpdates
  };
};
