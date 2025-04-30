
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HimalayaLoader, FestivalCard } from '@/components/Cultural';
import { festivals } from '@/data/festivals';

const FestivalSpecial = () => {
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'np'>('en');
  
  // Find the closest upcoming festival
  const today = new Date();
  const upcomingFestivals = festivals.filter(f => new Date(f.startDate) > today);
  const closestFestival = upcomingFestivals.length > 0 
    ? upcomingFestivals.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0]
    : null;
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Language switcher */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
            <button 
              onClick={() => setLanguage('en')} 
              className={`text-xs px-3 py-1 rounded-full transition-colors ${language === 'en' ? 'bg-primary text-white' : ''}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('np')} 
              className={`text-xs px-3 py-1 rounded-full font-nepali transition-colors ${language === 'np' ? 'bg-primary text-white' : ''}`}
            >
              नेपाली
            </button>
          </div>
        </div>
        
        {/* Festival Hero */}
        <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-saffron-400 to-crimson-500 mb-8">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="10" cy="10" r="1.6257413380501518" fill="#fff"></circle>
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
            </svg>
          </div>
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-3/5">
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {language === 'en' ? 'Nepali Festival Specials' : 'नेपाली चाडपर्व विशेष'}
              </motion.h1>
              <motion.p 
                className="text-white/90 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {language === 'en' 
                  ? 'Celebrate Nepali festivals with our special offerings, traditional dishes, and festival gift baskets.' 
                  : 'हाम्रो विशेष प्रस्तावहरू, परम्परागत परिकारहरू, र चाडपर्व उपहार टोकरीहरू सँग नेपाली चाडपर्वहरू मनाउनुहोस्।'}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {closestFestival && (
                  <div className="flex items-center bg-white/20 backdrop-blur-sm text-white rounded-full px-3 py-1 text-sm">
                    <Calendar size={14} className="mr-2" />
                    <span>
                      {language === 'en' 
                        ? `Next Festival: ${closestFestival.name}`
                        : `अर्को चाडपर्व: ${closestFestival.name_np}`
                      }
                    </span>
                  </div>
                )}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link to="/festival-gifts">
                  <Button className="bg-white text-crimson-600 hover:bg-white/90">
                    {language === 'en' ? 'Browse Festival Gifts' : 'चाडपर्व उपहारहरू हेर्नुहोस्'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <div className="md:w-2/5 flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <div className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Gift size={64} className="text-white" />
                </div>
                
                <motion.div 
                  className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-xl font-bold text-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Festival Cards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Upcoming Festivals' : 'आगामी चाडपर्वहरू'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <HimalayaLoader 
                  variant="mandala" 
                  text={language === 'en' ? "Loading festivals..." : "चाडपर्वहरू लोड हुँदैछ..."}
                  textNp={language === 'en' ? "" : "चाडपर्वहरू लोड हुँदैछ..."}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {festivals.map((festival) => (
                  <FestivalCard 
                    key={festival.id} 
                    festival={festival} 
                    language={language}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Festival Recipe Exchange */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Festival Recipe Exchange' : 'चाडपर्व पाकविधि आदान-प्रदान'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-saffron-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">
                {language === 'en' ? 'Share Your Festival Recipes' : 'आफ्नो चाडपर्व पाकविधिहरू साझा गर्नुहोस्'}
              </h3>
              <p className="text-gray-600 mb-4">
                {language === 'en' 
                  ? 'Exchange traditional recipes with the community. Share your family\'s special dishes and learn new ones.' 
                  : 'समुदायसँग परम्परागत पाकविधिहरू आदान-प्रदान गर्नुहोस्। आफ्नो परिवारको विशेष परिकारहरू साझा गर्नुहोस् र नयाँ परिकारहरू सिक्नुहोस्।'}
              </p>
              <Button className="bg-saffron-500 hover:bg-saffron-600 text-white">
                {language === 'en' ? 'Coming Soon' : 'चाँडै आउँदैछ'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default FestivalSpecial;
