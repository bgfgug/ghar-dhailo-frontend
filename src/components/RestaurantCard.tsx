
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Restaurant } from '@/data/restaurants';
import formatPrice from '@/utils/formatPrice';
import OptimizedImage from '@/components/ui/optimized-image';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link 
      to={`/product/${restaurant.id}`} 
      className="nepal-card"
      aria-label={`View ${restaurant.name} restaurant details`}
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <OptimizedImage
          src={restaurant.image} 
          alt={`${restaurant.name} restaurant`}
          className="w-full h-full object-cover"
        />
        {/* Cuisine tags */}
        <div className="absolute bottom-0 left-0 right-0 p-2 flex gap-2 overflow-x-auto">
          {restaurant.cuisine.map((cuisine, index) => (
            <span 
              key={index}
              className="text-xs bg-white/90 backdrop-blur-sm text-gray-800 py-1 px-2 rounded-full whitespace-nowrap"
            >
              {cuisine}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
            {restaurant.name_np && (
              <p className="text-sm text-gray-500 font-nepali">{restaurant.name_np}</p>
            )}
          </div>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded" role="img" aria-label={`Rating: ${restaurant.rating} stars`}>
            <Star size={14} className="text-green-600 mr-1" aria-hidden="true" />
            <span className="text-sm text-green-700 font-medium">{restaurant.rating}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center text-sm text-gray-500" aria-label="Delivery information">
          <Clock size={14} className="mr-1" aria-hidden="true" />
          <span>{restaurant.deliveryTime} mins</span>
          <span className="mx-2" aria-hidden="true">•</span>
          <span>{restaurant.distance} km</span>
          <span className="mx-2" aria-hidden="true">•</span>
          <span>{formatPrice(restaurant.deliveryFee)} delivery</span>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
