import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { products } from '../product';
import Navbar from '../components/navbar';
import { LiaCartPlusSolid } from "react-icons/lia";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useSelector, useDispatch} from 'react-redux';
import { addToCart } from '../redux/cartSlice';
const Details = () => {
  const carts = useSelector((store) => store.cart.items);
  console.log(carts);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  const [notification, setNotification] = useState({ show: false, message: '' });

  if (!product) {
    return <div className="text-center text-red-500">Sản phẩm không tồn tại!</div>;
  }

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 400);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product.id,
      quantity: quantity,
    }));
    showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const handleBuyNow = () => {
    showNotification(`Bạn đã mua ngay sản phẩm: ${product.name}`);
  };

  const handleToggleFavorite = () => {
    showNotification(`${product.name} đã được thêm vào danh sách yêu thích!`);
  };

  const handleShare = () => {
    navigator.share
      ? navigator.share({
          title: product.name,
          text: `Xem sản phẩm ${product.name} với giá ${product.price}`,
          url: window.location.href,
        })
        .catch((err) => console.error('Không thể chia sẻ:', err))
      : showNotification('Tính năng chia sẻ không khả dụng trên trình duyệt của bạn.');
  };

  return (
    <div className='bg-gray-300'>
      <Navbar />
      <div className="container mx-auto p-5 bg-white mb-5 mt-3">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Hình ảnh sản phẩm */}
          <div className="flex flex-col items-center">
            <img src={product.interfaceImage} alt={product.name} className="w-full h-auto border border-2"/>
            <div className="mt-4 flex gap-3">
              <button onClick={handleShare} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Chia sẻ
              </button>
              <button onClick={handleToggleFavorite} className="flex items-center px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                <span className="text-red-500 mr-2">♥</span> Yêu thích
              </button>
            </div>
          </div>
          {/* Thông tin sản phẩm */}
          <div className="flex flex-col">
            <div>
              {/* Tên sản phẩm */}
              <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              
              {/* Khung nền cho 3 thông tin */}
              <div className="flex items-center space-x-4 mt-2">
                {/* Placeholder Số sao */}
                <div className="flex items-center">
                  <span className="bg-gray-300 w-4 h-4 rounded-full mr-1"></span>
                  <span className="bg-gray-300 w-8 h-4 rounded"></span>
                </div>
                {/* Placeholder Số đánh giá */}
                <div className="bg-gray-300 w-20 h-4 rounded"></div>
                {/* Placeholder Số lượng đã bán */}
                <div className="bg-gray-300 w-24 h-4 rounded"></div>
              </div>

              {/* Giá sản phẩm */}
              <p className="text-xl text-red-500 my-3">Giá: {product.price}đ</p>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="mt-4 flex items-center space-x-3">
              {/* Hiển thị số lượng */}
              <p className="text-gray-700">Số lượng:</p>
              <div className="flex items-center space-x-2">
                {/* Nút giảm */}
                <button onClick={decreaseQuantity} className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300">
                  -
                </button>
                {/* Hiển thị số lượng */}
                <div className="w-12 h-8 flex items-center justify-center border border-gray-400 rounded bg-white">
                  {quantity}
                </div>
                {/* Nút tăng */}
                <button onClick={increaseQuantity} className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300">
                  +
                </button>
              </div>
              {/* Số lượng sản phẩm còn lại */}
              <p className="text-gray-500 ml-4">Số lượng sản phẩm có sẵn: {product.stock}</p>
            </div>
            {/* Các nút chức năng */}
            <div className="mt-5 flex gap-2">
              <Link to="/payments">
                <button onClick={handleBuyNow} className="flex bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                <AiOutlineDollarCircle className="mr-2 text-white text-2xl"/>Mua ngay
                </button>
              </Link>
              <button onClick={handleAddToCart} className="flex bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                <LiaCartPlusSolid className="mr-2 text-white text-2xl"/>Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal thông báo */}
      {notification.show && (
        <div className="fixed inset-0 flex items-center justify-center">
          {/* Container của thông báo */}
          <div className="bg-black bg-opacity-80 rounded-lg p-5 w-1/4 h-1/4 flex flex-col items-center justify-center">
            {/* Biểu tượng tích */}
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-black">
              <span className="text-2xl font-bold">✔</span>
            </div>
            {/* Nội dung thông báo */}
            <p className="text-white text-center">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto p-5 bg-white mb-5">
        {/* Chi tiết sản phẩm */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Chi tiết sản phẩm</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Loại sản phẩm */}
            <div className="flex flex-col">
              <span className="text-gray-600">Loại sản phẩm:</span>
              <span className="font-medium text-gray-800">{product.type}</span>
            </div>
            {/* Số lượng */}
            <div className="flex flex-col">
              <span className="text-gray-600">Số lượng:</span>
              <span className="font-medium text-gray-800">{product.stock}</span>
            </div>
            {/* Xuất xứ */}
            <div className="flex flex-col">
              <span className="text-gray-600">Xuất xứ:</span>
              <span className="font-medium text-gray-800">{product.address}</span>
            </div>
            {/* Gửi từ đâu */}
            <div className="flex flex-col">
              <span className="text-gray-600">Gửi từ:</span>
              <span className="font-medium text-gray-800">{product.add}</span>
            </div>
          </div>
        </div>

        {/* Mô tả sản phẩm */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Mô tả sản phẩm</h2>
          <p className="text-gray-700 leading-6">
            {product.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto p-5 bg-white">
        {/* Đánh giá sản phẩm */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Đánh giá sản phẩm</h2>
        </div>
      </div>
    </div>
  );
};

export default Details;
