import React from 'react';
import { motion } from 'framer-motion';
import { OrderStatus } from '@/types/api';

interface ProgressBarProps {
  status: OrderStatus;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ status, className = '' }) => {
  const getProgressPercentage = () => {
    switch (status) {
      case 'pending': return 0;
      case 'processing': return 33;
      case 'out_for_delivery': return 66;
      case 'delivered': return 100;
      default: return 0;
    }
  };

  const progress = getProgressPercentage();

  return (
    <div className={`w-full bg-muted rounded-full h-2 overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{
          duration: 1,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

export default ProgressBar;
