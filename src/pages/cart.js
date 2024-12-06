import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { products } from '../product';
import Navbar from '../components/navbar';
import { CiShoppingCart } from "react-icons/ci";
import { changeQuantity, cancelRemoveItem, confirmRemoveItem } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import Confirm from '../components/confirm';

const Cart = () => {
  const carts = useSelector((state) => state.cart.items);
  const isConfirmingRemove = useSelector((state) => state.cart.isConfirmingRemove);
  const productToRemove = useSelector((state) => state.cart.productToRemove);
  const dispatch = useDispatch();
  
  const totalPrice = carts.reduce((total, item) => {
    const productDetail = products.find(product => product.id === item.productId);
    if (!productDetail) {
      console.log("Không tìm thấy chi tiết sản phẩm cho productId:", item.productId);
      return total;
    }
    const price = parseFloat(productDetail.price);
    const quantity = parseInt(item.quantity, 10);

    if (isNaN(price) || isNaN(quantity)) {
      return total;
    }

    return total + price * quantity;
  }, 0);

  // Hàm xử lý xác nhận xóa sản phẩm
  const handleConfirmRemove = () => {
    dispatch(confirmRemoveItem());
  };

  // Hàm hủy bỏ xóa sản phẩm
  const handleCancelRemove = () => {
    dispatch(cancelRemoveItem());
  };

  // Hàm xóa sản phẩm
  const handleRemoveItem = (productId) => {
    dispatch(changeQuantity({ productId, quantity: 0 })); // Truyền số lượng 0 để trigger modal xác nhận
  };

  const handleMinusQuantity = (productId, quantity) => {
    dispatch(changeQuantity({
      productId: productId,
      quantity: quantity - 1
    }));
  };

  const handlePlusQuantity = (productId, quantity) => {
    dispatch(changeQuantity({
      productId: productId,
      quantity: quantity + 1
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-blue-700 text-white p-4 flex items-center">
          <CiShoppingCart size={40} className='mr-2 text-white text-2xl'/>
          <h1 className="text-2xl font-semibold">Giỏ hàng</h1>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 bg-gray-50 p-10 overflow-y-auto">
          {carts.length > 0 ? (
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Tên sản phẩm</th>
                  <th className="px-4 py-2">Giá</th>
                  <th className="px-4 py-2">Số lượng</th>
                  <th className="px-4 py-2">Tổng tiền</th>
                  <th className="px-4 py-2">Thao tác</th>
                </tr>
              </thead>
              <br></br>
              <tbody className='border border-1'>
                {carts.map((item) => {
                  const product = products.find((product) => product.id === item.productId);
                  if (product) {
                    const totalPrice = product.price * item.quantity;
                    return (
                      <tr key={item.productId} className="border-b">
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">{product.price} $</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center space-x-2">
                            {/* Nút giảm */}
                            <button className="w-10 h-10 text-xl text-center border border-gray-300 rounded-lg hover:bg-gray-200" onClick={() => handleMinusQuantity(item.productId, item.quantity)}>
                              -
                            </button>
                            {/* Ô nhập liệu số lượng */}
                            <input
                              type="text"
                              value={item.quantity}
                              className="w-12 h-12 text-center border border-gray-300 rounded-lg"
                              readOnly
                            />
                            {/* Nút tăng */}
                            <button className="w-10 h-10 text-xl text-center border border-gray-300 rounded-lg hover:bg-gray-200" onClick={() => handlePlusQuantity(item.productId, item.quantity)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2">{totalPrice} $</td>
                        <td className="px-4 py-2">
                          <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveItem(item.productId)}>
                            Xoá
                          </button>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">Giỏ hàng của bạn trống</p>
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div>
            <p className="text-xl font-semibold">Tổng tiền: ${totalPrice}</p>
          </div>
          <div className="flex gap-4">
            <Link to="/payments">
              <button className="bg-gray-600 px-6 py-2 rounded-md text-white hover:bg-gray-700">
                Thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hiển thị Modal xác nhận */}
      {isConfirmingRemove && (
        <Confirm 
          message="Bạn có chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?" 
          onConfirm={handleConfirmRemove} 
          onCancel={handleCancelRemove} 
        />
      )}
    </div>
  );
};

export default Cart;
