import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCart from '../components/shoppingcart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const carts = useSelector((state) => state.cart.items);
  const totalPrice = carts.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Giỏ hàng</h1>
        <Link to="/" className="text-white hover:text-gray-300">Tiếp tục mua sắm</Link>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        {carts.length > 0 ? (
          carts.map((item) => <ShoppingCart key={item.id} data={item} />)
        ) : (
          <p className="text-center text-gray-600">Giỏ hàng của bạn trống</p>
        )}
      </div>

      {/* Cart Summary */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <p className="text-lg">Tổng số lượng: {totalQuantity}</p>
          <p className="text-xl font-semibold">Tổng tiền: ${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-gray-600 px-6 py-2 rounded-md text-white hover:bg-gray-700">
            Thanh toán
          </button>
          <button className="bg-red-500 px-6 py-2 rounded-md text-white hover:bg-red-600">
            Xóa giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
