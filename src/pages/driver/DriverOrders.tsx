
import React, { useState } from 'react';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock orders data
const allOrders = [
  { 
    id: 'ORD-001', 
    customer: 'John Doe', 
    address: '123 Main St, Kathmandu', 
    items: 3,
    total: 'Rs. 850',
    status: 'assigned',
    time: '10:30 AM',
    date: '2025-04-28' 
  },
  { 
    id: 'ORD-002', 
    customer: 'Sarah Smith', 
    address: '456 Oak Ave, Lalitpur', 
    items: 2,
    total: 'Rs. 450',
    status: 'out_for_delivery',
    time: '11:45 AM',
    date: '2025-04-28' 
  },
  { 
    id: 'ORD-003', 
    customer: 'Mike Johnson', 
    address: '789 Pine Ln, Bhaktapur', 
    items: 5,
    total: 'Rs. 1250',
    status: 'delivered',
    time: '09:15 AM',
    date: '2025-04-28' 
  },
  { 
    id: 'ORD-004', 
    customer: 'Emily Davis', 
    address: '321 Cedar Rd, Kathmandu', 
    items: 1,
    total: 'Rs. 350',
    status: 'assigned',
    time: '01:30 PM',
    date: '2025-04-28' 
  },
  { 
    id: 'ORD-005', 
    customer: 'David Wilson', 
    address: '654 Maple Dr, Patan', 
    items: 4,
    total: 'Rs. 950',
    status: 'delivered',
    time: '11:00 AM',
    date: '2025-04-27' 
  },
  { 
    id: 'ORD-006', 
    customer: 'Lisa Taylor', 
    address: '987 Birch Ct, Kathmandu', 
    items: 2,
    total: 'Rs. 550',
    status: 'delivered',
    time: '02:45 PM',
    date: '2025-04-27' 
  },
  { 
    id: 'ORD-007', 
    customer: 'Michael Brown', 
    address: '654 Spruce St, Bhaktapur', 
    items: 6,
    total: 'Rs. 1400',
    status: 'delivered',
    time: '04:30 PM',
    date: '2025-04-26' 
  },
  { 
    id: 'ORD-008', 
    customer: 'Emma Martinez', 
    address: '321 Willow Way, Lalitpur', 
    items: 3,
    total: 'Rs. 650',
    status: 'cancelled',
    time: '12:15 PM',
    date: '2025-04-26' 
  },
];

const DriverOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter orders based on status and search query
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && (order.status === 'assigned' || order.status === 'out_for_delivery');
    if (activeTab === 'delivered') return matchesSearch && order.status === 'delivered';
    if (activeTab === 'cancelled') return matchesSearch && order.status === 'cancelled';
    
    return false;
  });

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-gray-500">View and manage all your delivery orders</p>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Delivery Orders</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search orders..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
              <TabsContent value="active" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
              <TabsContent value="delivered" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
              <TabsContent value="cancelled" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DriverLayout>
  );
};

// Helper function to render order list with consistent styling
const renderOrderList = (orders: any[]) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No orders found</h3>
        <p className="text-gray-500">Try adjusting your search or filter.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">Order ID</th>
            <th className="text-left py-3 px-4">Customer</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Address</th>
            <th className="text-left py-3 px-4 hidden sm:table-cell">Items</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-left py-3 px-4 hidden lg:table-cell">Date</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{order.id}</td>
              <td className="py-3 px-4">{order.customer}</td>
              <td className="py-3 px-4 hidden md:table-cell">{order.address}</td>
              <td className="py-3 px-4 hidden sm:table-cell">{order.items} items</td>
              <td className="py-3 px-4">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                  order.status === 'assigned' ? 'bg-amber-100 text-amber-800' : 
                  order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status === 'assigned' ? 'Assigned' :
                   order.status === 'out_for_delivery' ? 'Out for delivery' :
                   order.status === 'delivered' ? 'Delivered' : 'Cancelled'}
                </span>
              </td>
              <td className="py-3 px-4 hidden lg:table-cell">{order.date}</td>
              <td className="py-3 px-4 text-right">
                <Button size="sm" variant="outline">Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverOrders;
