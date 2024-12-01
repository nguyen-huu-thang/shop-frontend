import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Profile from '../components/profile';
import ChangePassword from '../components/changepassword';
import PurchaseHistory from '../components/purchasehistory';
import { LuUserCircle } from "react-icons/lu";
import Navbar from '../components/navbar';
const Account = () => {
  return (
    <div className='bg-gray-100'>
        <Navbar />
        <div className="flex h-screen w-4/5 px-6 pt-10 mx-20">
        {/* Left Section */}
            <div className="w-1/4 p-6 mr-6">
                <div className="flex items-center mb-8">
                    <div className="text-4xl mr-2">
                    <   LuUserCircle />
                    </div>
                    <span className="font-bold text-lg">Nguyễn Xuân An</span>
                </div>
                <hr></hr>
                <div className="flex flex-col space-y-4 pt-6">
                    <Link to="/account/profile" className="text-gray-800 text-lg font-semibold hover:bg-gray-200 p-2">Hồ sơ</Link>
                    <Link to="/account/change-password" className="text-gray-800 text-lg font-semibold hover:bg-gray-200 p-2">Đổi mật khẩu</Link>
                    <Link to="/account/purchase-history" className="text-gray-800 text-lg font-semibold hover:bg-gray-200 p-2">Lịch sử mua hàng</Link>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-3/4 bg-white">
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/purchase-history" element={<PurchaseHistory />} />
                </Routes>
            </div>
        </div>
    </div>
  );
};

export default Account;
