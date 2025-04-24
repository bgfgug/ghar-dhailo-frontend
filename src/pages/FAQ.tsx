
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { faqs } from '@/data/faqs';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

// Group FAQs by category
const groupedFaqs = faqs.reduce((acc: Record<string, typeof faqs>, faq) => {
  if (!acc[faq.category]) {
    acc[faq.category] = [];
  }
  acc[faq.category].push(faq);
  return acc;
}, {});

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleQuestion = (id: string) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };
  
  // Filter FAQs based on search term
  const filteredFaqs = searchTerm.trim() === '' 
    ? groupedFaqs 
    : Object.keys(groupedFaqs).reduce((acc: Record<string, typeof faqs>, category) => {
        const filtered = groupedFaqs[category].filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (faq.question_np && faq.question_np.includes(searchTerm)) ||
          (faq.answer_np && faq.answer_np.includes(searchTerm))
        );
        
        if (filtered.length > 0) {
          acc[category] = filtered;
        }
        
        return acc;
      }, {});
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-saffron-500 to-crimson-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90 mb-8">
              Find answers to common questions about Ghar Dhailo
            </p>
            
            {/* Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>
        
        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {Object.keys(filteredFaqs).length > 0 ? (
              <div className="max-w-3xl mx-auto">
                {Object.entries(filteredFaqs).map(([category, categoryFaqs]) => (
                  <div key={category} className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 capitalize">{category}</h2>
                    <div className="space-y-4">
                      {categoryFaqs.map((faq) => (
                        <div 
                          key={faq.id}
                          className="bg-white rounded-lg shadow-sm overflow-hidden"
                        >
                          <button
                            className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                            onClick={() => toggleQuestion(faq.id)}
                          >
                            <div>
                              <h3 className="font-medium text-lg">{faq.question}</h3>
                              {faq.question_np && (
                                <p className="text-sm text-gray-500 font-nepali">{faq.question_np}</p>
                              )}
                            </div>
                            {activeQuestion === faq.id ? (
                              <ChevronUp size={20} className="text-gray-400" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-400" />
                            )}
                          </button>
                          
                          {activeQuestion === faq.id && (
                            <div className="px-6 pb-4">
                              <div className="border-t pt-4">
                                <p className="text-gray-700">{faq.answer}</p>
                                {faq.answer_np && (
                                  <p className="text-gray-600 mt-2 font-nepali">{faq.answer_np}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="font-medium text-2xl mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching your search. Try different keywords.
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-saffron-600 font-medium hover:text-saffron-700"
                >
                  Clear search
                </button>
              </div>
            )}
            
            {/* Still have questions */}
            <div className="max-w-3xl mx-auto mt-12 bg-gray-100 rounded-lg p-8 text-center">
              <h3 className="font-bold text-xl mb-3">Still have questions?</h3>
              <p className="text-gray-600 mb-6">
                If you can't find the answer you're looking for, please contact our customer support team.
              </p>
              <a 
                href="mailto:support@ghardhailo.com"
                className="bg-saffron-500 text-white px-6 py-2 rounded-md font-medium hover:bg-saffron-600 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
