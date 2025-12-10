// src/components/Header.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// VERIFIED FIX: Import siteInfo and navLinks from the central data index
import { siteInfo, navLinks } from '../data'; 

const Header = () => {
  const { cartItems } = useCart();
  const location = useLocation();
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-4 sm:p-6">
        
        {/* Logo/Site Title */}
        <Link to="/" className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 hover:text-primary transition duration-200">
          {/* Using siteInfo.name */}
          {siteInfo.name} <span className="text-primary">👑</span>
        </Link>
        
        {/* Navigation Links and Cart Icon */}
        <div className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-base font-medium">
          
          {/* Dynamically generate main links using navLinks */}
          {navLinks.map((link) => (
            (link.title !== 'Cart' && link.title !== 'Checkout') && (
              <Link 
                key={link.title}
                to={link.path} 
                className={`hidden md:block transition duration-200 ${
                  isActive(link.path) 
                    ? 'text-primary font-extrabold border-b-2 border-primary' 
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.title}
              </Link>
            )
          ))}
          
          {/* Cart Link with Dynamic Counter */}
          <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition duration-200">
            <span className="text-2xl">🛒</span>
            
            {/* Counter Bubble */}
            <span className={`absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-gray-900 transform translate-x-1/2 -translate-y-1/2 rounded-full ${
                cartItemCount > 0 ? 'bg-accent' : 'bg-gray-300 text-gray-600'
            }`}>
              {cartItemCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;