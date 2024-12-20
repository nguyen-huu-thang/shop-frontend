// src/components/test/orderDetail/UpdateOrderDetail.js
import React, { useState } from 'react';
import orderDetailApi from '../../../api/orderDetailApi';

const UpdateOrderDetail = () => {
  const [id, setId] = useState('');
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await orderDetailApi.updateOrderDetail(id, formData);
      setMessage(`Order detail with ID: ${data.id} updated successfully`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID to update"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateOrderDetail;
