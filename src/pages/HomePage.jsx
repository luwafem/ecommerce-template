// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// FIX 1: Import all necessary content from the centralized index file
import { products, heroImages, siteInfo } from '../data'; 
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    
  // FIX 2: Select featured products by a tag ("Best Seller") for a more relevant feature section
  const featuredProducts = products
    .filter(product => product.tags && product.tags.includes("Best Seller"))
    .slice(0, 2); 
    
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    // Check if there are images to prevent division by zero or infinite loop if data is empty
    if (heroImages.length === 0) return;
      
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // Change image every 5 seconds (5000ms)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      
      {/* Hero Section: Grid layout to position content over the image */}
      <section className="relative h-[500px] md:h-[650px] rounded-xl shadow-2xl mb-12 overflow-hidden">
        
        {/* --- Image Carousel --- */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Hero Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        
        {/* --- Overlay and Content (Text/CTA) --- */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 md:p-16 text-center">
            
            {/* Content Container */}
            <div className="text-white">
                {/* Large, bold, serif heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
                    {/* Use siteInfo.slogan */}
                    {siteInfo.slogan}
                </h1>
                
                {/* Sub-text */}
                <p className="text-lg sm:text-xl mb-8 font-light max-w-2xl mx-auto drop-shadow-lg">
                    Luxury Virgin Hair Wigs, ethically sourced and delivered across Nigeria.
                </p>
                
                {/* Call to Action Button */}
                <Link 
                    to="/shop" 
                    className="inline-block px-10 py-3 bg-accent text-gray-900 text-lg font-bold rounded-full shadow-xl hover:bg-white hover:text-primary transition duration-300 transform hover:scale-105"
                >
                    Shop Now
                </Link>
            </div>
        </div>
        
        {/* --- Carousel Dots (Optional Navigation) --- */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition duration-300 ${
                index === currentImageIndex ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6 text-center md:text-left">
          ✨ Best Sellers
        </h2>
        
        {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        ) : (
            <p className="text-center text-gray-600">No featured products found. Add the "Best Seller" tag to products in your data file!</p>
        )}
        
        <div className="text-center mt-10">
          <Link 
            to="/shop" 
            className="text-primary font-semibold hover:text-primary/80 transition duration-300 border-b border-primary"
          >
            View All Products &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;