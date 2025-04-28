
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Package, Truck, Timer, Clock, SearchX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import EmptyState from '@/components/EmptyState';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Mock order status - in real app this would come from API
  const currentStep = 2;
  const steps = [
    { icon: Package, label: "Order Confirmed", time: "10:30 AM" },
    { icon: Timer, label: "Preparing", time: "10:45 AM" },
    { icon: Truck, label: "Out for Delivery", time: "11:15 AM" },
    { icon: MapPin, label: "Delivered", time: "11:45 AM" }
  ];

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (orderId === "invalid") {
        setError("Order not found");
      }
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-4 max-w-md mx-auto mt-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="relative">
                    {i !== 0 && (
                      <div className="absolute h-full w-0.5 -top-8 left-[15px] bg-muted" />
                    )}
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="w-full">
                        <Skeleton className="h-4 w-1/3 mb-2" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-4 max-w-md mx-auto mt-8">
          <EmptyState 
            icon={SearchX}
            title="Order Not Found"
            description="We couldn't find the order you're looking for."
            actionLabel="Back to Home"
            actionLink="/home"
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4 max-w-md mx-auto mt-8">
        <ErrorBoundary>
          <Card className="mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Order #{orderId}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStep;
                  const isActive = index === currentStep;
                  
                  return (
                    <div key={step.label} className="relative">
                      {index !== 0 && (
                        <div 
                          className={`absolute h-full w-0.5 -top-8 left-[15px] ${
                            isCompleted ? "bg-primary" : "bg-muted"
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
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`font-medium ${
                            isActive ? "text-primary" : ""
                          }`}>
                            {step.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {step.time}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;
