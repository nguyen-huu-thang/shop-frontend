import React from 'react';
import CreateOrderDetail from './CreateOrderDetail';
import DeleteOrderDetail from './DeleteOrderDetail';
import GetAllOrderDetails from './GetAllOrderDetails';
import GetOrderDetailById from './GetOrderDetailById';
import UpdateOrderDetail from './UpdateOrderDetail';

const OrderDetail = () => {
  return (
    <div>
      <section>
        <h2>Add Order Detail</h2>
        <CreateOrderDetail />
      </section>

      <section>
        <h2>Get All Order Details</h2>
        <GetAllOrderDetails />
      </section>

      <section>
        <h2>Get Order Detail By ID</h2>
        <GetOrderDetailById />
      </section>

      <section>
        <h2>Update Order Detail</h2>
        <UpdateOrderDetail />
      </section>

      <section>
        <h2>Delete Order Detail</h2>
        <DeleteOrderDetail />
      </section>
    </div>
  );
};

export default OrderDetail;
