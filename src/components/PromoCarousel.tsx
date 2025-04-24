
import React from 'react';
import { promos } from '@/data/promos';
import { isActivePromo } from '@/utils/dateHelpers';

const PromoCarousel = () => {
  // Filter only active promos
  const activePromos = promos.filter(promo => isActivePromo(promo.expiry));
  
  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
        {activePromos.map((promo) => (
          <div 
            key={promo.id}
            className={`snap-start shrink-0 w-[90%] sm:w-[350px] rounded-xl overflow-hidden relative shadow-md ${
              promo.type === 'emergency' 
                ? 'bg-red-50 border border-red-200' 
                : promo.type === 'festival' 
                  ? 'festival-gradient text-white' 
                  : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center p-4">
              <div className="flex-grow">
                <h3 className={`font-bold text-lg ${promo.type === 'festival' ? 'text-white' : 'text-gray-900'}`}>
                  {promo.title}
                </h3>
                <p className={`text-sm ${
                  promo.type === 'festival' 
                    ? 'text-white/90' 
                    : promo.type === 'emergency' 
                      ? 'text-red-700' 
                      : 'text-gray-600'
                }`}>
                  {promo.description}
                </p>
                
                {/* Show promo code if available */}
                {promo.code && promo.type !== 'emergency' && (
                  <div className="mt-2 bg-white/20 backdrop-blur-sm rounded-md py-1 px-2 inline-block">
                    <span className={`font-medium ${promo.type === 'festival' ? 'text-white' : 'text-gray-900'}`}>
                      {promo.code}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="w-20 h-20 relative shrink-0">
                <div
                  className="w-full h-full rounded-full overflow-hidden bg-white/20 flex items-center justify-center"
                  style={{ 
                    backgroundImage: promo.image ? `url(${promo.image})` : undefined,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll indicators */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {activePromos.map((_, idx) => (
          <span 
            key={idx} 
            className="w-2 h-2 rounded-full bg-gray-300"
            style={{ opacity: idx === 0 ? 1 : 0.5 }} 
          />
        ))}
      </div>
    </div>
  );
};

export default PromoCarousel;
