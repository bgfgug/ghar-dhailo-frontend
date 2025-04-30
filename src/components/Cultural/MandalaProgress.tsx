
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MandalaProgressProps {
  progress: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

const MandalaProgress: React.FC<MandalaProgressProps> = ({
  progress,
  size = 'md',
  className,
  showLabel = false
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-44 h-44'
  };

  // Mandala patterns rotate based on progress
  const rotationDegree = progress * 3.6; // 360 degrees for 100% progress
  
  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Background mandala pattern */}
      <div className="absolute inset-0 opacity-20 rounded-full border border-primary/30" />
      
      {/* Rotating mandala patterns */}
      <motion.div 
        className="absolute inset-0 rounded-full border-2 border-primary"
        style={{
          background: `conic-gradient(from 0deg, transparent ${100 - progress}%, var(--primary) ${100 - progress}% 100%)`
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Mandala decorative elements */}
      <motion.div 
        className="absolute inset-0 border-dashed border border-primary/50 rounded-full"
        animate={{ rotate: rotationDegree }}
        transition={{ duration: 3, ease: "linear" }}
      />
      
      {/* Inner decoration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          "rounded-full flex items-center justify-center bg-background",
          size === 'sm' ? 'w-14 h-14' : (size === 'md' ? 'w-24 h-24' : 'w-32 h-32')
        )}>
          {showLabel ? (
            <span className="font-bold text-primary">
              {Math.round(progress)}%
            </span>
          ) : (
            <div className="w-2/3 h-2/3 rounded-full border border-primary/30 flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full bg-primary/20" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MandalaProgress;
