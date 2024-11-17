"use client"


import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useContext, useState } from 'react';



export default function ProductList({ product}) {
    const [isLoading,setIsLoading]=useState(false)
    const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity} = useContext(CartContext);
    //Check if the product is already in the cart using .filter()
    const isProductInCart = () => {
        const filteredItems = cart.filter(item => item._id === product._id);
        console.log(filteredItems.length);
        return filteredItems.length > 0;
  };  
  
   const handleAddToCart = async () => {
       if (isProductInCart()) return; // Optionally prevent action if already in cart
       setIsLoading(true);
       try {
       // Simulate an async operation like adding to cart
        await addToCart(product);
      } 
      catch (error) {
         console.error('Error adding to cart:', error);
       } finally {
           setIsLoading(false); // Reset loading state after operation completes
       }
  }; 
    
  const handleRemoveFromCart = (productId) => {
      console.log(productId);
      removeFromCart(productId);   
    }; 
  const handleincreaseQuantity= (productId)=>{
    increaseQuantity(productId)
  }
  const handledecreaseQuantity= (productId)=>{
    decreaseQuantity(productId)
  }
     
  return (
    <>
      <div className="product-item border p-4 mb-4">
        <div className="product-image mb-4">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={200}  
            height={300}
            priority={true}
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-gray-700 mb-4">{product.price}</p>
        <button 
          onClick={handleAddToCart} 
          className="bg-sky-600 text-white py-2 px-4 rounded" 
          disabled={isLoading || isProductInCart()} 
         >
          {isLoading ? 'Loading...' : isProductInCart() ? 'Already in Cart' : 'Add to Cart'} 
        </button>
        </div>

     <div className="cart mt-6">
        <h2>Cart:{cart.length}</h2>
        <ul>
        {cart.map((item, index) => (
    <li key={index}>
      <Image 
        src={item.image} 
        alt={item.name} 
        width={50}    // specify the width
        height={50}   // specify the height
        layout="intrinsic"  // or "responsive", depending on your need
      />
      <div>{item.name}</div>
      <div>{item.description}</div>
      <div>{item.price}</div>
      
      <button onClick={() => handleincreaseQuantity(item._id)}>+</button>
      <button onClick={() => handledecreaseQuantity(item._id)}>-</button>
      {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromCart(item._id)} 
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            
      </li>  
  ))}
        </ul>
        <div>
        <h3>Total Items in Cart: {cart.length}</h3>
        <h3>
          Total Price: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
        </h3>
      </div>
      </div>     
    </>
  );
}

/* const [isLoading,setIsLoading]=useState(false) */
// Check if the product is already in the cart using .filter()
 /* const isProductInCart = () => {
  const filteredItems = cart.filter(item => item._id === product._id);
  console.log(filteredItems.length);
  
  return filteredItems.length > 0;
};  */
/* disabled={isLoading || isProductInCart()} */
/* {isLoading ? 'Loading...' : isProductInCart() ? 'Already in Cart' : 'Add to Cart'}  */

