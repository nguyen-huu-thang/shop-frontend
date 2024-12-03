import React, {useState, useEffect} from 'react'
import { products } from '../product';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../redux/cartSlice';
const ShoppingCart = (props) => {
    const {productId, quantity} = props.data;
    const [detail, setDetail] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const findDetail = products.filter(product => product.id === productId)[0];
        setDetail(findDetail);
    }, [productId])
    const handleMinusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity - 1
        }));
    }
    const handlePlusQuantity = () => {
        dispatch(changeQuantity({
            productId: productId,
            quantity: quantity + 1
        }));
    }
  return (
    <div className='flex justify-between items-center bg-slate-600 text-white p-2 border-slate-700 gap-1 rounded-md'>
        <img src={detail.interfaceImage} alt="" className='w-12 h-12 object-cover rounded-md' />
        {/* Product Name */}
        <h3 className='text-lg font-semibold'>{detail.name}</h3>
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
  )
}

export default ShoppingCart