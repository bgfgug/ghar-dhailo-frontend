
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ChevronLeft, ChevronRight, Timer, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { restaurants } from '@/data/restaurants';
import formatPrice from '@/utils/formatPrice';

type MenuCategory = {
  id: string;
  name: string;
  items: typeof restaurants[0]['menu'];
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews'>('menu');
  
  // Find restaurant by id
  const restaurant = restaurants.find(r => r.id === id);
  
  // If restaurant not found, redirect to listings
  if (!restaurant) {
    navigate('/listings');
    return null;
  }
  
  // Group menu items by category
  const menuCategories: MenuCategory[] = restaurant.menu.reduce((acc: MenuCategory[], item) => {
    const existingCategory = acc.find(cat => cat.id === item.category);
    if (existingCategory) {
      existingCategory.items.push(item);
    } else {
      acc.push({
        id: item.category,
        name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        items: [item]
      });
    }
    return acc;
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Restaurant banner */}
        <div className="h-48 sm:h-64 bg-gray-300 relative overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6">
            <button 
              onClick={() => navigate(-1)}
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full mb-2"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
            {restaurant.name_np && (
              <p className="text-white/90 font-nepali">{restaurant.name_np}</p>
            )}
          </div>
        </div>
        
        {/* Restaurant info */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm -mt-6 relative z-10 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center flex-grow">
              <div className="flex items-center bg-green-50 px-3 py-1 rounded">
                <Star size={16} className="text-green-600 mr-1" />
                <span className="font-medium text-green-700">{restaurant.rating}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-1" />
                <span>{restaurant.deliveryTime} mins</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span>{restaurant.address}</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-gray-600">Delivery Fee</p>
              <p className="font-medium">{formatPrice(restaurant.deliveryFee)}</p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white mt-6 rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`px-6 py-4 font-medium text-sm relative ${
                    activeTab === 'menu' 
                      ? 'text-saffron-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('menu')}
                >
                  Menu
                  {activeTab === 'menu' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-saffron-500" />
                  )}
                </button>
                <button
                  className={`px-6 py-4 font-medium text-sm relative ${
                    activeTab === 'reviews' 
                      ? 'text-saffron-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                  {activeTab === 'reviews' && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-saffron-500" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <div className="p-6">
              {activeTab === 'menu' ? (
                <div className="space-y-8">
                  {menuCategories.map(category => (
                    <div key={category.id}>
                      <h3 className="font-medium text-lg mb-4 border-b pb-2">{category.name}</h3>
                      <div className="space-y-4">
                        {category.items.map(item => (
                          <MenuItemCard key={item.id} item={item} restaurantId={restaurant.id} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {/* Reviews content - placeholder */}
                  <div className="text-center py-8">
                    <Info size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="font-medium text-lg mb-2">No reviews yet</h3>
                    <p className="text-gray-600">Be the first to review this restaurant</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
