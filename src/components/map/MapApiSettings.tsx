
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Map } from 'lucide-react';

const MapApiSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Google Maps API key",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you might want to store this in localStorage temporarily
    // or better yet, in a secure backend
    localStorage.setItem('google_maps_api_key', apiKey);
    
    toast({
      title: "API Key Saved",
      description: "Your Google Maps API key has been saved"
    });
    
    setOpen(false);
    
    // Force reload to apply the new API key
    window.location.reload();
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Map className="h-4 w-4" />
          Configure Maps API
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Google Maps API Configuration</DialogTitle>
          <DialogDescription>
            Enter your Google Maps API key to enable map features.
            You can get an API key from the Google Cloud Platform Console.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <label className="text-sm font-medium mb-2 block">Google Maps API Key</label>
          <Input
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Your API key will be stored locally. For production use, this should be stored securely.
          </p>
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MapApiSettings;
