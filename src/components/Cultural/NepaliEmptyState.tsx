
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface NepaliEmptyStateProps {
  type: 'cart' | 'search' | 'orders' | 'grocery' | 'restaurant';
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
  language?: 'en' | 'np';
}

const NepaliEmptyState: React.FC<NepaliEmptyStateProps> = ({
  type,
  actionLabel,
  actionLink,
  onAction,
  language = 'en'
}) => {
  // Content based on type and language
  const content = {
    cart: {
      title: {
        en: "Your cart is empty",
        np: "तपाईंको कार्ट खाली छ"
      },
      description: {
        en: "Your cart looks lonely! Fill it with delicious food and groceries.",
        np: "तपाईंको कार्ट एक्लो देखिन्छ! यसलाई स्वादिष्ट खाना र किराना सामानले भर्नुहोस्।"
      },
      proverb: {
        en: "A Nepali proverb says: 'An empty pot makes the loudest noise'",
        np: "नेपाली उखान भन्छ: 'रित्तो घैंटो बज्छ धेरै'"
      },
      defaultAction: {
        en: "Browse Restaurants",
        np: "रेस्टुरेन्ट हेर्नुहोस्"
      },
      defaultLink: "/listings"
    },
    search: {
      title: {
        en: "No results found",
        np: "कुनै परिणाम फेला परेन"
      },
      description: {
        en: "We couldn't find what you're looking for. Try different keywords.",
        np: "तपाईंले खोज्नुभएको कुरा फेला पार्न सकिएन। फरक शब्दहरू प्रयास गर्नुहोस्।"
      },
      proverb: {
        en: "A Nepali proverb says: 'What you seek is seeking you'",
        np: "नेपाली उखान भन्छ: 'खोज्नेले भेट्टाउँछ'"
      },
      defaultAction: {
        en: "Clear Search",
        np: "खोज हटाउनुहोस्"
      },
      defaultLink: ""
    },
    orders: {
      title: {
        en: "No orders yet",
        np: "अहिलेसम्म कुनै अर्डर छैन"
      },
      description: {
        en: "You haven't placed any orders yet. Start ordering your favorite dishes!",
        np: "तपाईंले अहिलेसम्म कुनै अर्डर गर्नुभएको छैन। आफ्नो मनपर्ने परिकार अर्डर गर्न सुरु गर्नुहोस्!"
      },
      proverb: {
        en: "A Nepali proverb says: 'The journey of a thousand meals begins with a single order'",
        np: "नेपाली उखान भन्छ: 'हजार खानाको यात्रा एउटा अर्डरबाट सुरु हुन्छ'"
      },
      defaultAction: {
        en: "Explore Menu",
        np: "मेनु हेर्नुहोस्"
      },
      defaultLink: "/listings"
    },
    grocery: {
      title: {
        en: "No groceries available",
        np: "कुनै किराना सामान उपलब्ध छैन"
      },
      description: {
        en: "We couldn't find any grocery items. Please check back later.",
        np: "कुनै किराना सामान फेला पार्न सकिएन। कृपया पछि फेरि जाँच गर्नुहोला।"
      },
      proverb: {
        en: "A Nepali proverb says: 'Good food comes from good ingredients'",
        np: "नेपाली उखान भन्छ: 'राम्रो खाना राम्रो सामग्रीबाट आउँछ'"
      },
      defaultAction: {
        en: "Browse Categories",
        np: "श्रेणीहरू हेर्नुहोस्"
      },
      defaultLink: "/grocery"
    },
    restaurant: {
      title: {
        en: "No restaurants available",
        np: "कुनै रेस्टुरेन्ट उपलब्ध छैन"
      },
      description: {
        en: "We couldn't find any restaurants in this area. Try expanding your search.",
        np: "यस क्षेत्रमा कुनै रेस्टुरेन्ट फेला पार्न सकिएन। आफ्नो खोज विस्तार गर्ने प्रयास गर्नुहोस्।"
      },
      proverb: {
        en: "A Nepali proverb says: 'Even the greatest feast begins with just one bite'",
        np: "नेपाली उखान भन्छ: 'ठूलो भोज पनि एउटा टोकाइबाट सुरु हुन्छ'"
      },
      defaultAction: {
        en: "Change Location",
        np: "स्थान परिवर्तन गर्नुहोस्"
      },
      defaultLink: "/home"
    }
  };

  const currentContent = content[type];
  const title = currentContent.title[language as keyof typeof currentContent.title];
  const description = currentContent.description[language as keyof typeof currentContent.description];
  const proverb = currentContent.proverb[language as keyof typeof currentContent.proverb];
  const defaultAction = currentContent.defaultAction[language as keyof typeof currentContent.defaultAction];
  const defaultLink = currentContent.defaultLink;
  
  const finalActionLabel = actionLabel || defaultAction;
  const finalActionLink = actionLink || defaultLink;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
      {/* Animated Illustration based on type */}
      <div className="mb-6">
        {type === 'cart' && <KathmanduEmptyCart />}
        {type === 'search' && <MountainSearchEmpty />}
        {type === 'orders' && <EmptyOrdersIllustration />}
        {type === 'grocery' && <EmptyGroceryIllustration />}
        {type === 'restaurant' && <EmptyRestaurantIllustration />}
      </div>
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-medium mb-2">{title}</h2>
        <p className="text-gray-600 mb-3">{description}</p>
        <p className="text-sm text-gray-500 italic mb-6 font-nepali">{proverb}</p>
        
        {finalActionLink && finalActionLabel && (
          <Button asChild>
            <Link to={finalActionLink} className="inline-block">
              {finalActionLabel}
            </Link>
          </Button>
        )}
        
        {!finalActionLink && finalActionLabel && onAction && (
          <Button onClick={onAction}>
            {finalActionLabel}
          </Button>
        )}
      </motion.div>
    </div>
  );
};

