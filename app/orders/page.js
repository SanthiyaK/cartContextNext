"use client"
import { createOrder } from '@/app/action.js/OrderAction';
import { useState } from 'react';

export default function OrderForm({ cartItems }) {
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmitOrder = async () => {
    setIsLoading(true);
    setOrderStatus(null);
    setErrorMessage(null);

    const orderDetails = {
      orderItems: cartItems.map(item => ({
        product: item.product, // Ensure this is an ObjectId or a valid reference
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        image: item.image
      })),
      totalAmount: cartItems.reduce((total, item) => total + (item.quantity * item.price), 0)
    };

    try {
      const result = await createOrder(orderDetails);
      if (result.success) {
        setOrderStatus('Order successfully created!');
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Error creating order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="order-form p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      
      <div className="cart-items mb-4">
        {cartItems.map(item => (
          <div key={item.product} className="cart-item flex justify-between mb-2">
            <span>{item.name}</span>
            <span>{item.quantity} x ${item.price}</span>
          </div>
        ))}
      </div>

      <div className="total mb-4">
        <strong>Total: ${cartItems.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}</strong>
      </div>

      <button
        onClick={handleSubmitOrder}
        disabled={isLoading}
        className={`submit-order-btn ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white'} px-6 py-2 rounded-md`}
      >
        {isLoading ? 'Submitting...' : 'Submit Order'}
      </button>

      {orderStatus && (
        <p className="order-status text-green-600 mt-4">{orderStatus}</p>
      )}

      {errorMessage && (
        <p className="error-message text-red-600 mt-4">{errorMessage}</p>
      )}
    </div>
  );
}
