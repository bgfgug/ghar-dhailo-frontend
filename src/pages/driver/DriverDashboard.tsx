
import React from 'react';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Check, Clock, X, ExternalLink, Map } from 'lucide-react';

// Mock data for today's delivery tasks
const deliveryTasks = [
  { 
    id: 'DEL-001', 
    orderId: 'ORD-059',
    customer: 'John Doe', 
    address: '123 Main St, Kathmandu', 
    status: 'pending',
    time: '10:30 AM',
    items: 3
  },
  { 
    id: 'DEL-002', 
    orderId: 'ORD-061',
    customer: 'Sarah Smith', 
    address: '456 Oak Ave, Lalitpur', 
    status: 'in_progress',
    time: '11:45 AM',
    items: 2
  },
  { 
    id: 'DEL-003', 
    orderId: 'ORD-064',
    customer: 'Mike Johnson', 
    address: '789 Pine Ln, Bhaktapur', 
    status: 'delivered',
    time: '09:15 AM',
    items: 5
  },
  { 
    id: 'DEL-004', 
    orderId: 'ORD-066',
    customer: 'Emily Davis', 
    address: '321 Cedar Rd, Kathmandu', 
    status: 'pending',
    time: '01:30 PM',
    items: 1
  },
  { 
    id: 'DEL-005', 
    orderId: 'ORD-068',
    customer: 'David Wilson', 
    address: '654 Maple Dr, Patan', 
    status: 'cancelled',
    time: '11:00 AM',
    items: 4
  }
];

const DriverDashboard = () => {
  const pendingDeliveries = deliveryTasks.filter(task => task.status === 'pending' || task.status === 'in_progress');
  const completedDeliveries = deliveryTasks.filter(task => task.status === 'delivered');
  
  return (
    <DriverLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Driver Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here are your deliveries for today</p>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Today's Deliveries</p>
                  <h3 className="text-2xl font-bold">{deliveryTasks.length}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <ShoppingBag className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Completed</p>
                  <h3 className="text-2xl font-bold">{completedDeliveries.length}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Check className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pending</p>
                  <h3 className="text-2xl font-bold">{pendingDeliveries.length}</h3>
                </div>
                <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Pending Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle>Current Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingDeliveries.length > 0 ? (
              <div className="space-y-4">
                {pendingDeliveries.map((task) => (
                  <div key={task.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex flex-wrap justify-between gap-2 mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{task.customer}</h4>
                        <p className="text-gray-500 text-sm">{task.address}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                        </span>
                        <p className="text-sm mt-1">{task.time} • {task.items} items</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Map className="h-4 w-4 mr-2" />
                        View Map
                      </Button>
                      {task.status === 'pending' ? (
                        <Button size="sm" className="flex-1 bg-secondary hover:bg-secondary/90">
                          <Check className="h-4 w-4 mr-2" />
                          Start Delivery
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1">
                          <Check className="h-4 w-4 mr-2" />
                          Complete Delivery
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Check className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                <p className="text-gray-500">You've completed all your deliveries for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Completed Deliveries Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Completed Deliveries</CardTitle>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Customer</th>
                    <th className="text-left py-3 px-4 hidden md:table-cell">Address</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4 hidden sm:table-cell">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {completedDeliveries.map((task) => (
                    <tr key={task.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{task.orderId}</td>
                      <td className="py-3 px-4">{task.customer}</td>
                      <td className="py-3 px-4 hidden md:table-cell">{task.address}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Delivered
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">{task.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DriverLayout>
  );
};

export default DriverDashboard;
