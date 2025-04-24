
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full festival-gradient flex items-center justify-center">
                <span className="text-white font-bold text-xl">GD</span>
              </div>
              <span className="text-xl font-bold text-white">Ghar Dhailo</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Bringing Nepal's flavors to your doorstep. Fresh, local, and authentic.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-saffron-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-saffron-400 transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/grocery" className="text-gray-400 hover:text-saffron-400 transition-colors">
                  Grocery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-saffron-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-saffron-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400">Thamel, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400">+977 1 4123456</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-gray-400 mt-0.5" />
                <span className="text-gray-400">info@ghardhailo.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates on special offers and promotions
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-l-md bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-saffron-500 w-full"
              />
              <button className="bg-saffron-500 hover:bg-saffron-600 px-4 py-2 rounded-r-md text-white font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Ghar Dhailo. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
