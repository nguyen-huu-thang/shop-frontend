import React, { useState, useEffect } from "react";
import Logo from '../assets/logo1.png';
import { MdSearch } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import ShoppingCart from "./shoppingcart";
function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    useEffect(() => {
        setTotalQuantity(carts.reduce((total, item) => total + item.quantity, 0));
    }, [carts]);
    return (
        <div className="w-full h-24 sticky top-0 bg-white text-black z-50 shadow-lg">
            <div className="flex justify-between items-center px-12 h-full">
                {/* Logo */}
                <div className="w-24 cursor-pointer">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-full h-auto" />
                    </Link>
                </div>

                {/* Links */}
                <div className="flex items-center space-x-12">
                    <a href="/" className="text-lg hover:text-gray-300">Home</a>
                    <div className="relative group ">
                        <a href="/" className="text-lg hover:text-gray-300 ">Danh mục</a>
                        {/* Dropdown */}
                        <div className="hidden group-hover:block absolute top-[60%] left-0 w-80 bg-white border border-gray-300 mt-2 shadow-lg">
                        {["Thời trang", "Giày dép - Túi sách", "Điện tử - Công nghệ", 
                            "Sức khỏe - Làm đẹp", "Đồ gia dụng", "Đồ trang trí", 
                            "Mẹ và bé", "Sách - Văn phòng phẩm"].map((item, idx) => (
                            <a key={idx} href="/" className="block px-4 py-2 hover:bg-gray-600 hover:text-gray-100">
                                {item}
                            </a>
                        ))}
                        </div>
                    </div>
                    <a href="/" className="text-lg hover:text-gray-300">Giá ưu đãi</a>
                    <a href="/" className="text-lg hover:text-gray-300">Sản phẩm bán chạy</a>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-80 h-10 px-4 pr-10 rounded-full border border-gray-400 focus:border-gray-300 focus:outline-none"
                        />
                        <MdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    </div>
                    <div className="text-xl cursor-pointer">
                        <CiHeart />
                    </div>
                    <div className="relative">
                        <div className="flex text-xl cursor-pointer" onClick={() => setSidebarVisible(true)}>
                            <CiShoppingCart size={25} color="black"/>
                            <span className="absolute h-4 w-4 left-4 top-[-20%] bg-gray-600 text-white text-sm rounded-full flex justify-center items-center ">{totalQuantity}</span>
                        </div>
                        {sidebarVisible && (
                            <>
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={() => setSidebarVisible(false)}></div>
                                <div className="fixed top-0 right-0 w-1/5 h-full bg-gray-900 text-white z-50 shadow-lg p-4">
                                    <button className="absolute top-4 right-4 text-white text-xl" onClick={() => setSidebarVisible(false)}>X</button>
                                    <h3 className="text-xl border-b border-gray-700 pb-2">Giỏ hàng của bạn</h3>
                                    <p className="mt-4 text-gray-400">Danh sách sản phẩm</p>
                                    <div className="grid grid-rows p-1 gap-1">
                                        {carts.map((item, key) => <ShoppingCart key={key} data={item}/>)}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 absolute bottom-10 left-0 w-full p-4">
                                        <Link to="/cart">
                                            <button className="bg-red-500 text-white py-2 px-2 rounded-md w-full">Xem giỏ hàng</button>
                                        </Link>
                                        <Link to="/payments">
                                            <button className="bg-red-500 text-white py-2 px-2 rounded-md w-full">Thanh toán</button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <Link to="/login">
                        <div className="text-xl cursor-pointer">
                            <AiOutlineUser />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;