
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
  staticMode?: boolean; // Added static mode option
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 27.7172, lng: 85.3240 }, // Default: Kathmandu
  zoom = 14,
  markers = [],
  path = [],
  className = "w-full h-64",
  apiKey,
  staticMode = true // Default to static mode
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(isMapsApiLoaded());
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  // Check for locally stored API key
  const storedApiKey = typeof localStorage !== 'undefined' ? localStorage.getItem('google_maps_api_key') : null;
  const effectiveApiKey = apiKey || storedApiKey || GOOGLE_MAPS_API_KEY;
  
  // Load Google Maps API - only attempt if not in static mode
  useEffect(() => {
    if (staticMode) return; // Don't load API in static mode
    
    // Don't load if API key is not provided
    if (!effectiveApiKey || effectiveApiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
      console.error('Google Maps API key is required');
      return;
    }
    
    if (!mapLoaded) {
      loadGoogleMapsApi(() => {
        setMapLoaded(true);
      });
    }
  }, [mapLoaded, effectiveApiKey, staticMode]);

  // Initialize map - only in dynamic mode
  useEffect(() => {
    if (staticMode) return; // Don't initialize in static mode
    if (!mapLoaded || !mapRef.current || !window.google?.maps) return;
    
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
  }, [mapLoaded, center, zoom, staticMode]);

  // Add markers - only in dynamic mode
  useEffect(() => {
    if (staticMode) return; // Don't add markers in static mode
    if (!map || !markers.length || !window.google?.maps) return;
    
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
  }, [map, markers, staticMode]);

  // Draw path - only in dynamic mode
  useEffect(() => {
    if (staticMode) return; // Don't draw path in static mode
    if (!map || !path.length || !window.google?.maps) return;
    
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
  }, [map, path, staticMode]);

  // Static map - render a custom static map with drawn elements
  if (staticMode) {
    return (
      <div className={`${className} bg-gray-100 relative overflow-hidden`}>
        {/* Background grid to simulate map */}
        <div className="absolute inset-0 bg-[#E8EEF4]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D1DBEA" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Roads */}
        <div className="absolute w-full h-1 bg-gray-400 top-1/2 transform -translate-y-1/2"></div>
        <div className="absolute w-1 h-full bg-gray-400 left-1/2 transform -translate-x-1/2"></div>
        <div className="absolute w-3/4 h-2 bg-gray-500 bottom-1/3 left-1/8 rounded-full"></div>
        
        {/* Static markers */}
        {markers.map((marker, i) => {
          // Calculate position based on center point
          const left = `${50 + (marker.position.lng - center.lng) * 5}%`;
          const top = `${50 + (center.lat - marker.position.lat) * 5}%`;
          
          const color = i === 0 ? "bg-blue-500" : 
                        i === 1 ? "bg-green-500" : "bg-red-500";
          
          return (
            <div 
              key={`marker-${i}`}
              className={`absolute w-4 h-4 ${color} rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 shadow-md`}
              style={{ left, top }}
              title={marker.title}
            />
          );
        })}
        
        {/* Static path line */}
        {path.length > 1 && (
          <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
            <path
              d={path.map((point, i) => {
                const x = `${50 + (point.lng - center.lng) * 5}%`;
                const y = `${50 + (center.lat - point.lat) * 5}%`;
                return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
              }).join(' ')}
              fill="none"
              stroke="#FF0000"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        )}
        
        {/* Location labels */}
        <div className="absolute bottom-3 left-3 text-xs font-medium bg-white/70 px-2 py-1 rounded shadow-sm">
          Kathmandu, Nepal
        </div>
      </div>
    );
  }

  // If API is not loaded yet, show a placeholder
  if (!mapLoaded && !staticMode) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // If no API key is provided, show a message
  if (!staticMode && (!effectiveApiKey || effectiveApiKey === 'YOUR_GOOGLE_MAPS_API_KEY')) {
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
