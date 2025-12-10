// src/pages/CartPage.jsx

import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Helper to format currency (Simplified - hardcoded NGN as per global content)
const formatPrice = (price) => {
  // Use NGN explicitly since all prices are in NGN based on site content data
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(price);
};

const CartPage = () => {
  // Access the cart state and functions
  const { cartItems, updateQuantity, removeItem, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-16 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Your Shopping Cart is Empty 😔</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any beautiful wigs yet!</p>
        <Link 
          to="/shop" 
          className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition duration-300"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8">Shopping Cart ({cartItems.length} Items)</h1>
      
      {/* Main Layout: Cart Items (70%) and Summary (30%) */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Cart Items List */}
        <section className="lg:w-3/4 space-y-4">
          {cartItems.map((item) => (
            <div 
              // Use the unique variantId if available, otherwise use product id
              key={item.variantId || item.id} 
              className="flex items-center p-4 bg-white rounded-xl shadow-md border border-gray-100"
            >
              
              {/* Item Image */}
              <Link to={`/product/${item.slug}`} className="flex-shrink-0 w-24 h-24 mr-4">
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-lg" 
                />
              </Link>
              
              {/* Item Details (Name, Code, Variants) */}
              <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-1">Code: <strong>{item.id}</strong></p>
                {/* Displaying Variant Information */}
                <p className="text-sm text-gray-700">
                    <span className="font-medium">Variant:</span> {item.attributes.texture} | {item.selectedVariant?.length || item.attributes.length}" | {item.selectedVariant?.density || item.attributes.density}
                </p>
                {/* DISPLAY UNIT PRICE - NOW CORRECTLY USING item.price */}
                <p className="text-md font-bold text-primary mt-1">
                    Unit Price: {formatPrice(item.price)} 
                </p>
              </div>

              {/* Item Controls (Quantity, Subtotal, Remove) */}
              <div className="flex flex-col items-end space-y-2 ml-4 flex-shrink-0 w-36 sm:w-48">
                
                {/* Quantity Input */}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  // Pass the unique ID (variantId or product ID) to context for accurate update
                  onChange={(e) => updateQuantity(item.variantId || item.id, Number(e.target.value))}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg text-center text-sm focus:ring-primary focus:border-primary"
                />
                
                {/* Item Subtotal */}
                <p className="text-lg font-extrabold text-gray-900">
                  {/* CALCULATE SUBTOTAL: Unit Price (item.price) * Quantity */}
                  {formatPrice(item.price * item.quantity)}
                </p>

                {/* Remove Button */}
                <button 
                  className="text-sm text-red-500 hover:text-red-700 transition duration-150" 
                  // Pass the unique ID (variantId or product ID) to context for accurate removal
                  onClick={() => removeItem(item.variantId || item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Right Side: Cart Summary */}
        <section className="lg:w-1/4 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-6">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 border-b pb-2">Order Summary</h2>
          
          <div className="flex justify-between text-lg mb-4">
            <span>Subtotal ({cartItems.length} items):</span>
            <span className="font-semibold">{formatPrice(getCartTotal())}</span>
          </div>
          
          <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-4">
            <span>Total:</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>

          <Link 
            to="/checkout" 
            className="w-full mt-6 py-3 block text-center bg-accent text-gray-900 font-bold rounded-lg shadow-md hover:bg-accent/90 transition duration-300"
          >
            Proceed to Checkout
          </Link>
        </section>

      </div>
    </div>
  );
};

export default CartPage;