// src/components/ProductCard.jsx

import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Helper to format currency (reusable utility - simplified NGN)
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(price || 0);
};

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  
  // FIX 1: Extract default variant attributes from the product for the addItem call
  const defaultLength = product.attributes.availableLengths[0];
  const defaultDensity = product.attributes.availableDensities[0];
  
  // FIX 2: Ensure basePrice is a number before passing it
  // We use the base price as the calculated price for the default card quick-add
  const numericBasePrice = parseFloat(product.basePrice) || 0;


  const handleQuickAddToCart = () => {
    if (numericBasePrice > 0) {
      // FIX 3: Call addItem with the correct, full signature (4 required arguments + quantity)
      addItem(
        product,
        defaultLength,      // Default Length
        defaultDensity,     // Default Density
        numericBasePrice,   // Calculated Price (Base Price for quick-add)
        1                   // Quantity
      );
    } else {
      alert("Error: Invalid product price. Please view product details to select a variant.");
    }
  };

  return (
    // Card container: white background, rounded corners, shadow for depth, transition for hover effect
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
      
      {/* Product Image and Link */}
      <Link to={`/product/${product.slug}`}>
        <img 
          src={product.images[0]} 
          alt={product.name} 
          // Fixed height for uniform grid appearance, object-cover to prevent distortion
          className="w-full h-64 object-cover" 
        />
      </Link>
      
      <div className="p-4 flex flex-col items-start">
        
        {/* Product Name (Linked) */}
        <h3 className="text-lg font-bold font-serif mb-1 truncate w-full">
          <Link to={`/product/${product.slug}`} className="hover:text-primary transition duration-200">
            {product.name}
          </Link>
        </h3>
        
        {/* Product Code */}
        <p className="text-xs text-gray-500 mb-2">
          Code: <strong className="text-gray-700">{product.id}</strong>
        </p>
        
        {/* Product Price (Large and Primary Color) */}
        <p className="text-2xl font-extrabold text-primary mb-4">
          {/* Use the safe formatPrice helper */}
          {formatPrice(numericBasePrice)}
        </p>
        
        {/* Add to Cart Button */}
        <button 
          className="w-full py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary/90 transition duration-300" 
          // Call the new handler function
          onClick={handleQuickAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;