"use client"

import { CartContext } from '@/context/CartContext';
import Image from 'next/image';
import { useContext } from 'react';



export default function ProductList({ product}) {
  const { cart, addToCart } = useContext(CartContext);
    /* const [cart,setCart] = useState([]); */
    
 
    // Function to add item to cart
    /* const addToCart = (product) => { 
      setCart([...cart, product]);
    }; */
   /*  const { addToCart } = useCart();  */
    const handleAddToCart = () => {
        if (product) {
         /*  addToCart(product);  */  // Add the product to the cart
         console.log("add to cart");
         addToCart(product);
         console.log(product.name);
         
        }
      };
  return (
    <>
      <div className="product-item border p-4 mb-4">
        {/* Display Product Image */}
        <div className="product-image mb-4">
          <Image 
            src={product.image} 
            alt={product.name} 
            width={200}  
            height={300}
            priority={true}
          />
        </div>

        {/* Display Product Name */}
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

        {/* Display Product Description */}
        <p className="text-gray-700 mb-4">{product.description}</p>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart} 
          className="bg-sky-600 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>

      {/* Optional: Display cart items for debugging */}
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
  

