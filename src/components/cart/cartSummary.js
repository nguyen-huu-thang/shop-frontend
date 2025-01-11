import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const carts = useSelector((state) => state.cart.items);

  // Tính tổng số lượng và tổng giá trị
  const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = carts.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-5">
      <h2 className="text-xl font-bold mb-4">Tóm tắt giỏ hàng</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Tổng số lượng sản phẩm:</span>
        <span className="font-semibold">{totalQuantity}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700">Tổng giá trị:</span>
        <span className="font-semibold text-lg">
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice)}
        </span>
      </div>
    </div>
  );
};

export default CartSummary;
