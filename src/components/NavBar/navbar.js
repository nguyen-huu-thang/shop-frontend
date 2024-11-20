import Logo from '../../assets/images/logo1.png';
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import React, { useState } from "react";

function Navbar(props) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    return (
        <Navigation>
            <div className='navContainer'>
                <div className='logo'>
                    <img src={Logo} alt="Logo" />
                </div>
                <div className='navLinks'>
                    <div className='dropdown'>
                        <a href="/">Danh mục</a>
                        <div className='dropdownMenu'>
                            <a href="/">Thời trang</a>
                            <a href="/">Giày dép - Túi sách</a>
                            <a href="/">Điện tử - Công nghệ</a>
                            <a href="/">Sức khỏe - Làm đẹp</a>
                            <a href="/">Đồ gia dụng</a>
                            <a href="/">Đồ trang trí</a>
                            <a href="/">Mẹ và bé</a>
                            <a href="/">Sách - Văn phòng phẩm</a>
                        </div>
                    </div>
                    <a href="/">Giá ưu đãi</a>
                    <a href="/">Sản phẩm bán chạy</a>
                </div>
                <div className='navMenu'>
                    <div className='navSearch'>
                        <div className='searchIcon'>
                            <MdSearch />
                        </div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className='navCart' onClick={() => setSidebarVisible(true)}>
                        <CiShoppingCart />
                        {sidebarVisible && (
                            <>
                                <div className='overlay' onClick={() => setSidebarVisible(false)}></div>
                                <div className='sidebar'>
                                    <h3>Giỏ hàng của bạn</h3>
                                    <p>Danh sách sản phẩm...</p>
                                </div>
                            </>
                        )}
                    </div>
                    <div className='navAccount'>
                        <AiOutlineUser />
                    </div>
                </div>
            </div>
        </Navigation>
    )
}

export default Navbar;

const Navigation = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    background-color: var(--color-navigation);
    .navContainer {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding : 0px 50px 0px 50px;

        .logo {
            margin : 0;
            width: 100px;
            cursor: pointer;
            img {
                width: 100%;
                height: auto;
            }
        }
    
        .navLinks {
            margin: 0px 200px 0px 100px;
            display: flex;
            align-items: center;

            .dropdown {
                position: relative;
                display: inline-block;
            
                a {
                    margin-right: 20px;
                    color: var(--color-icon);
                    text-decoration: none;
                    font-size: 20px;
                    &:hover {
                        color: var(--color-text);
                    }
                }

                .dropdownMenu {
                    width: 30rem;
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background-color: var(--color-navigation);
                    border: 1px solid var(--color-navigation);
                    border-radius: 1px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 10;

                    a {
                        display: block;
                        padding: 10px 20px;
                        color: var(--color-icon);
                        text-decoration: none;
                        font-size: 18px;

                        &:hover {
                            background-color: var(--color-navigation);
                            color: var(--color-text);
                        }
                    }
                }

                &:hover .dropdownMenu {
                    display: block;
                }
            }

            a {
                margin-right: 20px;
                color: var(--color-icon);
                text-decoration: none;
                font-size: 20px;
                &:hover {
                    color: var(--color-text);
                }
            }
        }

        .navMenu {
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .navSearch {
                display: flex;
                align-items: center;
                position: relative;
                margin-left: 0px;

                .searchIcon {
                    position: absolute;
                    right: 10px;
                    top: 55%;
                    transform: translateY(-50%);
                    color: var(--color-icon); /* Màu của icon */
                    font-size: 20px;
                }

                input {
                    width: 400px;
                    height: 40px;
                    padding: 0 30px 0 20px; /* Đệm để tránh icon */
                    border: 1px solid #ccc;
                    border-radius: 20px;
                    font-size: 16px;
                    outline: none;
                    transition: all 0.3s ease;

                    &:focus {
                        border-color: #555; /* Đổi màu viền khi focus */
                        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    }
                }
            }

            .navCart {
                margin-left: 20px;
                font-size: 20px;
                color: var(--color-icon);
                cursor: pointer;
                
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 80%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5); /* Độ mờ */
                    z-index: 100; /* Đặt lớp phủ lên trên */
                    cursor: pointer;
                }   

                .sidebar {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 20%; /* Độ rộng sidebar */
                    height: 100%;
                    background: black;
                    z-index: 101; /* Trên overlay */
                    padding: 20px;
                    box-shadow: -4px 0px 6px rgba(0, 0, 0, 0.1);
                    transform: translateX(100%); /* Ban đầu ẩn ngoài màn hình */
                    transition: transform 0.3s ease; /* Hiệu ứng trượt */
                }

                .sidebar h3 {
                    margin: 0;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ccc;
                    color: var(--color-text);
                }

                .sidebar p {
                    margin: 10px 0;
                    color: var(--color-icon);
                }

                .sidebarVisible .sidebar {
                    transform: translateX(0); /* Trượt vào màn hình */
                }
            }

            .navAccount {
                margin-left: 20px;
                font-size: 20px;
                color: var(--color-icon);
                cursor: pointer;
            }
        }
    }
    
`;