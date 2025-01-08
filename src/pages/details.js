import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { LiaCartPlusSolid } from "react-icons/lia";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToLove, removeFromLove } from '../redux/loveSlice';
import productApi from '../api/productApi';
import GetInterfaceProduct from '../components/storemanager/getInterfaceProduct';
const Details = () => {
  const carts = useSelector((store) => store.cart.items);
  const lovedItems = useSelector((store) => store.love.items);
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null); // Trạng thái lưu thông tin sản phẩm
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
  const [notification, setNotification] = useState({ show: false, message: '' });

  const { id } = useParams(); // Lấy id từ URL

  // Lấy thông tin sản phẩm từ API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProductById(id); // API lấy sản phẩm theo id
        setProduct(response); // Lưu thông tin sản phẩm
      } catch (error) {
        setError("Không thể tải thông tin sản phẩm.");
      } finally {
        setLoading(false); // Hoàn tất tải dữ liệu
      }
    };

    fetchProduct();
  }, [id]);

  // Xử lý số lượng sản phẩm
  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // Thông báo
  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 400);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: product.id,
      quantity: quantity,
    }));
    showNotification(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  // Xử lý mua ngay
  const handleBuyNow = () => {
    showNotification(`Bạn đã mua ngay sản phẩm: ${product.name}`);
  };

  // Xử lý thêm / xóa khỏi yêu thích
  const handleToggleFavorite = () => {
    const isFavorite = lovedItems.findIndex(item => item.productId === product.id) !== -1;

    if (isFavorite) {
      dispatch(removeFromLove({ productId: product.id }));
      showNotification(`${product.name} đã được xóa khỏi yêu thích!`);
    } else {
      dispatch(addToLove({ productId: product.id }));
      showNotification(`${product.name} đã được thêm vào yêu thích!`);
    }
  };

  // Xử lý chia sẻ
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

  // Hiển thị khi đang tải
  if (loading) {
    return <div className="text-center text-gray-500">Đang tải thông tin sản phẩm...</div>;
  }

  // Hiển thị lỗi
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Hiển thị nếu không tìm thấy sản phẩm
  if (!product) {
    return <div className="text-center text-red-500">Sản phẩm không tồn tại!</div>;
  }

  return (
    <div className='bg-gray-300'>
      <Navbar />
      <div className="container mx-auto p-5 bg-white mb-5 mt-3">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Hình ảnh sản phẩm */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square overflow-hidden flex items-center justify-center bg-gray-100">
              <GetInterfaceProduct productId={id} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleShare} className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Chia sẻ
              </button>
              <button 
                onClick={handleToggleFavorite} 
                className={`flex items-center px-4 py-2 rounded-lg border transition ${lovedItems.findIndex(item => item.productId === product.id) !== -1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                <span className={`mr-2 ${lovedItems.findIndex(item => item.productId === product.id) !== -1 ? 'text-white' : 'text-red-500'}`}>♥</span>
                Yêu thích
              </button>
            </div>
          </div>
          {/* Thông tin sản phẩm */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-xl text-red-500 my-3">Giá: {new Intl.NumberFormat('vi-VN').format(product.price)}đ</p>
            <p className="text-gray-700">{product.description}</p>
            <div className="mt-4 flex items-center space-x-3">
              <p className="text-gray-700">Số lượng:</p>
              <div className="flex items-center space-x-2">
                <button onClick={decreaseQuantity} className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300">
                  -
                </button>
                <div className="w-12 h-8 flex items-center justify-center border border-gray-400 rounded bg-white">
                  {quantity}
                </div>
                <button onClick={increaseQuantity} className="w-8 h-8 bg-gray-200 border border-gray-400 text-gray-600 rounded flex items-center justify-center hover:bg-gray-300">
                  +
                </button>
              </div>
              <p className="text-gray-500 ml-4">Số lượng sản phẩm có sẵn: {product.stock}</p>
            </div>
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

      {notification.show && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-80 rounded-lg p-5 w-1/4 h-1/4 flex flex-col items-center justify-center">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-black">
              <span className="text-2xl font-bold">✔</span>
            </div>
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
