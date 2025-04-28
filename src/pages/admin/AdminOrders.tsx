
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ShoppingBag, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock orders data
const mockOrders = [
  { 
    id: 'ORD-059', 
    customer: 'John Doe', 
    items: 3,
    total: 'Rs. 850',
    status: 'completed',
    date: '2025-04-28',
    payment: 'Cash on Delivery',
    driver: 'Ram Kumar'
  },
  { 
    id: 'ORD-060', 
    customer: 'Sarah Smith', 
    items: 2,
    total: 'Rs. 450',
    status: 'pending',
    date: '2025-04-28',
    payment: 'Online Payment',
    driver: 'Unassigned'
  },
  { 
    id: 'ORD-061', 
    customer: 'Mike Johnson', 
    items: 5,
    total: 'Rs. 1250',
    status: 'processing',
    date: '2025-04-28',
    payment: 'Cash on Delivery',
    driver: 'Sita Tamang'
  },
  { 
    id: 'ORD-062', 
    customer: 'Emily Davis', 
    items: 1,
    total: 'Rs. 350',
    status: 'cancelled',
    date: '2025-04-28',
    payment: 'Online Payment',
    driver: 'N/A'
  },
  { 
    id: 'ORD-063', 
    customer: 'David Wilson', 
    items: 4,
    total: 'Rs. 950',
    status: 'processing',
    date: '2025-04-27',
    payment: 'Cash on Delivery',
    driver: 'Ram Kumar'
  },
  { 
    id: 'ORD-064', 
    customer: 'Lisa Taylor', 
    items: 2,
    total: 'Rs. 550',
    status: 'completed',
    date: '2025-04-27',
    payment: 'Online Payment',
    driver: 'Sita Tamang'
  },
  { 
    id: 'ORD-065', 
    customer: 'Michael Brown', 
    items: 6,
    total: 'Rs. 1400',
    status: 'completed',
    date: '2025-04-26',
    payment: 'Cash on Delivery',
    driver: 'Ram Kumar'
  },
  { 
    id: 'ORD-066', 
    customer: 'Emma Martinez', 
    items: 3,
    total: 'Rs. 650',
    status: 'completed',
    date: '2025-04-26',
    payment: 'Online Payment',
    driver: 'Sita Tamang'
  },
];

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter orders based on status and search query
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && order.status === 'pending';
    if (activeTab === 'processing') return matchesSearch && order.status === 'processing';
    if (activeTab === 'completed') return matchesSearch && order.status === 'completed';
    if (activeTab === 'cancelled') return matchesSearch && order.status === 'cancelled';
    
    return false;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Orders</h1>
            <p className="text-gray-500">Manage and track customer orders</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Create Order
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>All Orders</CardTitle>
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
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
              <TabsContent value="processing" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
              <TabsContent value="completed" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
              <TabsContent value="cancelled" className="mt-0">
                {renderOrderList(filteredOrders)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Helper function to render order list
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
            <th className="text-left py-3 px-4 hidden md:table-cell">Date</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Items</th>
            <th className="text-left py-3 px-4">Total</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{order.id}</td>
              <td className="py-3 px-4">{order.customer}</td>
              <td className="py-3 px-4 hidden md:table-cell">{order.date}</td>
              <td className="py-3 px-4 hidden md:table-cell">{order.items} items</td>
              <td className="py-3 px-4">{order.total}</td>
              <td className="py-3 px-4">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  order.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <Button size="sm" variant="outline">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
