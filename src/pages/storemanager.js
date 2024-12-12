import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ViewProduct from "../components/viewproduct";
import AddProduct from "../components/addproduct";
import Logo from "../assets/logo1.png";

function StoreManager() {
  return (
    <div>
      {/* Navbar */}
      <nav className="w-full h-24 sticky top-0 bg-white text-black z-50 shadow-lg flex justify-content-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-24 h-auto max-w-full" />
          </Link>
          <h1 className="text-2xl">Kênh Người Bán</h1>
        </div>

        {/* Links */}
        <div className="flex space-x-4 h-full items-center">
          <Link to="/" className="hover:text-gray-400 text-2xl px-4 transition-colors duration-200">
            Về Trang Chủ
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex p-6">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gray-300 border-r">
          <h2 className="text-2xl font-semibold mb-6">Quản lý gian hàng</h2>
          <div>
            <Link
              to="/storemanager/view"
              className="block py-2 px-4 mb-2 text-left bg-gray-400 rounded hover:bg-blue-600 hover:text-white"
            >
              Danh sách sản phẩm
            </Link>
            <Link
              to="/storemanager/add"
              className="block py-2 px-4 text-left bg-gray-400 rounded hover:bg-blue-600 hover:text-white"
            >
              Thêm sản phẩm
            </Link>
          </div>
        </div>

        {/* Routes */}
        <div className="w-3/4 p-4">
          <Routes>
            <Route path="/view" element={<ViewProduct />} />
            <Route path="/add" element={<AddProduct />} />
            <Route
              path="/"
              element={
                <h2 className="text-2xl font-semibold">Lựa chọn nội dung</h2>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default StoreManager;
