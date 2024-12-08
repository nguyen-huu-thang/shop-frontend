import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { products } from '../product';
import { changeQuantity, confirmRemoveItem, cancelRemoveItem } from '../redux/cartSlice';
import Confirm from './confirm'; // Import component xác nhận

const ShoppingCart = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState([]);
    const dispatch = useDispatch();

    // Lấy trạng thái xác nhận từ Redux
    const isConfirmingRemove = useSelector((state) => state.cart.isConfirmingRemove);
    const productToRemove = useSelector((state) => state.cart.productToRemove);

    useEffect(() => {
        const findDetail = products.find(product => product.id === productId);
        setDetail(findDetail);
    }, [productId]);

    const handleMinusQuantity = () => {
        if (quantity <= 1) {
            // Khi số lượng sản phẩm giảm xuống 0, yêu cầu xác nhận
            dispatch(changeQuantity({ productId, quantity: 0 }));  // Trigger modal
        } else {
            dispatch(changeQuantity({ productId, quantity: quantity - 1 }));
        }
    };

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({ productId, quantity: quantity + 1 }));
    };

    // Xử lý xác nhận xóa sản phẩm
    const handleConfirmRemove = () => {
        dispatch(confirmRemoveItem());
    };

    // Hủy bỏ việc xóa sản phẩm
    const handleCancelRemove = () => {
        dispatch(cancelRemoveItem());
    };

    return (
        <div>
            <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-slate-700 gap-1 rounded-md'>
                <img src={detail?.interfaceImage} alt="" className='w-12 h-12 object-cover rounded-md' />
                {/* Product Name */}
                <h3 className='text-lg font-semibold'>{detail?.name}</h3>
                {/* Quantity Control */}
                <div className='w-2/5 flex items-center justify-center gap-1'>
                    <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600 flex justify-center items-center'
                        onClick={handleMinusQuantity}
                    >
                        -
                    </button>
                    <span className='text-lg'>{quantity}</span>
                    <button
                        className='bg-gray-200 rounded-full w-6 h-6 text-cyan-600 flex justify-center items-center'
                        onClick={handlePlusQuantity}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Hiển thị Modal xác nhận khi số lượng bằng 0 */}
            {isConfirmingRemove && productId === productToRemove && (
                <Confirm
                    message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
                    onConfirm={handleConfirmRemove}
                    onCancel={handleCancelRemove}
                />
            )}
        </div>
    );
};

export default ShoppingCart;
