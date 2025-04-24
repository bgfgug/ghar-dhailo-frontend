
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const { getItemCount } = useCart();
  const { currentLocation, locations, setCurrentLocation } = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLocation = () => setIsLocationOpen(!isLocationOpen);

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full festival-gradient flex items-center justify-center">
              <span className="text-white font-bold">GD</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Ghar Dhailo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-saffron-600 transition-colors">
              Home
            </Link>
            <Link to="/listings" className="text-gray-600 hover:text-saffron-600 transition-colors">
              Restaurants
            </Link>
            <Link to="/grocery" className="text-gray-600 hover:text-saffron-600 transition-colors">
              Grocery
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-saffron-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Location selector */}
            <div className="relative hidden sm:block">
              <button 
                onClick={toggleLocation}
                className="flex items-center gap-1 text-gray-700 hover:text-saffron-600 transition-colors"
              >
                <MapPin size={18} />
                <span>{currentLocation.name}</span>
              </button>

              {/* Dropdown */}
              {isLocationOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      className="w-full text-left px-4 py-2 hover:bg-saffron-50 transition-colors"
                      onClick={() => {
                        setCurrentLocation(location.id);
                        setIsLocationOpen(false);
                      }}
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingBag className="text-gray-700" size={20} />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-crimson-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Search bar - only on desktop */}
        <div className="mt-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for food, groceries, and more..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col space-y-3 py-4">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/listings" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Restaurants
              </Link>
              <Link 
                to="/grocery" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Grocery
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                About
              </Link>
              
              {/* Mobile location selector */}
              <div className="px-4 py-2">
                <p className="text-sm font-medium text-gray-500 mb-2">Select Location</p>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      className={`px-3 py-1 text-sm rounded-full ${
                        currentLocation.id === location.id 
                          ? 'bg-saffron-100 text-saffron-800' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setCurrentLocation(location.id)}
                    >
                      {location.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Mobile search */}
              <div className="px-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
