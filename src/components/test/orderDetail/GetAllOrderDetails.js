// src/components/test/orderDetail/GetAllOrderDetails.js
import React, { useEffect, useState } from 'react';
import orderDetailApi from '../../../api/orderDetailApi';

const GetAllOrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await orderDetailApi.getAllOrderDetails();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <ul>
        {orderDetails.map((detail) => (
          <li key={detail.id}>
            Order ID: {detail.orderId}, Product ID: {detail.productId}, Quantity: {detail.quantity}, Price: {detail.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllOrderDetails;
