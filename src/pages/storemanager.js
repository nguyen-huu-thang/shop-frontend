import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ViewProduct from "../components/viewproduct";
import AddProduct from "../components/addproduct";

function StoreManager() {
  return (
    <div className="flex p-6">
      {/* Left Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100 border-r">
        <h2 className="text-2xl font-semibold mb-6">Manage Products</h2>
        <div>
          <Link to="/storemanager/view" className="block py-2 px-4 mb-2 text-left bg-gray-300 rounded hover:bg-blue-600 hover:text-white">
            View Products
          </Link>
          <Link to="/storemanager/add" className="block py-2 px-4 text-left bg-gray-300 rounded hover:bg-blue-600 hover:text-white">
            Add Product
          </Link>
        </div>
      </div>

      {/* Right Content (Switching between components) */}
      <div className="w-3/4 p-4">
        <Routes>
          <Route path="/view" element={<ViewProduct />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/" element={<h2 className="text-2xl font-semibold">Please select a product option</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default StoreManager;
