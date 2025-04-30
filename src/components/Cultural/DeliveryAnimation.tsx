
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Scooter } from 'lucide-react';

interface DeliveryAnimationProps {
  /** Initial ETA in minutes */
  initialEta?: number;
  /** Whether the animation should auto-play */
  autoPlay?: boolean;
  /** Whether to show the animation in a compact mode for mobile */
  compact?: boolean;
  /** Custom class name for the container */
  className?: string;
}

const DeliveryAnimation: React.FC<DeliveryAnimationProps> = ({
  initialEta = 15,
  autoPlay = true,
  compact = false,
  className = '',
}) => {
  const [eta, setEta] = useState(initialEta);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  
  // Decrease ETA and update progress every minute
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setEta((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
      
      // Update progress based on remaining time
      setProgress((initialEta - eta + 1) / initialEta);
    }, 60000); // 1 minute
    
    // For demo purposes, update progress more frequently
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (1 / (initialEta * 60));
        return newProgress >= 1 ? 1 : newProgress;
      });
    }, 1000); // 1 second
    
    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [isPlaying, eta, initialEta]);
  
  // Calculate scooter position based on progress
  const scooterX = `${Math.min(progress * 100, 98)}%`;
  
  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${compact ? 'h-40' : 'h-60'} ${className}`}>
      {/* Background with Nepalese theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-blue-50">
        {/* Mountain silhouette (Himalayas) */}
        <div className="absolute bottom-1/2 w-full">
          <svg viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              fill="#e0e7ff" 
              fillOpacity="1" 
              d="M0,224L60,213.3C120,203,240,181,360,176C480,171,600,181,720,197.3C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></path>
          </svg>
        </div>
        
        {/* Landmarks - Left side (Pashupatinath) */}
        <div className="absolute bottom-1/4 left-[5%] transform -translate-y-1/2">
          <div className="w-16 h-20 flex flex-col items-center">
            <div className="w-10 h-10 bg-saffron-500 rounded-t-lg"></div>
            <div className="w-14 h-8 bg-saffron-600 rounded-lg relative -top-1">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-crimson-500 rounded-full"></div>
            </div>
            <span className="mt-1 text-xs font-medium text-gray-700">Pashupatinath</span>
          </div>
        </div>
        
        {/* Landmarks - Right side (Dharahara) */}
        <div className="absolute bottom-1/4 right-[10%] transform -translate-y-1/2">
          <div className="w-16 h-24 flex flex-col items-center">
            <div className="w-3 h-16 bg-gray-300 relative">
              <div className="absolute top-0 w-5 h-5 rounded-full bg-gray-400 -translate-x-1"></div>
              <div className="absolute top-1/4 w-5 h-1 bg-gray-400 -translate-x-1"></div>
              <div className="absolute top-2/4 w-5 h-1 bg-gray-400 -translate-x-1"></div>
              <div className="absolute top-3/4 w-5 h-1 bg-gray-400 -translate-x-1"></div>
            </div>
            <span className="mt-1 text-xs font-medium text-gray-700">Dharahara</span>
          </div>
        </div>
      </div>
      
      {/* Road */}
      <div className="absolute bottom-8 w-full h-10 bg-gray-700">
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-yellow-400 dashed-line"></div>
      </div>
      
      {/* Animated Scooter */}
      <motion.div
        className="absolute bottom-12"
        style={{ left: scooterX }}
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="relative">
          <Scooter 
            className={`text-primary ${compact ? 'h-8 w-8' : 'h-10 w-10'}`} 
            style={{ transform: 'scaleX(1)' }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 right-0 h-1 bg-black opacity-25 rounded-full"
            animate={{ width: ['60%', '80%', '60%'] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
        </div>
      </motion.div>
      
      {/* ETA Information */}
      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <h4 className="text-sm font-semibold text-gray-800">Delivery Status</h4>
        <p className="text-primary font-bold text-lg">
          {eta === 0
            ? 'Arrived!'
            : `Arriving in ${eta} minute${eta !== 1 ? 's' : ''}...`}
        </p>
        <div className="mt-1 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
      
      {/* Controls - only show when not in compact mode */}
      {!compact && (
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
        </div>
      )}
      
      {/* Add Nepali styling via CSS */}
      <style jsx>{`
        .dashed-line {
          background: repeating-linear-gradient(
            to right,
            #F9D923,
            #F9D923 10px,
            transparent 10px,
            transparent 20px
          );
        }
      `}</style>
    </div>
  );
};

export default DeliveryAnimation;
