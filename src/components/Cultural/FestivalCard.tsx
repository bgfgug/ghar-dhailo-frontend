
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/dateHelpers';
import { Festival } from '@/data/festivals';

interface FestivalCardProps {
  festival: Festival;
  language?: 'en' | 'np';
}

const FestivalCard: React.FC<FestivalCardProps> = ({ 
  festival, 
  language = 'en'
}) => {
  const {
    id,
    name,
    name_np,
    startDate,
    endDate,
    description,
    description_np,
    image,
    specialItems
  } = festival;
  
  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  
  // Calculate if the festival is active or upcoming
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const isActive = today >= start && today <= end;
  const isUpcoming = today < start;
  const isPast = today > end;
  
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Festival image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={image} 
          alt={language === 'en' ? name : name_np} 
          className="w-full h-full object-cover"
        />
        
        {/* Status badge */}
        {isActive && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {language === 'en' ? 'Active' : 'सक्रिय'}
          </div>
        )}
        
        {isUpcoming && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {language === 'en' ? 'Upcoming' : 'आउँदै'}
          </div>
        )}
        
        {isPast && (
          <div className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
            {language === 'en' ? 'Past' : 'समाप्त'}
          </div>
        )}
      </div>
      
      {/* Festival content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">
              {language === 'en' ? name : name_np}
            </h3>
            {language === 'en' && name_np && (
              <p className="text-xs text-muted-foreground font-nepali">{name_np}</p>
            )}
          </div>
        </div>
        
        {/* Festival dates */}
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Calendar size={14} className="mr-1" />
          <span>{formattedStartDate} - {formattedEndDate}</span>
        </div>
        
        {/* Festival description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {language === 'en' ? description : description_np}
        </p>
        
        {/* Special items */}
        {specialItems && specialItems.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-700 mb-1">
              {language === 'en' ? 'Special Items:' : 'विशेष वस्तुहरू:'}
            </h4>
            <div className="flex flex-wrap gap-1">
              {specialItems.map((item, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-saffron-100 text-saffron-800 px-2 py-0.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* View details link */}
        <Link 
          to={`/festival/${id}`} 
          className="text-sm text-primary font-medium flex items-center hover:underline"
        >
          {language === 'en' ? 'View Festival Details' : 'विवरण हेर्नुहोस्'}
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default FestivalCard;
