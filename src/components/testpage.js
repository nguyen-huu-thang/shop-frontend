import React, { useState, useEffect } from "react";
import Logo from '../assets/logo1.png';
import { MdSearch } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import ShoppingCart from "./shoppingcart";
import { CiMenuBurger } from "react-icons/ci";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

function Testpage() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const carts = useSelector(store => store.cart.items);
    const [searchSidebarOpen, setSearchSidebarOpen] = useState(false);
    useEffect(() => {
        setTotalQuantity(carts.reduce((total, item) => total + item.quantity, 0));
    }, [carts]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleCategory = () => {
        setIsCategoryOpen(!isCategoryOpen);
    };

    const toggleSearchSidebar = () => setSearchSidebarOpen(!searchSidebarOpen);
    return (
        <div className="w-full h-24 sticky top-0 bg-white text-black z-50 shadow-lg">
            <div className="flex justify-between items-center px-12 h-full">
                {/* Menu icon for small screens */}
                <button
                    className="lg:hidden text-black"
                    onClick={toggleMenu}
                >
                    <CiMenuBurger size={30} />
                </button>

                {/* Logo - Centered on small screens */}
                <div className="flex justify-center lg:justify-start">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="w-24 h-auto max-w-full" />
                    </Link>
                </div>

                {/* Left side menu (Home, Danh mục, etc.) */}
                <div className="flex items-center space-x-10 lg:flex hidden">
                    <a href="/" className="text-lg hover:text-gray-300">Home</a>
                    <div className="relative group">
                        <a href="/" className="text-lg hover:text-gray-300">Danh mục</a>
                        {/* Dropdown */}
                        <div className="hidden group-hover:block absolute top-[60%] left-0 w-80 bg-white border border-gray-300 mt-2 shadow-lg">
                            {[
                                { name: "Thời trang", path: "fashion" },
                                { name: "Giày dép - Túi sách", path: "Giày dép - Túi sách" },
                                { name: "Điện tử - Công nghệ", path: "Điện tử - Công nghệ" },
                                { name: "Sức khỏe - Làm đẹp", path: "Sức khỏe - Làm đẹp" },
                                { name: "Đồ gia dụng", path: "Đồ gia dụng" },
                                { name: "Đồ trang trí", path: "Đồ trang trí" },
                                { name: "Mẹ và bé", path: "Mẹ và bé" },
                                { name: "Sách - Văn phòng phẩm", path: "Sách - Văn phòng phẩm" },
                            ].map((item, idx) => (
                                <Link key={idx} to={`/category/${item.path}`} className="block px-4 py-2 hover:bg-gray-600 hover:text-gray-100">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <a href="/" className="text-lg hover:text-gray-300">Giá ưu đãi</a>
                    <a href="/" className="text-lg hover:text-gray-300">Sản phẩm bán chạy</a>
                </div>

                {/* Right side icons (Search, Heart, Cart, User) */}
                <div className="flex items-center space-x-6">
                    {/* Search */}
                    <button className="lg:hidden text-xl cursor-pointer" onClick={toggleSearchSidebar}>
                        <MdSearch />
                    </button>
                    <div className="relative hidden lg:block">
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-80 h-10 px-4 pr-10 rounded-full border border-gray-400 focus:border-gray-300 focus:outline-none"
                        />
                        <MdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                    </div>

                    {/* Heart (Favorites) */}
                    <Link to="/love">
                        <div className="text-xl cursor-pointer">
                            <CiHeart />
                        </div>
                    </Link>

                    {/* Cart */}
                    <div className="relative">
                        <div className="flex text-xl cursor-pointer" onClick={() => setSidebarVisible(true)}>
                            <CiShoppingCart size={25} color="black"/>
                            <span className="absolute h-4 w-4 left-4 top-[-20%] bg-gray-600 text-white text-sm rounded-full flex justify-center items-center ">{totalQuantity}</span>
                        </div>
                        {sidebarVisible && (
                            <>
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={() => setSidebarVisible(false)}></div>
                                <div className="fixed top-0 right-0 h-full w-[300px] lg:w-[350px] bg-gray-900 text-white z-50 shadow-lg p-4">
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

                    {/* User Login */}
                    <Link to="/login">
                        <div className="text-xl cursor-pointer">
                            <AiOutlineUser />
                        </div>
                    </Link>
                </div>
            </div>

            {/* Sidebar menu (menu that slides in from the right) */}
            {isMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={closeMenu}></div>
                    <div className="fixed top-0 left-0 w-2/5 h-full bg-white text-black z-50 shadow-lg p-4 transform transition-transform duration-300 ease-in-out" style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                        <button className="absolute top-4 right-4 text-black text-xl" onClick={closeMenu}>X</button>
                        {/* Menu Header */}
                        <div className="text-xl font-semibold mb-2">Menu</div>
                        <hr className="border-gray-400 mb-4" />

                        {/* Menu Items */}
                        <div className="space-y-6">
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Home</a>
                            </div>
                            {/* Category with dropdown */}
                            <div>
                                <div 
                                    className="flex items-center justify-between text-lg cursor-pointer hover:text-gray-300" 
                                    onClick={toggleCategory}
                                >
                                    <span>Danh mục</span>
                                    {isCategoryOpen ? (
                                        <BsChevronDown size={20} />
                                    ) : (
                                        <BsChevronRight size={20} />
                                    )}
                                </div>
                                {isCategoryOpen && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        <Link to="/category/fashion" className="block text-gray-600 hover:text-gray-800">Thời trang</Link>
                                        <Link to="/category/shoes" className="block text-gray-600 hover:text-gray-800">Giày dép - Túi sách</Link>
                                        <Link to="/category/electronics" className="block text-gray-600 hover:text-gray-800">Điện tử</Link>
                                        <Link to="/category/beauty" className="block text-gray-600 hover:text-gray-800">Sức khỏe - Làm đẹp</Link>
                                    </div>
                                )}
                            </div>
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Giá ưu đãi</a>
                            </div>
                            <div>
                                <a href="/" className="text-lg hover:text-gray-300">Sản phẩm bán chạy</a>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {searchSidebarOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 h-full" onClick={toggleSearchSidebar}></div>
                    <div className="fixed top-0 right-0 w-2/5 h-full bg-white text-black z-50 shadow-lg p-4 transform transition-transform duration-300 ease-in-out" style={{ transform: searchSidebarOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="w-full h-10 px-4 rounded-full border border-gray-400 focus:border-gray-300 focus:outline-none"
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Testpage;
