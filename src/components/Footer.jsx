// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { siteInfo, navLinks } from '../data';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 ">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm text-gray-700">

        {/* BRAND / ABOUT */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            {siteInfo.name}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {siteInfo.slogan}
          </p>
        </div>

        {/* SHOP LINKS */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            Shop
          </h4>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
                  to={link.path}
                  className="hover:text-gray-900 transition"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            Customer Service
          </h4>
          <ul className="space-y-2">
            <li>Delivery & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            Contact
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href={`mailto:${siteInfo.email}`}
                className="hover:text-gray-900 transition"
              >
                {siteInfo.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteInfo.phone}`}
                className="hover:text-gray-900 transition"
              >
                {siteInfo.phone}
              </a>
            </li>
            <li className="text-gray-600">
              {siteInfo.address}
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.  
        <span className="block mt-1">
          Powered by SWIFT90
        </span>
      </div>
    </footer>
  );
};

export default Footer;
