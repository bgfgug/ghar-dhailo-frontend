
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  className?: string;
  height?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ 
  className = "", 
  height = "h-40" 
}) => {
  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <Skeleton className={`w-full ${height}`} />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default SkeletonCard;
