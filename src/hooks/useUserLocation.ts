import { useState, useEffect } from 'react';

interface UserLocation {
  lat: number;
  lng: number;
}

interface LocationState {
  location: UserLocation | null;
  error: string | null;
  loading: boolean;
  permissionDenied: boolean;
  isSupported: boolean;
}

export const useUserLocation = () => {
  const [state, setState] = useState<LocationState>({
    location: null,
    error: null,
    loading: false,
    permissionDenied: false,
    isSupported: 'geolocation' in navigator
  });

  const requestLocation = () => {
    if (!state.isSupported) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          error: null,
          loading: false,
          permissionDenied: false,
          isSupported: true
        });
      },
      (error) => {
        let errorMessage = 'Failed to get your location';
        let denied = false;

        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = 'Location access denied. Please enable location services.';
          denied = true;
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = 'Location information unavailable';
        } else if (error.code === error.TIMEOUT) {
          errorMessage = 'Location request timed out';
        }

        setState(prev => ({
          ...prev,
          error: errorMessage,
          loading: false,
          permissionDenied: denied
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const setManualLocation = (lat: number, lng: number) => {
    setState(prev => ({
      ...prev,
      location: { lat, lng },
      error: null,
      permissionDenied: false
    }));
  };

  return {
    ...state,
    requestLocation,
    setManualLocation
  };
};
