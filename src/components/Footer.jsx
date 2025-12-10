// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Import centralized site content and navigation links
import { siteInfo, navLinks } from '../data';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 text-center md:text-left">
        
        {/* 1. Brand/Copyright Section */}
        <div className="mb-4 md:mb-0">
          {/* Use siteInfo.name */}
          <p className="text-2xl font-serif font-bold text-primary mb-2">{siteInfo.name} 👑</p>
          <p className="text-sm text-gray-400">
            {/* Use siteInfo.slogan */}
            {siteInfo.slogan}
          </p>
          <p className="text-xs text-gray-500 mt-4">
            &copy; {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
          </p>
        </div>
        
        {/* 2. Navigation Links Section */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h4 className="text-lg font-semibold mb-2 text-white border-b border-primary pb-1">Quick Links</h4>
          {/* Dynamically map navLinks */}
          {navLinks.map((link) => (
            <Link 
              key={link.title}
              to={link.path} 
              className="text-sm text-gray-400 hover:text-primary transition duration-200"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* 3. Contact Info Section */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h4 className="text-lg font-semibold mb-2 text-white border-b border-primary pb-1">Contact Us</h4>
          <p className="text-sm text-gray-400">
            <span className="font-medium">Email:</span> 
            <a href={`mailto:${siteInfo.email}`} className="hover:text-primary ml-1">{siteInfo.email}</a>
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium">Phone:</span> 
            <a href={`tel:${siteInfo.phone}`} className="hover:text-primary ml-1">{siteInfo.phone}</a>
          </p>
          <p className="text-sm text-gray-400">
            <span className="font-medium">Location:</span> {siteInfo.address}
          </p>
        </div>
        
      </div>
      
      {/* Attribution Line */}
      <p className="text-xs text-gray-500 mt-10 pt-4 border-t border-gray-700 text-center">
        Powered by React & Secure Payments via Paystack.
      </p>
    </footer>
  );
};

export default Footer;