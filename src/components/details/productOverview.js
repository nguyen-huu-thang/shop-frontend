import React from "react";
import GetInterfaceProduct from "../storemanager/getInterfaceProduct";
const ProductOverview = ({ product, quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Hình ảnh sản phẩm */}
      <div className="flex flex-col items-center">
        <div className="w-full aspect-square overflow-hidden flex items-center justify-center bg-gray-100">
            <GetInterfaceProduct productId={product.id} className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-xl text-red-500 my-3">
          Giá: {new Intl.NumberFormat("vi-VN").format(product.price)}đ
        </p>
        <p className="text-gray-700">{product.description}</p>

        {/* Số lượng sản phẩm */}
        <div className="mt-4 flex items-center space-x-3">
          <p className="text-gray-700">Số lượng:</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={decreaseQuantity}
              className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300"
              disabled={quantity <= 1}
            >
              -
            </button>
            <div className="w-12 h-8 flex items-center justify-center border border-gray-400 rounded bg-white">
              {quantity}
            </div>
            <button
              onClick={increaseQuantity}
              className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
          <p className="text-gray-500 ml-4">Số lượng có sẵn: {product.stock}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
