
import React from 'react';
import { motion } from 'framer-motion';
import { Package, Utensils, Truck, MapPin } from 'lucide-react';
import { OrderStatus } from '@/types/api';
import MandalaProgress from './MandalaProgress';

interface TimelineStep {
  icon: React.ElementType;
  label: string;
  label_np?: string;
  time?: string;
  status: OrderStatus;
}

interface OrderTimelineProps {
  currentStatus: OrderStatus;
  createdAt: string;
  estimatedDelivery?: string;
  isLoadSheddingAffected?: boolean;
  loadSheddingDelay?: number;
  language?: 'en' | 'np';
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({
  currentStatus,
  createdAt,
  estimatedDelivery,
  isLoadSheddingAffected = false,
  loadSheddingDelay = 0,
  language = 'en'
}) => {
  // Define the order timeline steps
  const steps: TimelineStep[] = [
    { 
      icon: Package, 
      label: "Order Confirmed", 
      label_np: "अर्डर पुष्टि भयो",
      status: 'pending',
      time: new Date(createdAt).toLocaleTimeString(language === 'en' ? 'en-US' : 'ne-NP', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    },
    { 
      icon: Utensils, 
      label: "Preparing", 
      label_np: "तयार गर्दै",
      status: 'processing',
      time: estimateTimeForStep('processing', createdAt)
    },
    { 
      icon: Truck, 
      label: "Out for Delivery", 
      label_np: "डेलिभरीको लागि निस्किएको",
      status: 'out_for_delivery',
      time: estimateTimeForStep('out_for_delivery', createdAt, loadSheddingDelay)
    },
    { 
      icon: MapPin, 
      label: "Delivered", 
      label_np: "डेलिभर भयो",
      status: 'delivered',
      time: estimatedDelivery
    }
  ];

  // Calculate overall progress percentage based on current status
  const calculateProgress = () => {
    const statusIndex = steps.findIndex(step => step.status === currentStatus);
    if (statusIndex === -1) return 0;
    return ((statusIndex + 1) / steps.length) * 100;
  };

  return (
    <div className="space-y-8">
      {/* Mandala progress indicator */}
      <div className="flex justify-center mb-6">
        <MandalaProgress progress={calculateProgress()} size="md" showLabel />
      </div>

      {/* Timeline steps */}
      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = getStepStatus(currentStatus, step.status) === 'completed';
          const isActive = getStepStatus(currentStatus, step.status) === 'active';
          
          return (
            <div key={step.status} className="relative">
              {/* Connecting line between steps */}
              {index !== 0 && (
                <div 
                  className={`absolute h-full w-0.5 -top-8 left-[15px] ${
                    isCompleted || isActive ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div 
                  className={`rounded-full p-2 ${
                    isCompleted 
                      ? "bg-primary text-primary-foreground" 
                      : isActive 
                        ? "bg-primary text-primary-foreground animate-pulse"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className={`font-medium ${
                    isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {language === 'en' ? step.label : step.label_np}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {step.time || "Pending"}
                  </p>

                  {/* Load-shedding warning for active processing step */}
                  {isActive && step.status === 'processing' && isLoadSheddingAffected && (
                    <div className="mt-1 text-xs px-2 py-1 bg-saffron-100 text-saffron-800 rounded-md">
                      {language === 'en' 
                        ? `⚠️ Load-shedding delay: +${loadSheddingDelay} min` 
                        : `⚠️ लोडसेडिंग विलम्ब: +${loadSheddingDelay} मिनेट`}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper functions
function getStepStatus(currentStatus: OrderStatus, stepStatus: OrderStatus) {
  const statusOrder: OrderStatus[] = ['pending', 'processing', 'out_for_delivery', 'delivered'];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(stepStatus);
  
  if (stepIndex < currentIndex) return 'completed';
  if (stepIndex === currentIndex) return 'active';
  return 'upcoming';
}

function estimateTimeForStep(status: OrderStatus, createdAt: string, delay: number = 0): string {
  const created = new Date(createdAt);
  
  // Add time based on step
  switch (status) {
    case 'processing':
      created.setMinutes(created.getMinutes() + 15);
      break;
    case 'out_for_delivery':
      created.setMinutes(created.getMinutes() + 45 + delay);
      break;
    case 'delivered':
      created.setMinutes(created.getMinutes() + 90 + delay);
      break;
  }
  
  return created.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export default OrderTimeline;
