
import React from 'react';
import { motion } from 'framer-motion';

interface HimalayaLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  textNp?: string;
  variant?: 'yeti' | 'mountains' | 'mandala';
  showText?: boolean;
}

const HimalayaLoader: React.FC<HimalayaLoaderProps> = ({
  size = 'md',
  text = 'Loading...',
  textNp = 'लोड हुँदैछ...',
  variant = 'mountains',
  showText = true,
}) => {
  const sizeClasses = {
    sm: 'w-20 h-16',
    md: 'w-32 h-24',
    lg: 'w-48 h-36'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {variant === 'mountains' && (
          <MountainsLoader />
        )}
        
        {variant === 'yeti' && (
          <YetiLoader />
        )}
        
        {variant === 'mandala' && (
          <MandalaLoader />
        )}
      </div>
      
      {showText && (
        <div className="mt-4 text-center">
          <p className="text-muted-foreground">{text}</p>
          <p className="font-nepali text-sm text-muted-foreground/80">{textNp}</p>
        </div>
      )}
    </div>
  );
};

// Himalayan mountains loader
const MountainsLoader = () => {
  return (
    <>
      {/* Background mountains */}
      <svg
        viewBox="0 0 100 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        {/* Mountain ranges */}
        <motion.path
          d="M0,80 L20,50 L30,60 L40,30 L60,70 L70,55 L80,65 L90,45 L100,60 L100,80 Z"
          fill="#e2e8f0"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M0,80 L10,60 L20,65 L35,40 L45,45 L60,30 L70,40 L90,20 L100,30 L100,80 Z"
          fill="#cbd5e1"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
        />
        <motion.path
          d="M0,80 L20,70 L40,60 L50,50 L60,55 L75,35 L90,40 L100,35 L100,80 Z"
          fill="#94a3b8"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 0.4 }}
        />
        
        {/* Snow caps */}
        <motion.path
          d="M38,32 L40,30 L42,31 L44,29 L46,32 L48,30 L50,31 Z"
          fill="white"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.path
          d="M58,32 L60,30 L62,31 L64,28 L66,32 L68,29 L70,32 Z"
          fill="white"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
        />
      </svg>
      
      {/* Moving clouds */}
      <motion.div
        className="absolute w-12 h-4 bg-white/30 rounded-full blur-sm"
        style={{ top: '20%', left: '10%' }}
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-16 h-5 bg-white/40 rounded-full blur-sm"
        style={{ top: '30%', left: '50%' }}
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Prayer flags */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <motion.div 
          className="flex space-x-1"
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-white'].map((color, i) => (
            <motion.div
              key={i}
              className={`w-3 h-4 ${color}`}
              initial={{ y: 0 }}
              animate={{ y: [-1, 1, -1] }}
              transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </motion.div>
        <div className="h-12 w-0.5 bg-gray-800 mx-auto" />
      </div>
    </>
  );
};

// Yeti loader animation
const YetiLoader = () => {
  return (
    <div className="w-full h-full relative">
      {/* Snow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white rounded-full opacity-30" />
      
      {/* Yeti character */}
      <motion.div
        className="absolute left-1/2 bottom-2 transform -translate-x-1/2"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="relative">
          {/* Body */}
          <motion.div 
            className="w-12 h-14 bg-white rounded-b-3xl rounded-t-2xl shadow-md relative"
            animate={{ scaleX: [1, 1.05, 1], scaleY: [1, 0.98, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            {/* Face */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-5 bg-gray-100 rounded-full">
              {/* Eyes */}
              <div className="flex justify-center space-x-3 pt-2">
                <motion.div 
                  className="w-1.5 h-1.5 bg-gray-800 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-gray-800 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 3, repeatType: "reverse", delay: 0.2 }}
                />
              </div>
            </div>
            
            {/* Arms */}
            <motion.div 
              className="absolute top-4 left-0 w-2 h-6 bg-white rounded-full origin-top"
              animate={{ rotate: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-4 right-0 w-2 h-6 bg-white rounded-full origin-top"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            
            {/* Legs */}
            <motion.div 
              className="absolute -bottom-1 left-2 w-2 h-4 bg-white rounded-full origin-top"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.div 
              className="absolute -bottom-1 right-2 w-2 h-4 bg-white rounded-full origin-top"
              animate={{ rotate: [0, -15, 0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            />
          </motion.div>
          
          {/* Shadow */}
          <motion.div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full"
            animate={{ scaleX: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
      
      {/* Falling snowflakes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: -10,
            opacity: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: ['0%', '100%'],
            x: (i % 2 === 0) ? [null, '-10%', '10%', '-5%'] : [null, '10%', '-10%', '5%']
          }}
          transition={{
            y: {
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            },
            x: {
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ scale: Math.random() * 0.5 + 0.5 }}
        />
      ))}
    </div>
  );
};

// Mandala loader animation
const MandalaLoader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-primary/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {/* Dots on middle ring */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-primary rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translateX(10px) translateY(-50%)`,
              }}
            />
          ))}
        </motion.div>
        
        {/* Inner ring */}
        <motion.div
          className="absolute inset-4 rounded-full border border-primary/60"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center */}
        <motion.div
          className="absolute inset-6 rounded-full bg-primary/20"
          animate={{ scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-1 rounded-full bg-primary/40" />
        </motion.div>
        
        {/* Decorative lines */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-0.5 bg-primary/20 -translate-y-1/2 origin-center"
            style={{ transform: `rotate(${i * 22.5}deg)` }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
};

export default HimalayaLoader;
