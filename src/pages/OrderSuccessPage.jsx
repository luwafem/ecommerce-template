// src/pages/OrderSuccessPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    // Central container with padding, white background, and shadow for focus
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-2xl mt-16 text-center">
      
      {/* Success Heading */}
      <h1 className="text-5xl font-serif font-bold text-green-600 mb-4">
        🎉 Order Confirmed!
      </h1>
      
      {/* Primary Message */}
      <p className="text-lg text-gray-700 mb-8">
        Thank you for your purchase. We have received your payment and your order is being processed.
      </p>
      
      <div className="next-steps space-y-4">
        
        {/* Secondary Message */}
        <p className="text-sm text-gray-500">
          A confirmation email with your order details has been sent to your inbox.
        </p>
        
        {/* Action Buttons - Stacked on mobile, full width */}
        <div className="flex flex-col space-y-3">
          
          {/* Continue Shopping Button (Primary Action) */}
          <Link 
            to="/shop" 
            className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition duration-300 shadow-md"
          >
            Continue Shopping
          </Link>
          
          {/* Go to Homepage Button (Secondary Action) */}
          <Link 
            to="/" 
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition duration-300"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;