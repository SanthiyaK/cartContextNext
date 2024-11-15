"use client"


import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useContext } from 'react';



export default function ProductList({ product}) {
   const { cart,addToCart,removeFromCart } = useContext(CartContext);  
   /* const [cart,setCart]=useState([])
  const addToCart = (product) => { 
    setCart([...cart,product])
  };    */

  const handleAddToCart = () => {
      if (product) {
       addToCart(product);  
      }
    };
    const handleRemoveFromCart = (productId) => {
      console.log(productId);
      removeFromCart(productId);  
      
      
    }; 
     
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
        <button  onClick={handleAddToCart}  className="bg-sky-600 text-white py-2 px-4 rounded">
          Add to Cart
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
  

