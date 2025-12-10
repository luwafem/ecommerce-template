// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Placeholder Components (To be created)
import Header from './components/Header'; 
import Footer from './components/Footer'; 

// Page Components (To be created in upcoming steps)
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
        {/* You should create a Header component with the cart total/count */}
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
      </Router>
    </CartProvider>
  );
}

export default App;