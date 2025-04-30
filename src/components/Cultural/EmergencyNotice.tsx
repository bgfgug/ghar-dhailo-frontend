
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Fuel, Cloud, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmergencyNoticeProps {
  type: 'fuel_crisis' | 'load_shedding' | 'disaster' | 'general';
  title: string;
  description: string;
  title_np?: string;
  description_np?: string;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  severity?: 'low' | 'medium' | 'high';
}

const EmergencyNotice: React.FC<EmergencyNoticeProps> = ({
  type,
  title,
  description,
  title_np,
  description_np,
  onClose,
  actionLabel,
  onAction,
  severity = 'medium'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Get the appropriate icon based on emergency type
  const getIcon = () => {
    switch (type) {
      case 'fuel_crisis':
        return Fuel;
      case 'load_shedding':
        return Cloud;
      case 'disaster':
        return AlertTriangle;
      default:
        return MapPin;
    }
  };
  
  const Icon = getIcon();
  
  // Get the appropriate color based on severity
  const getSeverityColor = () => {
    switch (severity) {
      case 'low':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-100',
          text: 'text-blue-800',
          icon: 'text-blue-600',
          button: 'bg-blue-100 hover:bg-blue-200 text-blue-700'
        };
      case 'medium':
        return {
          bg: 'bg-saffron-50',
          border: 'border-saffron-100',
          text: 'text-saffron-800',
          icon: 'text-saffron-600',
          button: 'bg-saffron-100 hover:bg-saffron-200 text-saffron-700'
        };
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-100',
          text: 'text-red-800',
          icon: 'text-red-600',
          button: 'bg-red-100 hover:bg-red-200 text-red-700'
        };
    }
  };
  
  const colors = getSeverityColor();
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for exit animation to complete
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`${colors.bg} ${colors.border} border p-4 rounded-lg mb-4`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className={`${colors.icon} mt-1`}>
                <Icon size={20} />
              </div>
              <div>
                <div className="flex flex-col space-y-1">
                  <h3 className={`font-medium ${colors.text}`}>{title}</h3>
                  {title_np && (
                    <p className={`text-sm font-nepali ${colors.text} opacity-80`}>{title_np}</p>
                  )}
                  <p className={`text-sm ${colors.text} opacity-90`}>{description}</p>
                  {description_np && (
                    <p className={`text-xs font-nepali ${colors.text} opacity-70`}>{description_np}</p>
                  )}
                </div>
                
                {actionLabel && onAction && (
                  <Button
                    className={`mt-2 text-xs py-1 h-auto ${colors.button}`}
                    variant="ghost"
                    onClick={onAction}
                  >
                    {actionLabel}
                  </Button>
                )}
              </div>
            </div>
            
            <button 
              onClick={handleClose}
              className={`${colors.icon} hover:opacity-70 transition-opacity`}
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Animated indicator for high severity */}
          {severity === 'high' && (
            <motion.div
              className="w-full h-1 bg-red-200 mt-3 rounded-full overflow-hidden"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div 
                className="h-full bg-red-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyNotice;
