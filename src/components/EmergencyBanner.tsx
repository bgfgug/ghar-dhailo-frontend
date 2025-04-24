
import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { promos } from '@/data/promos';

const EmergencyBanner = () => {
  const [visible, setVisible] = useState(false);
  const [emergency, setEmergency] = useState<typeof promos[0] | null>(null);
  
  useEffect(() => {
    // Find emergency promos
    const emergencyPromo = promos.find(promo => promo.type === 'emergency');
    
    if (emergencyPromo) {
      setEmergency(emergencyPromo);
      setVisible(true);
      
      // Check if this notification was dismissed before
      const dismissedEmergencies = JSON.parse(localStorage.getItem('dismissedEmergencies') || '[]');
      if (dismissedEmergencies.includes(emergencyPromo.id)) {
        setVisible(false);
      }
    }
  }, []);
  
  const handleDismiss = () => {
    setVisible(false);
    
    // Save to localStorage
    if (emergency) {
      const dismissedEmergencies = JSON.parse(localStorage.getItem('dismissedEmergencies') || '[]');
      dismissedEmergencies.push(emergency.id);
      localStorage.setItem('dismissedEmergencies', JSON.stringify(dismissedEmergencies));
    }
  };
  
  if (!visible || !emergency) return null;
  
  return (
    <div className="bg-red-50 border-y border-red-100 p-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle size={18} className="text-red-600 mr-2" />
          <div>
            <h3 className="font-medium text-red-800">{emergency.title}</h3>
            <p className="text-sm text-red-700">{emergency.description}</p>
          </div>
        </div>
        <button 
          onClick={handleDismiss}
          className="text-red-600 hover:text-red-800"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default EmergencyBanner;
