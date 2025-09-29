import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, ShoppingBag, Filter, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useUserOrders } from '@/hooks/use-orders';
import { formatPrice } from '@/utils/formatPrice';
import EmptyState from '@/components/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderStatus } from '@/types/api';

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  
  const { data: orders, isLoading, error } = useUserOrders(user?.id || '');

  // Mock data for demonstration
  const mockOrders = [
    {
      id: 'ord_001',
      items: [
        { id: '1', name: 'Chicken Momo', price: 180, quantity: 2 },
        { id: '2', name: 'Dal Bhat', price: 300, quantity: 1 }
      ],
      status: 'delivered' as OrderStatus,
      total: 660,
      createdAt: '2024-01-15T12:30:00Z',
      restaurantName: 'Himalayan Kitchen',
      address: 'Thamel, Kathmandu',
      estimatedDeliveryTime: '25 mins'
    },
    {
      id: 'ord_002',
      items: [
        { id: '3', name: 'Rice (1kg)', price: 120, quantity: 2 },
        { id: '4', name: 'Cooking Oil', price: 300, quantity: 1 }
      ],
      status: 'out_for_delivery' as OrderStatus,
      total: 540,
      createdAt: '2024-01-14T18:45:00Z',
      restaurantName: 'Grocery Hub',
      address: 'New Road, Kathmandu',
      estimatedDeliveryTime: '15 mins'
    },
    {
      id: 'ord_003',
      items: [
        { id: '5', name: 'Thakali Set', price: 380, quantity: 1 }
      ],
      status: 'cancelled' as OrderStatus,
      total: 380,
      createdAt: '2024-01-13T14:20:00Z',
      restaurantName: 'Taste of Pokhara',
      address: 'Lakeside, Pokhara',
      estimatedDeliveryTime: '35 mins'
    }
  ];

  const displayOrders = orders || mockOrders;

  const filteredOrders = statusFilter === 'all' 
    ? displayOrders 
    : displayOrders.filter(order => order.status === statusFilter);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'processing': return 'Processing';
      case 'cancelled': return 'Cancelled';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleTrackOrder = (orderId: string) => {
    navigate(`/order/tracking/${orderId}`);
  };

  const handleReorder = (order: any) => {
    // Add items to cart and navigate to checkout
    // This would integrate with your cart context
    console.log('Reordering:', order);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
        <EmptyState
          icon={ShoppingBag}
          title="Failed to load orders"
          description="There was an error loading your order history. Please try again."
          onAction={() => window.location.reload()}
          actionLabel="Try Again"
        />
    );
  }

  if (filteredOrders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Order History</h2>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        </div>

        <EmptyState
          icon={ShoppingBag}
          title={statusFilter === 'all' ? "No orders yet" : `No ${String(statusFilter)} orders`}
          description={
            statusFilter === 'all'
              ? "Start by ordering some delicious food or groceries!"
              : `You don't have any ${String(statusFilter)} orders.`
          }
          onAction={() => navigate('/home')}
          actionLabel="Start Shopping"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Order History</h2>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | 'all')}>
          <SelectTrigger className="w-40">
            <Filter size={16} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.id.slice(-6)}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status as OrderStatus)}>
                  {getStatusText(order.status as OrderStatus)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Restaurant/Store Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{(order as any).restaurantName || 'Store'}</span>
                <span>•</span>
                <span>{(order as any).address || 'Delivery Address'}</span>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-medium mb-2">Items ({(order as any).items?.length || 0})</h4>
                <div className="space-y-1">
                  {((order as any).items || []).slice(0, 2).map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  {((order as any).items || []).length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{((order as any).items || []).length - 2} more items
                    </p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">{formatPrice(order.total)}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                {(order.status === 'processing' || order.status === 'out_for_delivery') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTrackOrder(order.id)}
                  >
                    <Clock size={16} className="mr-2" />
                    Track Order
                  </Button>
                )}
                {order.status === 'delivered' && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReorder(order)}
                    >
                      Reorder
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star size={16} className="mr-2" />
                      Rate
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;