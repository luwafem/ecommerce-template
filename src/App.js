// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async'; 
// NEW: Import the Toast Provider
import { ToastProvider } from './context/ToastContext'; 

// Placeholder Components
import Header from './components/Header'; 
import Footer from './components/Footer'; 
// NEW: Import the Scroll Button Component
import ScrollToTopButton from './components/ScrollToTopButton';

// Page Components 
import HomePage from './pages/HomePage'; 
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage'; 
import CartPage from './pages/CartPage'; 
import CheckoutPage from './pages/CheckoutPage'; 
import OrderSuccessPage from './pages/OrderSuccessPage';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* HelmetProvider and ToastProvider are placed high up to provide context globally */}
        <HelmetProvider>
            {/* NEW: Place ToastProvider around the main content */}
            <ToastProvider> 
              <Header /> 
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:slug" element={<ProductDetailPage />} /> 
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                </Routes>
              </main>
              <Footer />
                {/* NEW: Scroll Button (Global Visibility) */}
                <ScrollToTopButton /> 
            </ToastProvider>
        </HelmetProvider>
      </Router>
    </CartProvider>
  );
}

export default App;