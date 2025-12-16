// src/context/ToastContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  // toast = { message, type: 'success' | 'error' }

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });

    // Auto dismiss (WooCommerce-like delay)
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};

/* ===========================
   WooCommerce-Style Toast UI
=========================== */

const Toast = ({ message, type, onDismiss }) => {
  const isSuccess = type === 'success';

  return (
    <div className="fixed top-24 right-4 z-50 max-w-sm w-full">
      <div
        className={`
          relative flex items-start gap-3
          bg-white border border-gray-200
          rounded-md shadow-sm
          px-4 py-3 text-sm text-gray-800
          ${isSuccess ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}
        `}
      >
        {/* Icon */}
        <span
          className={`mt-0.5 ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </span>

        {/* Message */}
        <p className="flex-1 leading-relaxed">
          {message}
        </p>

        {/* Close */}
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Dismiss notification"
        >
          ×
        </button>
      </div>
    </div>
  );
};
