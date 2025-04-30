
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Truck } from 'lucide-react';

interface NepalMapProps {
  pickupLocation?: { lat: number; lng: number; name: string };
  deliveryLocation?: { lat: number; lng: number; name: string };
  driverLocation?: { lat: number; lng: number; name?: string };
  showPath?: boolean;
  landmark?: string;
  eta?: string;
  size?: 'sm' | 'md' | 'lg';
  loadSheddingAreas?: string[];
}

// Nepal's major landmarks with dummy coordinates for visualization purposes
const LANDMARKS = {
  'kathmandu': { x: 50, y: 40, name: 'Kathmandu', name_np: 'काठमाडौं' },
  'pokhara': { x: 30, y: 35, name: 'Pokhara', name_np: 'पोखरा' },
  'bhaktapur': { x: 55, y: 42, name: 'Bhaktapur', name_np: 'भक्तपुर' },
  'lalitpur': { x: 52, y: 45, name: 'Lalitpur', name_np: 'ललितपुर' },
  'biratnagar': { x: 80, y: 70, name: 'Biratnagar', name_np: 'बिराटनगर' },
  'birgunj': { x: 60, y: 75, name: 'Birgunj', name_np: 'बिरगंज' },
  'nepalgunj': { x: 15, y: 65, name: 'Nepalgunj', name_np: 'नेपालगंज' },
  'dharan': { x: 75, y: 60, name: 'Dharan', name_np: 'धरान' },
  'butwal': { x: 40, y: 65, name: 'Butwal', name_np: 'बुटवल' },
  'dhangadhi': { x: 5, y: 60, name: 'Dhangadhi', name_np: 'धनगढी' },
};

// Major regions
const REGIONS = [
  { name: 'Bagmati', path: 'M40,30 L60,30 L65,50 L55,55 L45,50 L40,40 Z', color: '#e2e8f0' },
  { name: 'Gandaki', path: 'M25,25 L40,30 L45,50 L30,55 L20,45 Z', color: '#cbd5e1' },
  { name: 'Koshi', path: 'M60,30 L80,35 L85,55 L65,50 Z', color: '#e2e8f0' },
  { name: 'Madhesh', path: 'M45,50 L65,50 L85,55 L80,70 L60,75 L40,65 Z', color: '#cbd5e1' },
  { name: 'Lumbini', path: 'M20,45 L45,50 L40,65 L25,65 L15,55 Z', color: '#e2e8f0' },
  { name: 'Sudurpashchim', path: 'M5,40 L20,45 L15,55 L5,60 Z', color: '#cbd5e1' },
  { name: 'Karnali', path: 'M15,25 L25,25 L20,45 L5,40 Z', color: '#e2e8f0' },
];

// Nepal's border approximate path for visualization
const NEPAL_BORDER = 'M5,40 L15,25 L80,35 L85,55 L80,70 L60,75 L25,65 L5,60 Z';

