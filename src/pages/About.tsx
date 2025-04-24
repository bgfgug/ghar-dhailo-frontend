
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Truck, Clock, Award, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-saffron-500 to-crimson-500 text-white py-16 sm:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Ghar Dhailo</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Connecting Nepali flavors to your doorstep, one delivery at a time
            </p>
          </div>
        </section>
        
        {/* Our story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg mx-auto">
                <p>
                  Ghar Dhailo was born from a simple idea: to bring the authentic flavors of Nepal to people's homes with ease and reliability. Our name, which translates to "home delivery" in Nepali, reflects our mission to connect local restaurants and grocery stores with customers seeking convenience without compromising on quality.
                </p>
                <p>
                  Founded in 2022 by a group of Nepali entrepreneurs, Ghar Dhailo started as a small operation serving the Kathmandu Valley. Today, we've expanded to multiple cities across Nepal, partnering with hundreds of restaurants and grocery stores to offer a diverse range of food and essential items.
                </p>
                <p>
                  What sets us apart is our deep connection to Nepali culture and cuisine. We celebrate local flavors, support local businesses, and understand the unique challenges of food delivery in Nepal's varied terrain and seasons.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-saffron-100 flex items-center justify-center mb-4">
                  <Shield size={24} className="text-saffron-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Quality Assurance</h3>
                <p className="text-gray-600">
                  We partner only with trusted restaurants and suppliers who maintain high standards of food quality and hygiene.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-saffron-100 flex items-center justify-center mb-4">
                  <Truck size={24} className="text-saffron-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Reliable Delivery</h3>
                <p className="text-gray-600">
                  Our dedicated delivery partners ensure your orders arrive on time, even during challenging weather or festive seasons.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-saffron-100 flex items-center justify-center mb-4">
                  <Heart size={24} className="text-saffron-600" />
                </div>
                <h3 className="font-bold text-xl mb-2">Community First</h3>
                <p className="text-gray-600">
                  We support local businesses, create employment opportunities, and give back to the communities we serve.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Team members - placeholders */}
              {[1, 2, 3, 4].map(index => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 mb-4"></div>
                  <h3 className="font-medium text-lg">Team Member {index}</h3>
                  <p className="text-gray-600">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Join us */}
        <section className="py-16 bg-crimson-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Ghar Dhailo Family</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Whether you're a restaurant owner, delivery partner, or looking for career opportunities, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/partners" className="bg-white text-crimson-500 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                Partner With Us
              </Link>
              <Link to="/careers" className="bg-crimson-600 text-white px-6 py-3 rounded-md font-medium hover:bg-crimson-700 transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Get in Touch</h3>
                <p className="text-gray-600 mb-6">
                  We'd love to hear from you. Feel free to reach out with any questions, suggestions, or feedback.
                </p>
                <div className="space-y-4">
                  <p className="flex items-start">
                    <span className="font-medium w-24">Address:</span>
                    <span className="text-gray-600">Thamel, Kathmandu, Nepal</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium w-24">Phone:</span>
                    <span className="text-gray-600">+977 1 4123456</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium w-24">Email:</span>
                    <span className="text-gray-600">info@ghardhailo.com</span>
                  </p>
                  <p className="flex items-start">
                    <span className="font-medium w-24">Hours:</span>
                    <span className="text-gray-600">8:00 AM - 9:00 PM, 7 days a week</span>
                  </p>
                </div>
              </div>
              <div>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-saffron-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-saffron-500 text-white px-6 py-2 rounded-md font-medium hover:bg-saffron-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
