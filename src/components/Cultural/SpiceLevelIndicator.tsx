
import React from 'react';
import { motion } from 'framer-motion';

interface SpiceLevelIndicatorProps {
  level: 1 | 2 | 3 | 4 | 5;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (level: 1 | 2 | 3 | 4 | 5) => void;
  className?: string;
}

const SpiceLevelIndicator: React.FC<SpiceLevelIndicatorProps> = ({
  level,
  size = 'md',
  interactive = false,
  onChange,
  className = ''
}) => {
  const chiliSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };
  
  const handleChiliClick = (clickedLevel: 1 | 2 | 3 | 4 | 5) => {
    if (interactive && onChange) {
      onChange(clickedLevel);
    }
  };

  // Animation variants for chili peppers
  const chiliVariants = {
    inactive: { 
      scale: 1, 
      filter: "grayscale(100%)",
      opacity: 0.4
    },
    active: (i: number) => ({ 
      scale: [1, 1.2, 1],
      filter: "grayscale(0%)",
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: i * 0.07
      }
    })
  };
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={chiliVariants}
          initial="inactive"
          animate={i <= level ? "active" : "inactive"}
          onClick={() => handleChiliClick(i as 1|2|3|4|5)}
          className={`${chiliSizes[size]} ${interactive ? 'cursor-pointer' : ''}`}
          aria-label={`Spice level ${i}`}
          role={interactive ? "button" : "img"}
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={i <= level ? 'text-red-600' : 'text-gray-300'}
          >
            <path 
              d="M16.5 8.5C16.5 6.5 15 5.5 13 5.5C12.8 3.3 11 2 9.5 2C6.5 2 6 5.5 6 5.5C6 5.5 3 10 3 14.5C3 19 6 22 10 22C14 22 16 19.5 16 15.5C16 15.5 19 13.5 19 10.5C19 9 17.5 8.5 16.5 8.5Z" 
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default SpiceLevelIndicator;
