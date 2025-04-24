
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyBanner from '@/components/EmergencyBanner';
import PromoCarousel from '@/components/PromoCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/data/restaurants';

const Home = () => {
  // Filter popular restaurants (high rating)
  const popularRestaurants = restaurants
    .filter(restaurant => restaurant.rating >= 4.5)
    .slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <EmergencyBanner />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-saffron-500 to-crimson-500 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-4">
                From Our Kitchen to Your Home
              </h1>
              <p className="text-xl mb-6 opacity-90">
                Authentic Nepali cuisine and groceries delivered to your doorstep
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-crimson-500 hover:bg-gray-100 transition-colors px-6 py-3 rounded-md font-medium">
                  Order Food
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors px-6 py-3 rounded-md font-medium text-white">
                  Shop Groceries
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Promos Section */}
        <section className="py-6 bg-gray-50">
          <div className="container mx-auto px-4">
            <PromoCarousel />
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">Categories</h2>
            <CategoryGrid />
          </div>
        </section>
        
        {/* Popular Restaurants */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Popular Restaurants</h2>
              <a href="/listings" className="text-saffron-600 hover:text-saffron-700 font-medium">
                View All
              </a>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-10 text-center">How Ghar Dhailo Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-saffron-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-saffron-600">1</span>
                </div>
                <h3 className="font-medium text-xl mb-2">Choose What You Want</h3>
                <p className="text-gray-600">
                  Browse through our selection of restaurants and grocery items
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-saffron-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-saffron-600">2</span>
                </div>
                <h3 className="font-medium text-xl mb-2">Place Your Order</h3>
                <p className="text-gray-600">
                  Select your items, add to cart, and choose your delivery details
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-saffron-100 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-saffron-600">3</span>
                </div>
                <h3 className="font-medium text-xl mb-2">Enjoy Your Delivery</h3>
                <p className="text-gray-600">
                  Sit back and relax as we deliver your order to your doorstep
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
