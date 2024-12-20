import React from 'react';
import CreateOrder from './CreateOrder';
import DeleteOrder from './DeleteOrder';
import GetAllOrders from './GetAllOrders';
import GetOrderById from './GetOrderById';
import UpdateOrder from './UpdateOrder';

const Order = () => {
  return (
    <div>
      <section>
        <h2>Add Order</h2>
        <CreateOrder />
      </section>

      <section>
        <h2>Get All Orders</h2>
        <GetAllOrders />
      </section>

      <section>
        <h2>Get Order By ID</h2>
        <GetOrderById />
      </section>

      <section>
        <h2>Update Order</h2>
        <UpdateOrder />
      </section>

      <section>
        <h2>Delete Order</h2>
        <DeleteOrder />
      </section>
    </div>
  );
};

export default Order;
