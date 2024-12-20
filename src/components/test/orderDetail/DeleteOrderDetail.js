// src/components/test/orderDetail/DeleteOrderDetail.js
import React, { useState } from 'react';
import orderDetailApi from '../../../api/orderDetailApi';

const DeleteOrderDetail = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState(null);

  const handleDelete = async () => {
    try {
      const data = await orderDetailApi.deleteOrderDetail(id);
      setMessage(data.message || `Order detail with ID: ${id} deleted successfully`);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID to delete"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteOrderDetail;
