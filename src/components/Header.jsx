// src/components/Header.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { siteInfo, navLinks } from '../data';

const Header = () => {
  const { cartItems } = useCart();
  const location = useLocation();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight"
        >
          {siteInfo.name}
        </Link>

        {/* MAIN NAV (DESKTOP) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            link.title !== 'Cart' &&
            link.title !== 'Checkout' && (
              <Link
                key={link.title}
                to={link.path}
                className={`pb-1 transition ${
                  isActive(link.path)
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.title}
              </Link>
            )
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center space-x-4">

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-gray-900 transition"
            aria-label="View cart"
          >
            {/* Simple cart icon (Woo-like) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 100 6 3 3 0 000-6zm9 0a3 3 0 100 6 3 3 0 000-6zM3.75 6.75h16.126c.821 0 1.439.77 1.25 1.57l-1.5 6a1.25 1.25 0 01-1.213.93H7.048a1.25 1.25 0 01-1.213-.93L4.136 4.5"
              />
            </svg>

            {/* COUNT BADGE */}
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full bg-gray-900 text-white text-xs font-semibold">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
