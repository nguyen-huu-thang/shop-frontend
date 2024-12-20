// src/components/test/orderDetail/CreateOrderDetail.js
import React, { useState } from 'react';
import orderDetailApi from '../../../api/orderDetailApi';

const CreateOrderDetail = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    productId: '',
    quantity: '',
    price: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await orderDetailApi.createOrderDetail(formData);
      setMessage(`Order detail created with ID: ${data.id}`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="orderId"
          placeholder="Order ID"
          value={formData.orderId}
          onChange={handleChange}
        />
        <input
          name="productId"
          placeholder="Product ID"
          value={formData.productId}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateOrderDetail;
