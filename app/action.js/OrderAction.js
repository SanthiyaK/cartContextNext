import dbconnect from '@/db/dbconnect';
import Order from '@/model/OrderModel';
import Product from '@/model/ProductModel';
// Import Product model

// Server Action: Create a new order
export async function createOrder(orderDetails) {
  const { orderItems } = orderDetails;
  await dbconnect()
  try {
    // Create the order
    const createdOrder = await Order.create({
      orderItems
    });

    // Update the product stock after order creation
    await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        product.stock -= item.quantity;
        await product.save();
      })
    );

    return { success: true, order: createdOrder };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to create order' };
  }
}
