"use client"
// context/CartContext.js
import React, { createContext, useState } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to provide the cart state to other components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(...cart.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Export CartContext so it can be used directly
export { CartContext };