// Kathmandu Valley-themed cart illustration
const KathmanduEmptyCart = () => {
  return (
    <motion.div 
      className="relative w-48 h-48 mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stylized pagoda/temple */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {/* Temple base */}
          <div className="w-32 h-10 bg-saffron-100 rounded-t-lg border-t-2 border-x-2 border-saffron-500" />
          
          {/* Temple middle section */}
          <div className="w-28 h-12 bg-saffron-200 relative mx-auto -mt-2">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-saffron-300 -mt-2" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-saffron-400" />
          </div>
          
          {/* Temple top section */}
          <div className="w-20 h-8 bg-saffron-300 mx-auto relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-saffron-400 -mt-1" />
          </div>
          
          {/* Roof */}
          <div className="w-24 h-6 bg-crimson-500 mx-auto relative -mt-1 z-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-2 bg-crimson-600 -mt-1" />
          </div>
          <div className="w-16 h-6 bg-crimson-400 mx-auto relative -mt-1">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-crimson-500 -mt-1" />
          </div>
          
          {/* Spire */}
          <div className="w-2 h-8 bg-yellow-500 mx-auto relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-yellow-600 -mt-1 rounded-full" />
          </div>
        </div>
        
        {/* Cart outline at the bottom */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-36 h-14 border-2 border-gray-300 rounded-lg"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-0.5 bg-gray-300" />
          <div className="absolute bottom-0 left-6 w-4 h-2 bg-gray-300 -mb-2 rounded-b-full" />
          <div className="absolute bottom-0 right-6 w-4 h-2 bg-gray-300 -mb-2 rounded-b-full" />
        </motion.div>
      </div>
      
      {/* Prayer flags */}
      <div className="absolute top-4 left-0">
        <motion.div
          className="flex space-x-1"
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-white'].map((color, i) => (
            <motion.div
              key={i}
              className={`w-5 h-3 ${color} border border-gray-300`}
              animate={{ y: [-1, 1, -1] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Mountains in background */}
      <div className="absolute top-10 left-0 w-full">
        <svg viewBox="0 0 100 30" className="w-full">
          <path d="M0,30 L10,15 L15,20 L25,5 L35,15 L45,8 L60,18 L75,5 L85,12 L95,8 L100,15 L100,30 Z" fill="#e2e8f0" />
          <path d="M0,30 L20,25 L40,28 L60,22 L80,26 L100,23 L100,30 Z" fill="#cbd5e1" />
        </svg>
      </div>
    </motion.div>
  );
};

// Mountain-themed search empty state
const MountainSearchEmpty = () => {
  return (
    <motion.div 
      className="relative w-48 h-48 mx-auto"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mountains */}
      <svg viewBox="0 0 100 60" className="w-full absolute bottom-0">
        <motion.path 
          d="M0,60 L15,30 L25,40 L40,10 L60,45 L75,20 L100,50 L100,60 Z" 
          fill="#e2e8f0"
          initial={{ y: 10, opacity: 0.3 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path 
          d="M0,60 L25,50 L50,55 L75,45 L100,50 L100,60 Z" 
          fill="#cbd5e1"
          initial={{ y: 5 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </svg>
      
      {/* Magnifying glass */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="relative">
          {/* Glass */}
          <div className="w-16 h-16 rounded-full border-4 border-primary/80 bg-transparent" />
          {/* Handle */}
          <div className="absolute bottom-0 right-0 w-4 h-12 bg-primary/80 rounded-full transform rotate-45 origin-top translate-x-2 translate-y-2" />
          {/* Question mark */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-primary/50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ?
          </motion.div>
        </div>
      </motion.div>
      
      {/* Animated birds */}
      {[1, 2, 3].map((i) => (
        <motion.div 
          key={i}
          className="absolute"
          style={{
            top: `${10 + i * 5}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 100, 200],
            y: [0, -10, 5],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none">
            <path d="M0,3 C2,0 4,4 6,3 C8,2 10,6 12,3" stroke="black" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Empty orders illustration
const EmptyOrdersIllustration = () => {
  return (
    <motion.div 
      className="relative w-48 h-48 mx-auto"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Traditional thali plate */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-32 h-32 rounded-full bg-gray-100 border-2 border-saffron-300 relative">
          {/* Plate rim */}
          <div className="absolute inset-1 rounded-full border-2 border-saffron-200" />
          <div className="absolute inset-3 rounded-full border border-dashed border-saffron-300/50" />
          
          {/* Empty thali sections */}
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300" />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-gray-300" />
          <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300" />
          <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2 w-5 h-5 rounded-full border border-gray-300" />
          <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2 w-5 h-5 rounded-full border border-gray-300" />
          
          {/* Central rice section */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-300" />
        </div>
      </motion.div>

      {/* Clock hand */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
        <div className="relative w-20 h-20 rounded-full border-2 border-gray-300 bg-gray-50">
          <motion.div 
            className="absolute top-1/2 left-1/2 w-8 h-1 bg-primary transform origin-left"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ translateX: '-2px', translateY: '-2px' }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-6 h-1 bg-saffron-500 transform origin-left"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ translateX: '-2px', translateY: '-2px' }}
          />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gray-600 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </motion.div>
  );
};

// Empty grocery illustration
const EmptyGroceryIllustration = () => {
  return (
    <motion.div 
      className="relative w-48 h-48 mx-auto"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Traditional bamboo basket (doko) */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-32 h-20 rounded-b-full border-2 border-saffron-700 relative bg-saffron-100">
          {/* Basket weaving pattern */}
          <div className="absolute inset-0 rounded-b-full overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-0.5 bg-saffron-500/50"
                style={{ top: `${i * 20 + 10}%` }}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="absolute w-0.5 h-full bg-saffron-600/50"
                style={{ left: `${i * 9 + 4}%` }}
              />
            ))}
          </div>
          
          {/* Basket rim */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-saffron-700 rounded-t-xl" />
          
          {/* Basket carrying strap */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-10 border-t-4 border-l-4 border-r-4 rounded-t-full border-saffron-800" />
        </div>
      </motion.div>
      
      {/* Empty basket indicators */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">
          <motion.div 
            className="text-3xl text-gray-300"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            ⧆
          </motion.div>
          <div className="mt-2 w-12 h-0.5 bg-gray-300 rounded-full" />
        </div>
      </motion.div>
      
      {/* Scattered spices */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-saffron-${300 + i * 100}`}
          style={{
            top: `${60 + Math.random() * 20}%`,
            left: `${20 + i * 15}%`,
          }}
          animate={{
            y: [0, 5, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

// Empty restaurant illustration
const EmptyRestaurantIllustration = () => {
  return (
    <motion.div 
      className="relative w-48 h-48 mx-auto"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Traditional Nepali restaurant (bhatti) */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          {/* Building */}
          <div className="w-40 h-28 bg-saffron-100 rounded-lg border-2 border-saffron-300">
            {/* Door */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-14 bg-saffron-700 rounded-t-lg" />
            
            {/* Windows */}
            <div className="absolute top-4 left-6 w-8 h-8 bg-saffron-200 border border-saffron-400 rounded-lg grid grid-cols-2 grid-rows-2 gap-1 p-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-saffron-50" />
              ))}
            </div>
            <div className="absolute top-4 right-6 w-8 h-8 bg-saffron-200 border border-saffron-400 rounded-lg grid grid-cols-2 grid-rows-2 gap-1 p-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-saffron-50" />
              ))}
            </div>
            
            {/* Building details */}
            <div className="absolute top-0 left-0 w-full h-2 bg-saffron-400" />
            <div className="absolute bottom-0 left-0 w-full h-2 bg-saffron-300" />
          </div>
          
          {/* Roof */}
          <div className="w-44 h-10 bg-crimson-600 -mt-1 rounded-t-lg relative z-10">
            <div className="absolute bottom-0 left-0 w-full h-2 bg-crimson-700" />
          </div>
          
          {/* Sign */}
          <motion.div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-saffron-200 border-2 border-saffron-400 rounded-lg p-1 px-2"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs font-bold text-saffron-900">BHANSA GHAR</span>
          </motion.div>
        </div>
        
        {/* Empty table */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-10 h-6 bg-saffron-800 rounded-sm relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-300 rounded-sm"></div>
          </div>
        </motion.div>
      </div>

      {/* No customers / empty chairs */}
      <motion.div
        className="absolute bottom-12 left-1/3 transform -translate-x-1/2"
        animate={{ rotate: [-5, 0, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-6 bg-gray-400 rounded-sm" />
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-1/3 transform translate-x-1/2"
        animate={{ rotate: [5, 0, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-4 h-6 bg-gray-400 rounded-sm" />
      </motion.div>
    </motion.div>
  );
};

export default NepaliEmptyState;
