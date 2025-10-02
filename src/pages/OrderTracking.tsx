
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Package, Truck, Timer, Clock, SearchX, Navigation, Phone, User, Share2, HelpCircle, CheckCircle2, MapPinOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import EmptyState from '@/components/EmptyState';
import GoogleMap from '@/components/map/GoogleMap';
import DeliveryAnimation from '@/components/Cultural/DeliveryAnimation';
import SupportChatModal from '@/components/tracking/SupportChatModal';
import ProgressBar from '@/components/tracking/ProgressBar';
import CountdownTimer from '@/components/tracking/CountdownTimer';
import { OrderStatus } from '@/types/api';
import { getOrderTracking } from '@/services/mapsApi';
import { useMockLocation } from '@/hooks/useMockLocation';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useToast } from '@/hooks/use-toast';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('progress');
  const [orderData, setOrderData] = useState<any>(null);
  const [supportOpen, setSupportOpen] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const { toast } = useToast();
  
  // User location hook
  const userLocation = useUserLocation();
  
  // Mock location updates
  const mockLocation = useMockLocation(
    orderId || 'DEMO123',
    orderData?.status || 'processing'
  );

  // Setup order data
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        if (orderId === "invalid") {
          setError("Order not found");
          setIsLoading(false);
          return;
        }

        const data = await getOrderTracking(orderId || 'DEMO123');
        setOrderData(data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load order data");
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchOrderData, 1000);
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

  // Use live mock location data if available
  const status = mockLocation.status;
  const { timeline, driverName, driverPhone, orderItems, totalAmount } = orderData;
  const estimatedDeliveryMinutes = mockLocation.estimatedMinutes;
  const distanceRemaining = mockLocation.distanceRemaining;
  
  const handleShareTracking = () => {
    const trackingUrl = `${window.location.origin}/order/tracking/${orderId}`;
    navigator.clipboard.writeText(trackingUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: "Tracking link copied to clipboard"
      });
    }).catch(() => {
      toast({
        title: "Failed to Copy",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    });
  };

  const handleManualLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lat = parseFloat(formData.get('lat') as string);
    const lng = parseFloat(formData.get('lng') as string);
    
    if (!isNaN(lat) && !isNaN(lng)) {
      userLocation.setManualLocation(lat, lng);
      setShowLocationInput(false);
      toast({
        title: "Location Set",
        description: "Your location has been updated"
      });
    }
  };
  
  const currentStep = status === 'pending' ? 0 : 
                     status === 'processing' ? 1 :
                     status === 'out_for_delivery' ? 2 :
                     status === 'delivered' ? 3 : 0;

  const steps = [
    { icon: Package, label: "Order Confirmed", time: timeline[0]?.time || "10:30 AM" },
    { icon: Timer, label: "Preparing", time: timeline[1]?.time || "10:45 AM" },
    { icon: Truck, label: "Out for Delivery", time: timeline[2]?.time || "11:15 AM" },
    { icon: MapPin, label: "Delivered", time: timeline[3]?.time || "11:45 AM" }
  ];

  const mapMarkers = [
    {
      position: orderData.restaurantLocation,
      title: "Restaurant - Kathmandu Kitchen",
      color: "restaurant"
    },
    {
      position: mockLocation.driverLocation,
      title: `Driver - ${driverName}`,
      color: "driver"
    },
    {
      position: userLocation.location || orderData.customerLocation,
      title: "Your Location",
      color: "customer"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="p-4 max-w-3xl mx-auto mt-8 mb-20">
        <ErrorBoundary>
          <Card className="mx-auto mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Order #{orderId}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {orderItems?.length} items • Rs. {totalAmount}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShareTracking}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
              
              {/* Animated Progress Bar */}
              <ProgressBar status={status} className="mt-4" />
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-6 grid w-full grid-cols-3">
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="map">Live Map</TabsTrigger>
                  <TabsTrigger value="animation">Journey</TabsTrigger>
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
                  
                  {status === 'out_for_delivery' && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                          <CountdownTimer 
                            initialMinutes={estimatedDeliveryMinutes}
                            onComplete={() => {
                              toast({
                                title: "Order Delivered! 🎉",
                                description: "Your order should arrive any moment now"
                              });
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Distance Remaining</p>
                          <p className="text-xl font-semibold">{distanceRemaining}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" onClick={() => setActiveTab('map')} className="flex-1">
                          <Navigation className="h-4 w-4 mr-2" />
                          Track on Map
                        </Button>
                        <Button variant="outline" onClick={() => setActiveTab('animation')} className="flex-1">
                          <Truck className="h-4 w-4 mr-2" />
                          View Journey
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {status === 'delivered' && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold text-primary">Order Delivered!</p>
                          <p className="text-sm text-muted-foreground">Thank you for ordering with us</p>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="map" className="mt-0">
                  <div className="space-y-4">
                    {/* Location Permission UI */}
                    {!userLocation.location && !userLocation.permissionDenied && (
                      <Alert>
                        <MapPin className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                          <span>Enable location for better tracking</span>
                          <Button 
                            size="sm" 
                            onClick={userLocation.requestLocation}
                            disabled={userLocation.loading}
                          >
                            {userLocation.loading ? 'Getting...' : 'Allow Location'}
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {userLocation.permissionDenied && !showLocationInput && (
                      <Alert variant="destructive">
                        <MapPinOff className="h-4 w-4" />
                        <AlertDescription className="flex items-center justify-between">
                          <span>Location access denied</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setShowLocationInput(true)}
                          >
                            Enter Manually
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {showLocationInput && (
                      <form onSubmit={handleManualLocation} className="flex gap-2">
                        <Input 
                          name="lat" 
                          placeholder="Latitude (e.g., 27.7172)" 
                          type="number" 
                          step="any"
                          required 
                        />
                        <Input 
                          name="lng" 
                          placeholder="Longitude (e.g., 85.3240)" 
                          type="number" 
                          step="any"
                          required 
                        />
                        <Button type="submit">Set</Button>
                      </form>
                    )}
                    
                    <div className="aspect-[4/3] w-full rounded-lg overflow-hidden border">
                      <GoogleMap 
                        markers={mapMarkers}
                        path={orderData.route}
                        center={mockLocation.driverLocation}
                        className="w-full h-full"
                        showControls={true}
                        showLandmarks={true}
                      />
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-medium">Driver Information</p>
                          <p className="text-lg font-bold flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {driverName}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Driver
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Distance</p>
                          <p className="font-medium">{distanceRemaining}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ETA</p>
                          <p className="font-medium">{estimatedDeliveryMinutes} mins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="animation" className="mt-0">
                  <div className="space-y-4">
                    <DeliveryAnimation 
                      initialEta={estimatedDeliveryMinutes} 
                      autoPlay={status === 'out_for_delivery'} 
                      compact={false}
                    />
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Your Order Journey</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Follow your delivery as it travels through the beautiful streets of Kathmandu
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">From:</span>
                          <p className="font-medium">Thamel, Kathmandu</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">To:</span>
                          <p className="font-medium">Baneshwor, Kathmandu</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ErrorBoundary>
      </div>
      
      {/* Floating Help Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setSupportOpen(true)}
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </motion.div>
      
      {/* Support Chat Modal */}
      <SupportChatModal 
        open={supportOpen}
        onOpenChange={setSupportOpen}
        orderId={orderId}
      />
      
      <Footer />
    </div>
  );
};

export default OrderTracking;

