// src/components/test/order/CreateOrder.js
import React, { useState } from 'react';
import orderApi from '../../../api/orderApi';

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    userId: '',
    totalAmount: '',
    paymentMethod: '',
    shippingStatus: '',
    paymentStatus: '',
    shippingFee: '',
    discount: '',
    couponId: null,
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrder = await orderApi.createOrder(formData);
      setMessage(`Order created with ID ${newOrder.id}`);
    } catch (err) {
      setMessage(`Failed to create order: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
        />
        <br />
        <label>Total Amount:</label>
        <input
          type="text"
          name="totalAmount"
          value={formData.totalAmount}
          onChange={handleChange}
        />
        <br />
        <label>Payment Method:</label>
        <input
          type="text"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        />
        <br />
        <label>Shipping Status:</label>
        <input
          type="text"
          name="shippingStatus"
          value={formData.shippingStatus}
          onChange={handleChange}
        />
        <br />
        <label>Payment Status:</label>
        <input
          type="text"
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
        />
        <br />
        <label>Shipping Fee:</label>
        <input
          type="text"
          name="shippingFee"
          value={formData.shippingFee}
          onChange={handleChange}
        />
        <br />
        <label>Discount:</label>
        <input
          type="text"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
        <br />
        <label>Coupon ID:</label>
        <input
          type="text"
          name="couponId"
          value={formData.couponId || ''}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Create Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateOrder;
