
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Package, Truck, Timer, Clock, SearchX, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import EmptyState from '@/components/EmptyState';
import GoogleMap from '@/components/map/GoogleMap';
import DeliveryAnimation from '@/components/Cultural/DeliveryAnimation';
import { OrderStatus } from '@/types/api';
import {
  getDriverLocation,
  getRestaurantLocation,
  getCustomerLocation,
  getRouteInfo,
  getEstimatedDeliveryTime
} from '@/services/mapsApi';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('progress');
  
  // Mock order status - in real app this would come from API
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('out_for_delivery');
  const currentStep = orderStatus === 'pending' ? 0 : 
                     orderStatus === 'processing' ? 1 :
                     orderStatus === 'out_for_delivery' ? 2 :
                     orderStatus === 'delivered' ? 3 : 0;
                     
  const steps = [
    { icon: Package, label: "Order Confirmed", time: "10:30 AM" },
    { icon: Timer, label: "Preparing", time: "10:45 AM" },
    { icon: Truck, label: "Out for Delivery", time: "11:15 AM" },
    { icon: MapPin, label: "Delivered", time: "11:45 AM" }
  ];

  // Map related states
  const [mapMarkers, setMapMarkers] = useState<any[]>([]);
  const [mapPath, setMapPath] = useState<any[]>([]);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);
  
  // Setup map data
  useEffect(() => {
    if (!isLoading && !error) {
      const restaurantLocation = getRestaurantLocation();
      const customerLocation = getCustomerLocation();
      const driverLocation = getDriverLocation();
      const routeInfo = getRouteInfo();
      
      setMapMarkers([
        {
          position: restaurantLocation,
          title: "Restaurant",
          icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
        },
        {
          position: driverLocation,
          title: "Delivery Driver",
          icon: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
        },
        {
          position: customerLocation,
          title: "Delivery Location",
          icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
      ]);
      
      setMapPath(routeInfo.path);
      setEstimatedTime(getEstimatedDeliveryTime(orderStatus));
    }
  }, [isLoading, error, orderStatus]);

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
      <div className="p-4 max-w-3xl mx-auto mt-8">
        <ErrorBoundary>
          <Card className="mx-auto mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Order #{orderId}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="progress">Order Progress</TabsTrigger>
                  <TabsTrigger value="map">Live Tracking</TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress" className="mt-0">
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
                  
                  {orderStatus === 'out_for_delivery' && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Delivery Time</p>
                          <p className="text-xl font-semibold">{estimatedTime} minutes</p>
                        </div>
                        <Button variant="outline" onClick={() => setActiveTab('map')}>
                          <Navigation className="h-4 w-4 mr-2" />
                          Track on Map
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="map" className="mt-0">
                  <div className="space-y-4">
                    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border">
                      <GoogleMap 
                        markers={mapMarkers}
                        path={mapPath}
                        center={mapMarkers[1]?.position || { lat: 27.7172, lng: 85.3240 }}
                        className="w-full h-full"
                        staticMode={true} // Use static mode
                      />
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-medium">Driver is on the way</p>
                          <p className="text-xl font-bold">
                            Arriving in {estimatedTime} minutes
                          </p>
                        </div>
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                          <Truck className="h-6 w-6" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Distance</p>
                          <p className="font-medium">5.2 km away</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Order Status</p>
                          <p className="font-medium capitalize">
                            {orderStatus.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Added Nepali-themed delivery animation for additional visual feedback */}
                    <div className="mt-6">
                      <DeliveryAnimation initialEta={estimatedTime} autoPlay={true} />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
      <Footer />
    </div>
  );
};

// Missing Button component import
import { Button } from "@/components/ui/button";

export default OrderTracking;
