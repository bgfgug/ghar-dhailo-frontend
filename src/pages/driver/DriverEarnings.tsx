
import React, { useState } from 'react';
import DriverLayout from '@/components/layouts/DriverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock earnings data
const earningsData = {
  totalEarnings: 'Rs. 32,450',
  pendingPayouts: 'Rs. 2,850',
  deliveriesCompleted: 156,
  amountPerDelivery: 'Rs. 208',
  weeklySummary: [
    { week: 'Week 1', earnings: 'Rs. 7,850', deliveries: 38 },
    { week: 'Week 2', earnings: 'Rs. 8,750', deliveries: 42 },
    { week: 'Week 3', earnings: 'Rs. 6,950', deliveries: 33 },
    { week: 'Week 4', earnings: 'Rs. 8,900', deliveries: 43 },
  ],
  recentPayments: [
    { id: 'PAY-001', amount: 'Rs. 7,850', status: 'completed', date: '2025-04-07' },
    { id: 'PAY-002', amount: 'Rs. 8,750', status: 'completed', date: '2025-04-14' },
    { id: 'PAY-003', amount: 'Rs. 6,950', status: 'completed', date: '2025-04-21' },
    { id: 'PAY-004', amount: 'Rs. 6,050', status: 'pending', date: '2025-04-28' },
  ]
};

const DriverEarnings = () => {
  const [period, setPeriod] = useState('this-month');

  return (
    <DriverLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Earnings</h1>
          <p className="text-gray-500">View your earnings and payment history</p>
        </div>
        
        {/* Period Selector */}
        <div className="flex justify-end">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
                  <h3 className="text-2xl font-bold">{earningsData.totalEarnings}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pending Payouts</p>
                  <h3 className="text-2xl font-bold">{earningsData.pendingPayouts}</h3>
                </div>
                <div className="p-3 rounded-full bg-amber-100 text-amber-600">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Deliveries</p>
                  <h3 className="text-2xl font-bold">{earningsData.deliveriesCompleted}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Avg. per Delivery</p>
                  <h3 className="text-2xl font-bold">{earningsData.amountPerDelivery}</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Earnings Details */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>Earnings Breakdown</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="mb-6">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weekly">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Week</th>
                        <th className="text-left py-3 px-4">Deliveries</th>
                        <th className="text-left py-3 px-4">Earnings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {earningsData.weeklySummary.map((week) => (
                        <tr key={week.week} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{week.week}</td>
                          <td className="py-3 px-4">{week.deliveries}</td>
                          <td className="py-3 px-4">{week.earnings}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-medium">
                        <td className="py-3 px-4">Total</td>
                        <td className="py-3 px-4">{earningsData.weeklySummary.reduce((sum, week) => sum + week.deliveries, 0)}</td>
                        <td className="py-3 px-4">{earningsData.totalEarnings}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="monthly">
                <div className="text-center py-8 text-gray-500">
                  Monthly breakdown will be available soon.
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Payment ID</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {earningsData.recentPayments.map((payment) => (
                    <tr key={payment.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{payment.id}</td>
                      <td className="py-3 px-4">{payment.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {payment.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4">{payment.date}</td>
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

export default DriverEarnings;
