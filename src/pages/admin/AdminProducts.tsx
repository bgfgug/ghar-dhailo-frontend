
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Coffee, ShoppingBasket } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock products data
const mockProducts = [
  { 
    id: 'PRD-001', 
    name: 'Chicken Momo', 
    type: 'restaurant',
    category: 'Nepali',
    price: 'Rs. 220',
    stock: 'N/A',
    status: 'active',
    restaurant: 'Momo House'
  },
  { 
    id: 'PRD-002', 
    name: 'Veg Pizza', 
    type: 'restaurant',
    category: 'Italian',
    price: 'Rs. 450',
    stock: 'N/A',
    status: 'active',
    restaurant: 'Pizza Corner'
  },
  { 
    id: 'PRD-003', 
    name: 'Potatoes', 
    type: 'grocery',
    category: 'Vegetables',
    price: 'Rs. 80',
    stock: '45 kg',
    status: 'active',
    restaurant: null
  },
  { 
    id: 'PRD-004', 
    name: 'Rice (5kg)', 
    type: 'grocery',
    category: 'Grains',
    price: 'Rs. 350',
    stock: '30 bags',
    status: 'active',
    restaurant: null
  },
  { 
    id: 'PRD-005', 
    name: 'Butter Chicken', 
    type: 'restaurant',
    category: 'Indian',
    price: 'Rs. 380',
    stock: 'N/A',
    status: 'inactive',
    restaurant: 'Curry House'
  },
  { 
    id: 'PRD-006', 
    name: 'Tomatoes', 
    type: 'grocery',
    category: 'Vegetables',
    price: 'Rs. 120',
    stock: '25 kg',
    status: 'active',
    restaurant: null
  },
  { 
    id: 'PRD-007', 
    name: 'Milk (1 liter)', 
    type: 'grocery',
    category: 'Dairy',
    price: 'Rs. 90',
    stock: '50 packets',
    status: 'active',
    restaurant: null
  },
  { 
    id: 'PRD-008', 
    name: 'Chowmein', 
    type: 'restaurant',
    category: 'Chinese',
    price: 'Rs. 180',
    stock: 'N/A',
    status: 'active',
    restaurant: 'Beijing Wok'
  },
];

const AdminProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter products based on type and search query
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'restaurant') return matchesSearch && product.type === 'restaurant';
    if (activeTab === 'grocery') return matchesSearch && product.type === 'grocery';
    
    return false;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-gray-500">Manage restaurant dishes and grocery items</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>All Products</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products..."
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
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="restaurant" className="flex items-center">
                  <Coffee className="mr-2 h-4 w-4" /> Restaurant
                </TabsTrigger>
                <TabsTrigger value="grocery" className="flex items-center">
                  <ShoppingBasket className="mr-2 h-4 w-4" /> Grocery
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {renderProductList(filteredProducts)}
              </TabsContent>
              <TabsContent value="restaurant" className="mt-0">
                {renderProductList(filteredProducts)}
              </TabsContent>
              <TabsContent value="grocery" className="mt-0">
                {renderProductList(filteredProducts)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

// Helper function to render product list
const renderProductList = (products: any[]) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your search or filter.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4">ID</th>
            <th className="text-left py-3 px-4">Name</th>
            <th className="text-left py-3 px-4">Type</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Category</th>
            <th className="text-left py-3 px-4">Price</th>
            <th className="text-left py-3 px-4 hidden md:table-cell">Stock/Source</th>
            <th className="text-left py-3 px-4">Status</th>
            <th className="text-right py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{product.id}</td>
              <td className="py-3 px-4">{product.name}</td>
              <td className="py-3 px-4">
                <Badge variant={product.type === 'restaurant' ? 'default' : 'secondary'}>
                  {product.type === 'restaurant' ? 'Food' : 'Grocery'}
                </Badge>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">{product.category}</td>
              <td className="py-3 px-4">{product.price}</td>
              <td className="py-3 px-4 hidden md:table-cell">
                {product.type === 'grocery' ? product.stock : product.restaurant}
              </td>
              <td className="py-3 px-4">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                <Button size="sm" variant="outline">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
