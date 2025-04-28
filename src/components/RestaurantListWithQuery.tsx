
import React, { useState } from 'react';
import { useRestaurants } from '@/hooks/use-restaurants';
import RestaurantCard from '@/components/RestaurantCard';
import { Skeleton } from '@/components/ui/skeleton';

interface RestaurantListProps {
  title?: string;
  maxItems?: number;
}

const RestaurantListWithQuery: React.FC<RestaurantListProps> = ({ 
  title = "Popular Restaurants",
  maxItems = 4
}) => {
  const { data: restaurants, isLoading, error } = useRestaurants();
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(maxItems).fill(0).map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load restaurants</div>;
  }

  const displayRestaurants = restaurants?.slice(0, maxItems) || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantListWithQuery;
