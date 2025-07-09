
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const RestaurantCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCardSkeleton;
