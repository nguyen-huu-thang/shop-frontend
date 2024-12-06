import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { products } from '../product';
import Navbar from '../components/navbar';
import { AiOutlineDollarCircle } from "react-icons/ai";
const Payments = () => {
  const carts = useSelector((state) => state.cart.items);

  // Tổng số tiền trong giỏ hàng
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <div className='flex items-center'>
          <AiOutlineDollarCircle className="mr-2 text-white text-2xl"/>
          <h1 className="text-2xl font-semibold">Thanh toán</h1>
        </div>
        <Link to="/cart" className="text-white hover:text-gray-300">Quay lại giỏ hàng</Link>
      </div>

      {/* Thông tin người mua */}
      <div className="p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Thông tin người nhận</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Họ và tên</label>
            <input type="text" id="fullName" className="mt-1 p-2 w-full border rounded-md text-gray-800" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Địa chỉ giao hàng</label>
            <input type="text" id="address" className="mt-1 p-2 w-full border rounded-md text-gray-800" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
            <input type="text" id="phone" className="mt-1 p-2 w-full border rounded-md text-gray-800" />
          </div>
        </form>
      </div>

      {/* Thông tin giỏ hàng */}
      <div className="p-4 bg-gray-100 space-y-4">
        <h2 className="text-lg font-semibold">Thông tin giỏ hàng</h2>
        <div>
        {carts.length > 0 ? (
          carts.map((item) => {
            // Tìm thông tin chi tiết sản phẩm dựa trên productId
            const productDetail = products.find((product) => product.id === item.productId);

            if (!productDetail) return null; // Nếu không tìm thấy sản phẩm trong danh sách products

            const totalPrice = productDetail.price * item.quantity; // Tính tổng giá của sản phẩm (giá * số lượng)

            return (
                <div key={item.productId} className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                  <div className="flex items-center gap-4">
                    {/* Hình ảnh sản phẩm */}
                    <img
                      src={productDetail.interfaceImage}
                      alt={productDetail.name}
                      className="w-16 h-16 object-cover"
                    />
                    {/* Tên sản phẩm và giá */}
                    <div>
                      <h3 className="font-medium">{productDetail.name}</h3>
                      <p className="text-sm text-gray-600">Giá: ${productDetail.price}</p>
                    </div>
                  </div>
                  {/* Số lượng và tổng tiền */}
                  <div className="text-lg">
                    <p>Số lượng: {item.quantity}</p>
                    <p className="font-semibold">Tổng tiền: ${totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">Giỏ hàng của bạn trống</p>
          )}
        </div>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Chọn phương thức thanh toán</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="creditCard" className="inline-flex items-center space-x-2">
              <input type="radio" id="creditCard" name="paymentMethod" className="text-blue-600" />
              <span>Thẻ tín dụng</span>
            </label>
          </div>
          <div>
            <label htmlFor="paypal" className="inline-flex items-center space-x-2">
              <input type="radio" id="paypal" name="paymentMethod" className="text-blue-600" />
              <span>PayPal</span>
            </label>
          </div>
          <div>
            <label htmlFor="cashOnDelivery" className="inline-flex items-center space-x-2">
              <input type="radio" id="cashOnDelivery" name="paymentMethod" className="text-blue-600" />
              <span>Thanh toán khi nhận hàng</span>
            </label>
          </div>
        </div>
      </div>

      {/* Tổng tiền và nút thanh toán */}
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <p className="text-lg">Tổng tiền: ${totalPrice.toFixed(2)}</p>
        </div>
        <button className="bg-green-500 px-8 py-2 rounded-md hover:bg-green-600">Xác nhận thanh toán</button>
      </div>
    </div>
    </div>
    
  );
};

export default Payments;
