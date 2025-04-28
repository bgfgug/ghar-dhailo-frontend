
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Users, TrendingUp, Clock } from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';

// Mock data for dashboard stats
const stats = [
  { 
    title: 'Total Orders',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'bg-blue-100 text-blue-600' 
  },
  { 
    title: 'Total Users',
    value: '5,678',
    change: '+8%',
    trend: 'up',
    icon: Users,
    color: 'bg-green-100 text-green-600' 
  },
  { 
    title: 'Revenue',
    value: '$12,345',
    change: '+15%',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-600' 
  },
  { 
    title: 'Pending Orders',
    value: '23',
    change: '-5%',
    trend: 'down',
    icon: Clock,
    color: 'bg-amber-100 text-amber-600' 
  },
];

// Mock data for recent orders
const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: '$45.99', status: 'delivered', date: '2025-04-26' },
  { id: 'ORD-002', customer: 'Sarah Smith', total: '$32.50', status: 'processing', date: '2025-04-26' },
  { id: 'ORD-003', customer: 'Mike Johnson', total: '$78.25', status: 'delivered', date: '2025-04-25' },
  { id: 'ORD-004', customer: 'Emily Williams', total: '$21.00', status: 'cancelled', date: '2025-04-25' },
  { id: 'ORD-005', customer: 'David Brown', total: '$56.75', status: 'processing', date: '2025-04-24' },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-500">Welcome to your admin dashboard</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className={`text-xs mt-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Orders */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.total}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
