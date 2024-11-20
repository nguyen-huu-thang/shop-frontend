import Logo from '../../assets/images/logo1.png';
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import { CiShoppingCart } from "react-icons/ci";

function Navbar(props) {
    return (
        <Navigation>
            <div className='navContainer'>
                <div className='logo'>
                    <img src={Logo} alt="Logo" />
                </div>
                <div className='navSearch'>
                    <div className='searchIcon'>
                        <MdSearch />
                    </div>
                    <input type="text" placeholder="Search" />
                </div>
                <div className='navCart'>
                    <CiShoppingCart />
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
    .navContainer {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: var(--color-navigation);

        .logo {
            margin : 0;
            width: 100px;
            cursor: pointer;
            img {
                width: 100%;
                height: auto;
            }
        }
    }

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
    }
`;