import React from 'react'
import { Link } from 'react-router-dom';
const ProductCart = (props) => {
    const {id, name, price, image , slug} = props.data;
  return (
    <div className='bg-white p-5 shadow-md border-2 border-gray-300'>
      <Link to={slug}>
        <img src={image} alt={name} className='w-full h-80 object-cover' />
      </Link>
      <h2 className='text-xl font-bold'>{name}</h2>
      <p className='text-gray-500'>đ{price}</p>
    </div>
  )
}

export default ProductCart