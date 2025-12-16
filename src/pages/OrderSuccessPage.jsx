// src/pages/OrderSuccessPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* ============================
          Success Notice
      ============================ */}
      <div className="border-l-4 border-green-500 bg-green-50 p-6 mb-8 rounded-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          Order received
        </h1>
        <p className="text-sm text-gray-700">
          Thank you. Your order has been received and is now being processed.
        </p>
      </div>

      {/* ============================
          Order Details Box
      ============================ */}
      <div className="bg-white border border-gray-200 rounded-md p-8 space-y-6">
        <p className="text-gray-700">
          A confirmation email containing your order details has been sent to your
          email address.
        </p>

        <p className="text-gray-700">
          If you have any questions about your order, please contact our support
          team.
        </p>

        {/* ============================
            Actions
        ============================ */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <Link
            to="/shop"
            className="inline-flex justify-center items-center px-6 py-3 bg-primary text-white text-sm font-semibold rounded-md hover:bg-primary/90 transition"
          >
            Continue shopping
          </Link>

          <Link
            to="/"
            className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-sm font-semibold text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
