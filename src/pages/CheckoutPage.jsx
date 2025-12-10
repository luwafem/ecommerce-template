// src/pages/CheckoutPage.jsx

import React, { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useCart } from '../context/CartContext'; 
// FIX: Import Link along with useNavigate
import { useNavigate, Link } from 'react-router-dom'; 
import { checkoutContent } from '../data'; 

// IMPORTANT: Replace this with your actual Paystack Public Key!
// Use a test key for development: pk_test_...
const PAYSTACK_PUBLIC_KEY = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXXX'; 

// Helper to format currency
const formatPrice = (price) => {
  // Use the currency specified in the product data (NGN)
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN', 
    minimumFractionDigits: 2,
  }).format(price);
};

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  
  const SHIPPING_FEE = checkoutContent.shippingFee || 0; 
  
  const subTotal = getCartTotal();
  const grandTotal = subTotal + SHIPPING_FEE; 
  
  const amountInKobo = grandTotal * 100; 

  // --- 1. Secure Paystack Verification ---
  const verifyTransaction = async (reference) => {
    alert('Payment successful on Paystack. Verifying transaction securely...');
    try {
        const response = await fetch('/.netlify/functions/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reference, amount: grandTotal }),
        });

        const result = await response.json();

        if (result.success) {
            alert('Verification Success! Your order has been confirmed.');
            clearCart();
            navigate('/order-success');
        } else {
            alert(`Payment verification failed. Please contact support with reference: ${reference}`);
        }
    } catch (error) {
        console.error('Verification Error:', error);
        alert('An unexpected error occurred during order processing.');
    }
  };


  // --- 2. Paystack Configuration & Execution ---
  const config = {
    reference: `TX-${(new Date()).getTime()}`, 
    email: customerEmail,
    amount: amountInKobo,
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: 'NGN', 
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (response) => {
    verifyTransaction(response.reference);
  };

  const onClose = () => {
    console.log('Payment modal closed without completing transaction.');
  };
  
  const canProceed = cartItems.length > 0 && customerEmail && shippingAddress;

  if (cartItems.length === 0) {
      return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 text-center">
            <h2 className="text-2xl font-semibold text-red-500">🛒 Your cart is empty. Please add items to checkout.</h2>
            {/* The line that caused the error is now fixed */}
            <p className="mt-4"><Link to="/shop" className="text-primary hover:underline">Go to Shop</Link></p>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-serif font-bold text-gray-900 mb-8 text-center">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        
        {/* Shipping Form Section */}
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-semibold mb-6 text-primary border-b pb-2">1. Shipping Information</h3>
          <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address (Required for Paystack)"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"
              />
              <textarea
                placeholder="Shipping Address (Full street address, city, state)"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                required
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"
              />
          </div>
        </div>

        {/* Order Summary & Payment Button Section */}
        <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6 pt-6 lg:pt-0">
          <h3 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">2. Order Summary</h3>
          
          <div className="space-y-2 text-lg mb-4">
            <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
                <span>Shipping Fee:</span>
                <span>{formatPrice(SHIPPING_FEE)}</span>
            </div>
            <div className="flex justify-between text-2xl font-extrabold text-gray-900 border-t pt-2 mt-2">
                <span>Grand Total:</span>
                <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
          
          <div className="mb-6 border-t border-gray-200 pt-4">
             <img 
               src="/images/paystack-logo.png"
               alt="Paystack Payment" 
               className="h-6 mx-auto mb-2"
             />
             <p className="text-xs text-gray-500 text-center">
                Securely accepting Visa, Mastercard, and Bank Transfer via Paystack.
             </p>
          </div>
          
          <button
            onClick={() => initializePayment(onSuccess, onClose)}
            disabled={!canProceed}
            className={`w-full py-4 text-white rounded-lg font-bold shadow-md transition ${
                canProceed ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Pay {formatPrice(grandTotal)} Securely
          </button>

          {!canProceed && (
            <p className="mt-4 text-sm text-red-500 text-center">
              Please fill in **email** and **shipping address** to enable payment.
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>🔒 All payments are handled securely. Your data is safe.</p>
      </div>
    </div>
  );
};

export default CheckoutPage;