const NepalMap: React.FC<NepalMapProps> = ({
  pickupLocation,
  deliveryLocation,
  driverLocation,
  showPath = true,
  landmark,
  eta,
  size = 'md',
  loadSheddingAreas = []
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-80 h-64',
    lg: 'w-96 h-80'
  };
  
  // Convert lat/lng to x/y coordinates for visualization
  // This is a dummy conversion for illustration purposes
  const convertLocationToXY = (location?: { lat: number; lng: number }) => {
    if (!location) return null;
    // This is a very simplified conversion just for visualization
    return { 
      x: ((location.lng + 180) / 360) * 100,  // x between 0-100
      y: ((90 - location.lat) / 180) * 100    // y between 0-100
    };
  };
  
  const pickupXY = pickupLocation ? convertLocationToXY(pickupLocation) : LANDMARKS['kathmandu'];
  const deliveryXY = deliveryLocation ? convertLocationToXY(deliveryLocation) : LANDMARKS['lalitpur'];
  const driverXY = driverLocation ? convertLocationToXY(driverLocation) : null;

  return (
    <div className={`relative bg-blue-50 rounded-lg overflow-hidden shadow-sm border border-blue-100 ${sizeClasses[size]}`}>
      {/* Map base */}
      <svg 
        viewBox="0 0 100 80" 
        className="w-full h-full"
        style={{ 
          filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.1))',
          background: 'linear-gradient(180deg, #eef7ff 0%, #e1f1ff 100%)'
        }}
      >
        {/* Background mountains for decoration */}
        <path d="M0,80 L20,50 L35,65 L50,40 L65,55 L80,35 L100,60 L100,80 Z" fill="#f8fafc" opacity="0.5" />
        
        {/* Nepal regions */}
        {REGIONS.map((region) => (
          <path 
            key={region.name}
            d={region.path}
            fill={region.color}
            stroke="#94a3b8"
            strokeWidth="0.5"
          />
        ))}
        
        {/* Nepal border */}
        <path 
          d={NEPAL_BORDER}
          fill="none"
          stroke="#475569"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Load shedding areas */}
        {loadSheddingAreas.map(area => {
          const landmark = LANDMARKS[area as keyof typeof LANDMARKS];
          if (!landmark) return null;
          
          return (
            <motion.circle
              key={area}
              cx={landmark.x}
              cy={landmark.y}
              r="4"
              fill="rgba(255, 0, 0, 0.1)"
              stroke="rgba(255, 0, 0, 0.3)"
              strokeWidth="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 1], opacity: [0, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          );
        })}
        
        {/* Delivery path */}
        {showPath && pickupXY && deliveryXY && (
          <>
            <path
              d={`M${pickupXY.x},${pickupXY.y} L${deliveryXY.x},${deliveryXY.y}`}
              stroke="#94a3b8"
              strokeWidth="0.8"
              strokeDasharray="2,2"
              fill="none"
            />
            
            {/* Animated path for driver's journey */}
            {driverXY && (
              <motion.path
                d={`M${pickupXY.x},${pickupXY.y} L${driverXY.x},${driverXY.y}`}
                stroke="#3b82f6"
                strokeWidth="1.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
              />
            )}
          </>
        )}
        
        {/* Pickup location */}
        {pickupXY && (
          <g transform={`translate(${pickupXY.x - 2.5}, ${pickupXY.y - 5})`}>
            <path d="M2.5,0 Q5,0 5,2.5 L5,5 L2.5,10 L0,5 L0,2.5 Q0,0 2.5,0" fill="#22c55e" />
            <circle cx="2.5" cy="2.5" r="1" fill="#ffffff" />
          </g>
        )}
        
        {/* Delivery location */}
        {deliveryXY && (
          <g transform={`translate(${deliveryXY.x - 2.5}, ${deliveryXY.y - 5})`}>
            <path d="M2.5,0 Q5,0 5,2.5 L5,5 L2.5,10 L0,5 L0,2.5 Q0,0 2.5,0" fill="#ef4444" />
            <circle cx="2.5" cy="2.5" r="1" fill="#ffffff" />
          </g>
        )}
        
        {/* Driver location */}
        {driverXY && (
          <motion.g 
            transform={`translate(${driverXY.x - 2.5}, ${driverXY.y - 2.5})`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
          >
            <circle cx="2.5" cy="2.5" r="2.5" fill="#3b82f6" />
            <path d="M1,2 L4,2 M2.5,0.5 L2.5,3.5" stroke="#ffffff" strokeWidth="0.5" />
          </motion.g>
        )}
        
        {/* Major landmarks */}
        {Object.values(LANDMARKS).map((landmark) => (
          <g key={landmark.name} transform={`translate(${landmark.x}, ${landmark.y})`}>
            <circle cx="0" cy="0" r="0.8" fill="#475569" />
            <text 
              x="2" 
              y="0" 
              fontSize="2" 
              fill="#475569"
              textAnchor="start"
              dominantBaseline="middle"
            >
              {landmark.name}
            </text>
          </g>
        ))}
        
        {/* Roads connecting major cities */}
        <path d="M50,40 L30,35 L15,25" stroke="#94a3b8" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M50,40 L40,65 L15,65 L5,60" stroke="#94a3b8" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M50,40 L80,35" stroke="#94a3b8" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M50,40 L60,75" stroke="#94a3b8" strokeWidth="0.5" fill="none" strokeLinecap="round" />
      </svg>
      
      {/* ETA and landmark information */}
      {(eta || landmark) && (
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-md text-xs shadow-sm border">
          <div className="flex items-start gap-2">
            {eta && (
              <div className="flex items-center">
                <Truck size={12} className="mr-1 text-blue-600" />
                <span>ETA: {eta}</span>
              </div>
            )}
            {landmark && (
              <div className="flex items-center">
                <MapPin size={12} className="mr-1 text-red-600" />
                <span>Near: {landmark}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NepalMap;
