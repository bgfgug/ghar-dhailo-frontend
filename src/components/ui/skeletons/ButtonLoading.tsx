
import React from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonLoadingProps {
  size?: number;
  className?: string;
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({ 
  size = 16, 
  className 
}) => {
  return (
    <Loader 
      size={size} 
      className={cn("animate-spin", className)} 
    />
  );
};

export default ButtonLoading;
