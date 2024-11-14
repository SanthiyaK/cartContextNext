"use server"

import dbconnect from "@/db/dbconnect";
import Product from "@/model/ProductModel";

export async function fetchProducts() {
    try {
      await dbconnect();  // Ensure DB is connected
      
      // Use lean() to return plain JavaScript objects instead of Mongoose documents
      const products = await Product.find(); // .lean() returns plain objects
      /* const serializedProducts = products.map(product => {
       // Convert _id to string
       if (product._id) {
         product._id = product._id.toString();  // Convert ObjectId to string
       }
 
       // You can add more conversions for other fields if necessary
       return product;
     }); */
     const serializedProducts = products.map(product => {
      return {
        _id: product._id.toString(),  // Convert MongoDB ObjectId to string
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image.toString(),  // If image is a Buffer, convert to string (or URL)
        category: product.category,
        stock: product.stock,
      };
    });
     return serializedProducts; 
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error('Unable to fetch products');
    }
  }
 