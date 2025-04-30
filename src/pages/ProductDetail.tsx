
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  SpiceLevelIndicator, 
  DietaryTags, 
  EmergencyNotice,
  HimalayaLoader
} from '@/components/Cultural';

// This is a stub implementation - we'll need to integrate with actual components as needed
const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct({
        id,
        name: 'Vegetable Momo',
        name_np: 'भेजिटेबल मम',
        price: 150,
        description: 'Steamed dumplings filled with mixed vegetables and spices',
        description_np: 'मिश्रित सागसब्जी र मसलाहरूले भरिएको वाफबाट पकाइएको मम',
        image: '/placeholder.svg',
        spiceLevel: 3,
        dietaryTags: ['vegetarian', 'no_onion_garlic'],
        ingredients: ['Flour', 'Cabbage', 'Carrot', 'Bell Pepper', 'Spices'],
        isVeg: true
      });
      setLoading(false);
    }, 1500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <HimalayaLoader variant="yeti" size="lg" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/listings" className="text-primary hover:underline">
              Browse Other Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <EmergencyNotice 
          type="general"
          title="Festival Special Offer"
          title_np="चाडपर्व विशेष अफर"
          description="Get 10% off on all momo orders during Dashain festival!"
          description_np="दशैं चाडको अवसरमा सबै मम अर्डरमा १०% छुट पाउनुहोस्!"
          severity="low"
          actionLabel="View Offer"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            {product.name_np && (
              <h2 className="text-lg font-nepali text-gray-600 mb-2">{product.name_np}</h2>
            )}
            
            <div className="flex items-center gap-4 mt-4 mb-6">
              <p className="text-xl font-semibold">Rs. {product.price}</p>
              
              {/* Spice level indicator */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Spice Level:</span>
                <SpiceLevelIndicator level={product.spiceLevel} size="sm" />
              </div>
            </div>
            
            {/* Dietary tags */}
            {product.dietaryTags && product.dietaryTags.length > 0 && (
              <div className="mb-6">
                <DietaryTags 
                  tags={product.dietaryTags.map((tag: string) => tag === 'vegetarian' ? 'satvik' : tag)} 
                  size="sm" 
                />
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
              {product.description_np && (
                <p className="text-gray-600 font-nepali mt-1">{product.description_np}</p>
              )}
            </div>
            
            {product.ingredients && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Ingredients</h3>
                <div className="flex flex-wrap gap-1">
                  {product.ingredients.map((ingredient: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-gray-100 px-2 py-1 text-sm rounded-md"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-4 mt-8">
              <button className="bg-primary text-white px-6 py-3 rounded-md font-medium">
                Add to Cart
              </button>
              <button className="border border-gray-300 px-6 py-3 rounded-md font-medium">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
