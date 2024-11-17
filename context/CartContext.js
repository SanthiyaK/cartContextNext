"use client" // Ensure this runs only on the client

import React, { createContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to provide the cart state to other components
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load the cart from localStorage when the component is mounted on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  // Add product to cart and save to localStorage
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Remove product from cart by id and update localStorage
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    // Save the updated cart to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Decrease product quantity
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,increaseQuantity,decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Export CartContext so it can be used directly
export { CartContext };
