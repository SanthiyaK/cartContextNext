import mongoose from 'mongoose';

// Define the order item schema
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',  // Reference to the Product model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Define the order schema, which will contain an array of order items
const cartSchema = new mongoose.Schema({
  orderItems: [orderItemSchema], // Array of order items
  totalAmount: {
    type: Number,
    required: true
  },
  // You can add additional fields here like shipping information, user ID, etc.
}, { timestamps: true });

// Create the Order model
const CartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default CartModel;
