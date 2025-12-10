// src/pages/ProductDetailPage.jsx

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext'; 

// Helper to format currency (Simplified)
const formatPrice = (price) => {
  // Hardcode NGN as per site standard
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(price || 0); // Add (|| 0) safety check
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addItem } = useCart(); 
  
  const product = useMemo(() => products.find(p => p.slug === slug), [slug]);

  const [mainImage, setMainImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [variantUnitPrice, setVariantUnitPrice] = useState(0); 

  // --- Logic to Calculate Price based on Variant Selection ---
  const calculatePrice = (length, density) => {
    if (!product || !density) return 0;
    
    // CRITICAL FIX: Convert basePrice to a floating point number immediately
    // if it might have been loaded as a string (e.g., from a JSON file).
    const basePrice = parseFloat(product.basePrice) || 0; // Use 0 as a fallback if conversion fails
    
    // Check for a non-numeric base price early
    if (isNaN(basePrice) || basePrice <= 0) {
        console.error("Base price is invalid:", product.basePrice);
        return 0;
    }
    
    const multipliers = product.priceMultipliers || {}; 
    const densityMultiplier = multipliers[String(density)] || 1.0; 
    
    // Calculate Unit Price (Base price * Density Multiplier)
    const unitPrice = basePrice * densityMultiplier;
    
    // Ensure the result is a number before saving
    setVariantUnitPrice(unitPrice);
    return unitPrice; 
  };
  
  // --- Initialize Variants and Main Image on Load ---
  useEffect(() => {
    if (product) {
      if (product.images.length > 0) {
        setMainImage(product.images[0]);
      }

      // Set initial variant to the first available options
      const initialLength = product.attributes.availableLengths[0];
      const initialDensity = product.attributes.availableDensities[0];
      
      const initialVariant = {
        length: initialLength,
        density: initialDensity,
      };

      setSelectedVariant(initialVariant);
      // Calculate and set the initial UNIT price
      calculatePrice(initialLength, initialDensity); 
    }
  }, [product]);


  // Update unit price whenever variant changes
  useEffect(() => {
    if (product && selectedVariant) {
      calculatePrice(selectedVariant.length, selectedVariant.density);
    }
  }, [selectedVariant]); 


  if (!product) {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-center">
            <h1 className="text-3xl font-bold text-red-500">404: Product Not Found 😢</h1>
            <p className="mt-2 text-gray-600">The product you are looking for does not exist.</p>
        </div>
    );
  }
  
  const handleVariantChange = (e) => {
    const { name, value } = e.target;
    // Length must be converted to an integer
    const newValue = name === 'length' ? parseInt(value) : value; 

    setSelectedVariant(prev => ({ 
      ...prev, 
      [name]: newValue 
    }));
  };

  const handleAddToCart = () => {
    // Final validation check before adding
    if (isNaN(variantUnitPrice) || variantUnitPrice <= 0) {
      alert("Cannot add to cart: Invalid product price.");
      return;
    }

    // Call the updated addItem function from CartContext.jsx
    addItem(
      product,
      selectedVariant.length,
      selectedVariant.density,
      variantUnitPrice, // This is the UNIT price for the selected variant
      quantity
    );
    
    alert(`${quantity} of ${product.name} (${selectedVariant.length}", ${selectedVariant.density}) added to cart!`);
  };

  // Calculate the total price based on the unit price and quantity
  const totalDisplayPrice = variantUnitPrice * quantity; 

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      
      <div className="flex flex-col lg:flex-row gap-10 bg-white p-6 md:p-10 rounded-xl shadow-2xl">
        
        {/* Gallery / Image Section (50% width on desktop) */}
        <div className="lg:w-1/2">
          
          {/* Main Display Image */}
          <div className="mb-4">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-96 object-cover rounded-lg shadow-xl" 
            />
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={`w-full h-20 object-cover rounded-md cursor-pointer transition duration-200 ${
                  image === mainImage ? 'border-2 border-primary ring-2 ring-primary/50' : 'opacity-70 hover:opacity-100 border border-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info Section (50% width on desktop) */}
        <div className="lg:w-1/2 pt-6 lg:pt-0">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">{product.name}</h2>
          <p className="product-code text-sm text-gray-500 mb-4">Code: <strong>{product.id}</strong></p>
          
          {/* Price Display */}
          <p className="text-5xl font-extrabold text-primary mb-2">
            {formatPrice(variantUnitPrice)} 
          </p>
          <span className="text-lg text-gray-600 mb-6">/ unit (Selected Variant)</span>
          
          <p className="product-description text-gray-700 mb-6 border-b pt-4 pb-6">
            {product.description}
          </p>
          
          {/* Variant Selectors */}
          <div className="variant-selectors space-y-4 mb-8">
            {/* Length Selector */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-800 mb-2">Length (Current: {selectedVariant?.length || 'Select'}"): </label>
              <select 
                name="length" 
                value={selectedVariant?.length || ''}
                onChange={handleVariantChange}
                className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-primary focus:border-primary transition"
              >
                {product.attributes.availableLengths.map(len => (
                  <option key={len} value={len}>{len} inches</option>
                ))}
              </select>
            </div>

            {/* Density Selector */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-gray-800 mb-2">Density (Current: {selectedVariant?.density || 'Select'}):</label>
              <select 
                name="density" 
                value={selectedVariant?.density || ''}
                onChange={handleVariantChange}
                className="p-3 border border-gray-300 rounded-lg bg-white focus:ring-primary focus:border-primary transition"
              >
                {product.attributes.availableDensities.map(den => (
                  <option key={den} value={den}>{den}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="add-to-cart-controls flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full sm:w-20 p-3 border border-gray-300 rounded-lg text-center focus:ring-primary focus:border-primary transition"
            />
            <button 
              className="w-full sm:flex-grow py-3 bg-accent text-gray-900 rounded-lg font-bold shadow-lg hover:bg-accent/90 transition duration-300"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !selectedVariant || isNaN(variantUnitPrice) || variantUnitPrice <= 0}
            >
              {product.stock > 0 ? `Add to Cart - ${formatPrice(totalDisplayPrice)}` : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;