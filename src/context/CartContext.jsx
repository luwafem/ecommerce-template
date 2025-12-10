// src/context/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // --- Core Cart Logic Functions ---

  /**
   * Adds an item to the cart, managing variants and quantity.
   * @param {object} product - The base product data.
   * @param {string} selectedLength - The selected length variant.
   * @param {string} selectedDensity - The selected density variant.
   * @param {number} calculatedPrice - The final numeric price for this specific variant.
   * @param {number} quantity - The quantity to add (defaults to 1).
   */
  const addItem = (product, selectedLength, selectedDensity, calculatedPrice, quantity = 1) => {
    // FIX 1: Create a truly unique ID based on product ID AND selected variants
    const variantId = `${product.id}-${selectedLength}-${selectedDensity}`;

    setCartItems(prevItems => {
      // Check against the unique variantId
      const existingItemIndex = prevItems.findIndex(item => item.variantId === variantId);

      if (existingItemIndex > -1) {
        // Variant exists: update quantity
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Product is new: add to cart
        const newItem = {
          ...product,
          quantity: quantity,
          variantId: variantId, // Unique ID for variant
          // CRITICAL FIX 2: Explicitly store the calculated final price on the item
          price: calculatedPrice, 
          // Store the selected options for display on the CartPage
          selectedVariant: {
            length: selectedLength,
            density: selectedDensity,
          }
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (variantId) => {
    // We must pass the unique variantId to this function
    setCartItems(prevItems => prevItems.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId, quantity) => {
    const newQuantity = parseInt(quantity);
    
    if (isNaN(newQuantity) || newQuantity < 0) {
      return; 
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        // Use variantId for target matching
        item.variantId === variantId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const getCartTotal = () => {
    // CRITICAL FIX 3: Safety check (item.price || 0) ensures price is always a number (0 if undefined)
    return cartItems.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);
  }

  const clearCart = () => {
    setCartItems([]);
  };


  // --- Context Value ---

  const contextValue = {
    cartItems,
    addItem, // Renamed from 'addItem' in your original code to be more precise
    removeItem,
    updateQuantity,
    getCartTotal,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// --- Custom Hook for Easy Use ---

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};