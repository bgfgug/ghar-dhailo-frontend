
import React, { useRef, useEffect, useState } from 'react';
import { GOOGLE_MAPS_API_KEY, loadGoogleMapsApi, isMapsApiLoaded } from '@/services/mapsApi';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
    icon?: string;
  }>;
  path?: Array<{ lat: number; lng: number }>;
  className?: string;
  apiKey?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 27.7172, lng: 85.3240 }, // Default: Kathmandu
  zoom = 14,
  markers = [],
  path = [],
  className = "w-full h-64",
  apiKey
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(isMapsApiLoaded());
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Load Google Maps API
  useEffect(() => {
    // Don't load if API key is not provided
    if (!GOOGLE_MAPS_API_KEY && !apiKey) {
      console.error('Google Maps API key is required');
      return;
    }
    
    if (!mapLoaded) {
      loadGoogleMapsApi(() => {
        setMapLoaded(true);
      });
    }
  }, [mapLoaded, apiKey]);

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    
    const mapOptions: google.maps.MapOptions = {
      center,
      zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };
    
    const newMap = new google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);
    
    return () => {
      setMap(null);
    };
  }, [mapLoaded, center, zoom]);

  // Add markers
  useEffect(() => {
    if (!map || !markers.length) return;
    
    const googleMarkers = markers.map(markerData => {
      return new google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title,
        icon: markerData.icon
      });
    });
    
    return () => {
      googleMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers]);

  // Draw path
  useEffect(() => {
    if (!map || !path.length) return;
    
    const routePath = new google.maps.Polyline({
      path,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    
    routePath.setMap(map);
    
    return () => {
      routePath.setMap(null);
    };
  }, [map, path]);

  // If API is not loaded yet, show a placeholder
  if (!mapLoaded) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // If no API key is provided, show a message
  if (!GOOGLE_MAPS_API_KEY && !apiKey) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center p-4">
          <p className="text-amber-600 font-medium">Google Maps API key is required</p>
          <p className="text-gray-500 text-sm mt-2">Please add your Google Maps API key</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={className} />;
};

export default GoogleMap;
