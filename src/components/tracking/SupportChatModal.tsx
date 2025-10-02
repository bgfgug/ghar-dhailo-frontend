import React, { useState } from 'react';
import { MessageCircle, Send, X, Phone, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface SupportChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId?: string;
}

const SupportChatModal: React.FC<SupportChatModalProps> = ({
  open,
  onOpenChange,
  orderId
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'support' }>>([
    { text: `Hello! How can we help you with order #${orderId}?`, sender: 'support' }
  ]);
  const { toast } = useToast();

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setMessage('');

    // Mock support response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: 'Thank you for your message. Our support team will respond shortly.', sender: 'support' }
      ]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: 'Action Initiated',
      description: `We're ${action}. Please hold on.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Customer Support
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleQuickAction('calling the driver')}
            >
              <Phone className="h-3 w-3 mr-1" />
              Call Driver
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleQuickAction('contacting the restaurant')}
            >
              <Mail className="h-3 w-3 mr-1" />
              Contact Restaurant
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="border rounded-lg p-3 h-64 overflow-y-auto space-y-3 bg-muted/20">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportChatModal;
