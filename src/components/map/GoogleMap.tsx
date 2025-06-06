
import React from 'react';

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title?: string;
    icon?: string;
    color?: string;
  }>;
  path?: Array<{ lat: number; lng: number }>;
  className?: string;
  showControls?: boolean;
  showLandmarks?: boolean;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 27.7172, lng: 85.3240 },
  zoom = 14,
  markers = [],
  path = [],
  className = "w-full h-64",
  showControls = false,
  showLandmarks = true
}) => {
  // Calculate marker positions relative to center
  const getMarkerPosition = (markerPos: { lat: number; lng: number }) => {
    const scale = 800; // Adjust this to change map scale
    const left = 50 + ((markerPos.lng - center.lng) * scale);
    const top = 50 + ((center.lat - markerPos.lat) * scale);
    return {
      left: `${Math.max(5, Math.min(95, left))}%`,
      top: `${Math.max(5, Math.min(95, top))}%`
    };
  };

  return (
    <div className={`${className} bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden rounded-lg border shadow-sm`}>
      {/* Background pattern to simulate map terrain */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E8F0" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <pattern id="roads" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="transparent" />
              <path d="M0,50 L100,50" stroke="#94A3B8" strokeWidth="2" opacity="0.6" />
              <path d="M50,0 L50,100" stroke="#94A3B8" strokeWidth="2" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          <rect width="100%" height="100%" fill="url(#roads)" />
        </svg>
      </div>

      {/* Mountain silhouette (Himalayas in background) */}
      <div className="absolute bottom-0 w-full">
        <svg viewBox="0 0 1440 200" className="w-full h-16">
          <path 
            fill="#E2E8F0" 
            fillOpacity="0.4" 
            d="M0,200 L0,120 C240,80 480,100 720,60 C960,20 1200,40 1440,80 L1440,200 Z"
          />
          <path 
            fill="#CBD5E1" 
            fillOpacity="0.3" 
            d="M0,200 L0,140 C360,100 720,120 1080,90 C1200,80 1320,85 1440,90 L1440,200 Z"
          />
        </svg>
      </div>

      {/* Landmarks */}
      {showLandmarks && (
        <>
          {/* Pashupatinath Temple */}
          <div className="absolute bottom-1/4 left-[15%] transform -translate-y-1/2">
            <div className="w-12 h-12 flex flex-col items-center">
              <div className="w-8 h-8 bg-amber-400 rounded-t-lg relative">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <div className="text-xs font-medium text-gray-600 mt-1 text-center">Temple</div>
            </div>
          </div>

          {/* Dharahara Tower */}
          <div className="absolute bottom-1/3 right-[20%] transform -translate-y-1/2">
            <div className="w-12 h-16 flex flex-col items-center">
              <div className="w-2 h-12 bg-gray-400 relative">
                <div className="absolute top-0 w-4 h-4 rounded-full bg-gray-500 -translate-x-1"></div>
                <div className="absolute top-1/4 w-4 h-0.5 bg-gray-500 -translate-x-1"></div>
                <div className="absolute top-2/4 w-4 h-0.5 bg-gray-500 -translate-x-1"></div>
                <div className="absolute top-3/4 w-4 h-0.5 bg-gray-500 -translate-x-1"></div>
              </div>
              <div className="text-xs font-medium text-gray-600 mt-1 text-center">Tower</div>
            </div>
          </div>
        </>
      )}

      {/* Main roads */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-1 bg-gray-400 top-1/2 transform -translate-y-1/2 opacity-60"></div>
        <div className="absolute w-1 h-full bg-gray-400 left-1/2 transform -translate-x-1/2 opacity-60"></div>
        <div className="absolute w-3/4 h-1 bg-gray-500 bottom-1/3 left-1/8 rounded-full opacity-70"></div>
      </div>

      {/* Route path */}
      {path.length > 1 && (
        <svg className="absolute inset-0 w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
          <path
            d={path.map((point, i) => {
              const pos = getMarkerPosition(point);
              return i === 0 ? `M ${pos.left} ${pos.top}` : `L ${pos.left} ${pos.top}`;
            }).join(' ')}
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            strokeDasharray="8,4"
            opacity="0.8"
          />
        </svg>
      )}

      {/* Markers */}
      {markers.map((marker, i) => {
        const position = getMarkerPosition(marker.position);
        const colors = {
          restaurant: "bg-blue-500 border-blue-600",
          driver: "bg-green-500 border-green-600", 
          customer: "bg-red-500 border-red-600",
          default: "bg-purple-500 border-purple-600"
        };
        
        const colorClass = marker.color ? colors[marker.color as keyof typeof colors] || colors.default : 
                          i === 0 ? colors.restaurant : 
                          i === 1 ? colors.driver : colors.customer;

        return (
          <div 
            key={`marker-${i}`}
            className={`absolute w-5 h-5 ${colorClass} rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-10 animate-pulse`}
            style={{ left: position.left, top: position.top }}
            title={marker.title}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
              {marker.title}
            </div>
          </div>
        );
      })}

      {/* Map controls */}
      {showControls && (
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="bg-white/90 backdrop-blur-sm rounded p-2 shadow-md hover:bg-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="bg-white/90 backdrop-blur-sm rounded p-2 shadow-md hover:bg-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>
      )}

      {/* Location indicator */}
      <div className="absolute bottom-3 left-3 text-xs font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
        📍 Kathmandu, Nepal
      </div>

      {/* Zoom level indicator */}
      <div className="absolute bottom-3 right-3 text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
        Zoom: {zoom}x
      </div>
    </div>
  );
};

export default GoogleMap;
