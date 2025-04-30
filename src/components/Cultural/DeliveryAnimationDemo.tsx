
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DeliveryAnimation from './DeliveryAnimation';

const DeliveryAnimationDemo = () => {
  const [eta, setEta] = useState(15);
  const [autoPlay, setAutoPlay] = useState(true);
  const [compact, setCompact] = useState(false);
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Nepali Delivery Animation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="space-y-4 pt-4">
            <DeliveryAnimation 
              initialEta={eta} 
              autoPlay={autoPlay} 
              compact={compact}
            />
            <p className="text-sm text-muted-foreground">
              This animation can be embedded in order tracking screens, status modals, or as a standalone component.
            </p>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="eta-slider">Initial ETA (minutes): {eta}</Label>
              <Slider
                id="eta-slider"
                min={1}
                max={30}
                step={1}
                value={[eta]}
                onValueChange={(value) => setEta(value[0])}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoplay-switch">Auto-play animation</Label>
              <Switch
                id="autoplay-switch"
                checked={autoPlay}
                onCheckedChange={setAutoPlay}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-switch">Compact mode</Label>
              <Switch
                id="compact-switch"
                checked={compact}
                onCheckedChange={setCompact}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DeliveryAnimationDemo;
