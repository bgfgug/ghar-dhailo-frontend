
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Package, Truck, Clock, SearchX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import EmptyState from '@/components/EmptyState';
import { OrderTimeline, NepalMap, EmergencyNotice } from '@/components/Cultural';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'en' | 'np'>('en');
  
  // Mock order data - in real app this would come from API
  const [orderData, setOrderData] = useState({
    status: 'processing' as const,
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    estimatedDelivery: new Date(Date.now() + 60 * 60000).toISOString(), // 1 hour from now
    isLoadSheddingAffected: Math.random() > 0.5,
    loadSheddingDelay: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
    driverLocation: {
      lat: 27.7172,
      lng: 85.3240,
      name: 'Durbar Marg'
    },
    deliveryLocation: {
      lat: 27.6939,
      lng: 85.3157,
      name: 'Jawalakhel'
    },
    landmarkNearby: 'Near Patan Durbar Square',
    emergencyStatus: Math.random() > 0.7 ? 'fuel_crisis' : 'normal'
  });

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
        <div className="p-4 max-w-4xl mx-auto mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="hidden md:block">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-64 w-full rounded-md" />
                </CardContent>
              </Card>
            </div>
          </div>
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
      <div className="p-4 max-w-4xl mx-auto mt-8">
        <ErrorBoundary>
          {/* Emergency notice if applicable */}
          {orderData.isLoadSheddingAffected && (
            <EmergencyNotice 
              type="load_shedding"
              title="Load-shedding in Delivery Area"
              title_np="डेलिभरी क्षेत्रमा लोडसेडिंग"
              description={`Your delivery may be delayed by approximately ${orderData.loadSheddingDelay} minutes due to load-shedding in the delivery area.`}
              description_np={`डेलिभरी क्षेत्रमा लोडसेडिंगको कारणले तपाईंको डेलिभरीमा लगभग ${orderData.loadSheddingDelay} मिनेटको ढिलाइ हुन सक्छ।`}
              severity="medium"
            />
          )}
          
          {orderData.emergencyStatus === 'fuel_crisis' && (
            <EmergencyNotice 
              type="fuel_crisis"
              title="Fuel Shortage Alert"
              title_np="इन्धन अभाव सूचना"
              description="Due to the ongoing fuel crisis, delivery times may be longer than usual. We appreciate your patience."
              description_np="चलिरहेको इन्धन संकटका कारण, डेलिभरी समय सामान्य भन्दा लामो हुन सक्छ। तपाईंको धैर्यताको लागि धन्यवाद।"
              severity="high"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Order timeline */}
            <Card className="mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Order #{orderId}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-end">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setLanguage('en')} 
                      className={`text-xs px-2 py-1 rounded ${language === 'en' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => setLanguage('np')} 
                      className={`text-xs px-2 py-1 rounded font-nepali ${language === 'np' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                    >
                      नेपाली
                    </button>
                  </div>
                </div>
                
                <OrderTimeline 
                  currentStatus={orderData.status}
                  createdAt={orderData.createdAt}
                  estimatedDelivery={orderData.estimatedDelivery}
                  isLoadSheddingAffected={orderData.isLoadSheddingAffected}
                  loadSheddingDelay={orderData.loadSheddingDelay}
                  language={language}
                />
              </CardContent>
            </Card>
            
            {/* Nepal Map with delivery tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === 'en' ? 'Live Tracking' : 'लाइभ ट्र्याकिंग'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <NepalMap 
                    driverLocation={orderData.driverLocation}
                    deliveryLocation={orderData.deliveryLocation}
                    showPath={true}
                    landmark={orderData.landmarkNearby}
                    eta={new Date(orderData.estimatedDelivery).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                    loadSheddingAreas={orderData.isLoadSheddingAffected ? ['lalitpur', 'bhaktapur'] : []}
                  />
                  
                  {orderData.landmarkNearby && (
                    <div className="mt-4 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {language === 'en' ? 'Delivery Location' : 'डेलिभरी स्थान'}
                          </p>
                          <p className="text-muted-foreground">{orderData.landmarkNearby}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

export default OrderTracking;
