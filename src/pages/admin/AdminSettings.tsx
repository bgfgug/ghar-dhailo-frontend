
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const AdminSettings = () => {
  const { toast } = useToast();
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Ghar Dhailo',
    siteTagline: 'Delivering Happiness to Your Doorstep',
    contactEmail: 'contact@ghardhailo.com',
    contactPhone: '+977-1-4123456',
    address: 'Kathmandu, Nepal',
    currencySymbol: 'Rs.',
    timezone: 'Asia/Kathmandu',
    defaultLanguage: 'en',
  });
  
  // Delivery settings
  const [deliverySettings, setDeliverySettings] = useState({
    baseDeliveryFee: 100,
    freeDeliveryThreshold: 1000,
    maxDeliveryDistance: 10,
    deliveryTimeBuffer: 30,
    allowScheduledDelivery: true,
    deliveryHoursStart: '08:00',
    deliveryHoursEnd: '22:00',
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableSmsNotifications: true,
    enablePushNotifications: true,
    emailNewOrder: true,
    emailOrderStatusChange: true,
    smsOrderStatusChange: true,
    pushNewOrder: true,
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setDeliverySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Your changes have been saved successfully.",
      });
    }, 800);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500">Configure your application settings</p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          name="siteName"
                          value={generalSettings.siteName}
                          onChange={handleGeneralChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="siteTagline">Tagline</Label>
                        <Input
                          id="siteTagline"
                          name="siteTagline"
                          value={generalSettings.siteTagline}
                          onChange={handleGeneralChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          value={generalSettings.contactEmail}
                          onChange={handleGeneralChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          value={generalSettings.contactPhone}
                          onChange={handleGeneralChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={generalSettings.address}
                        onChange={handleGeneralChange}
                        rows={2}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currencySymbol">Currency Symbol</Label>
                        <Input
                          id="currencySymbol"
                          name="currencySymbol"
                          value={generalSettings.currencySymbol}
                          onChange={handleGeneralChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                          id="timezone"
                          name="timezone"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          value={generalSettings.timezone}
                          onChange={handleGeneralChange}
                        >
                          <option value="Asia/Kathmandu">Asia/Kathmandu</option>
                          <option value="UTC">UTC</option>
                          <option value="Asia/Kolkata">Asia/Kolkata</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="defaultLanguage">Default Language</Label>
                        <select
                          id="defaultLanguage"
                          name="defaultLanguage"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                          value={generalSettings.defaultLanguage}
                          onChange={handleGeneralChange}
                        >
                          <option value="en">English</option>
                          <option value="ne">Nepali</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="mt-4">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Delivery Settings */}
          <TabsContent value="delivery">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="baseDeliveryFee">Base Delivery Fee (Rs.)</Label>
                        <Input
                          id="baseDeliveryFee"
                          name="baseDeliveryFee"
                          type="number"
                          value={deliverySettings.baseDeliveryFee}
                          onChange={handleDeliveryChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="freeDeliveryThreshold">Free Delivery Threshold (Rs.)</Label>
                        <Input
                          id="freeDeliveryThreshold"
                          name="freeDeliveryThreshold"
                          type="number"
                          value={deliverySettings.freeDeliveryThreshold}
                          onChange={handleDeliveryChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxDeliveryDistance">Max Delivery Distance (km)</Label>
                        <Input
                          id="maxDeliveryDistance"
                          name="maxDeliveryDistance"
                          type="number"
                          value={deliverySettings.maxDeliveryDistance}
                          onChange={handleDeliveryChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deliveryTimeBuffer">Delivery Time Buffer (minutes)</Label>
                        <Input
                          id="deliveryTimeBuffer"
                          name="deliveryTimeBuffer"
                          type="number"
                          value={deliverySettings.deliveryTimeBuffer}
                          onChange={handleDeliveryChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="deliveryHoursStart">Delivery Hours Start</Label>
                        <Input
                          id="deliveryHoursStart"
                          name="deliveryHoursStart"
                          type="time"
                          value={deliverySettings.deliveryHoursStart}
                          onChange={handleDeliveryChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deliveryHoursEnd">Delivery Hours End</Label>
                        <Input
                          id="deliveryHoursEnd"
                          name="deliveryHoursEnd"
                          type="time"
                          value={deliverySettings.deliveryHoursEnd}
                          onChange={handleDeliveryChange}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="allowScheduledDelivery"
                        name="allowScheduledDelivery"
                        checked={deliverySettings.allowScheduledDelivery}
                        onCheckedChange={(checked) => {
                          setDeliverySettings(prev => ({
                            ...prev,
                            allowScheduledDelivery: checked
                          }));
                        }}
                      />
                      <Label htmlFor="allowScheduledDelivery">Allow Scheduled Deliveries</Label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="mt-4">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Notification Channels</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Enable email notifications for system events</p>
                        </div>
                        <Switch
                          checked={notificationSettings.enableEmailNotifications}
                          onCheckedChange={(checked) => handleSwitchChange('enableEmailNotifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">SMS Notifications</h4>
                          <p className="text-sm text-gray-500">Enable SMS notifications for important updates</p>
                        </div>
                        <Switch
                          checked={notificationSettings.enableSmsNotifications}
                          onCheckedChange={(checked) => handleSwitchChange('enableSmsNotifications', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">Push Notifications</h4>
                          <p className="text-sm text-gray-500">Enable push notifications for mobile app users</p>
                        </div>
                        <Switch
                          checked={notificationSettings.enablePushNotifications}
                          onCheckedChange={(checked) => handleSwitchChange('enablePushNotifications', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Event Notifications</h3>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">New Order Email</h4>
                          <p className="text-sm text-gray-500">Send email when new order is placed</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailNewOrder}
                          onCheckedChange={(checked) => handleSwitchChange('emailNewOrder', checked)}
                          disabled={!notificationSettings.enableEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">Order Status Email</h4>
                          <p className="text-sm text-gray-500">Send email when order status changes</p>
                        </div>
                        <Switch
                          checked={notificationSettings.emailOrderStatusChange}
                          onCheckedChange={(checked) => handleSwitchChange('emailOrderStatusChange', checked)}
                          disabled={!notificationSettings.enableEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">Order Status SMS</h4>
                          <p className="text-sm text-gray-500">Send SMS when order status changes</p>
                        </div>
                        <Switch
                          checked={notificationSettings.smsOrderStatusChange}
                          onCheckedChange={(checked) => handleSwitchChange('smsOrderStatusChange', checked)}
                          disabled={!notificationSettings.enableSmsNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b">
                        <div>
                          <h4 className="font-medium">New Order Push</h4>
                          <p className="text-sm text-gray-500">Send push notification for new orders</p>
                        </div>
                        <Switch
                          checked={notificationSettings.pushNewOrder}
                          onCheckedChange={(checked) => handleSwitchChange('pushNewOrder', checked)}
                          disabled={!notificationSettings.enablePushNotifications}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="mt-4">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Settings */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <p>Payment settings configuration will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
