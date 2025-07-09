
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GroceryCard from '@/components/GroceryCard';
import GroceryCardSkeleton from '@/components/ui/skeletons/GroceryCardSkeleton';
import { groceries, groceryCategories } from '@/data/groceries';
import { Search } from 'lucide-react';

const GroceryHub = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter groceries based on category and search term
  const filteredGroceries = groceries.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = searchTerm.trim() === '' ? true : 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (item.name_np?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Grocery Hub</h1>
          <p className="text-gray-500 mb-6">Fresh produce and essential groceries delivered to your door</p>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for groceries..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category tabs */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === null 
                    ? 'bg-saffron-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                All Items
              </button>
              
              {groceryCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.id 
                      ? 'bg-saffron-500 text-white' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Grocery grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <GroceryCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredGroceries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredGroceries.map(item => (
                <GroceryCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="font-medium text-xl mb-2">No items found</h3>
              <p className="text-gray-600 mb-4">
                We couldn't find any items matching your search. Try a different keyword or browse categories.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-saffron-500 text-white rounded-md hover:bg-saffron-600"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GroceryHub;
