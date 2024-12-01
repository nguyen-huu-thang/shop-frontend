import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCart = (props) => {
    const { id, name, price, interfaceImage, slug } = props.data;
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="relative bg-white p-5 shadow-md border-2 border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300
        hover:border-blue-500">
            <div 
                className="absolute top-4 right-4 text-red-500 cursor-pointer z-10"
                onClick={toggleFavorite}
            >
                {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
            </div>

            <Link to={slug} className="block overflow-hidden rounded-lg">
                <img 
                    src={interfaceImage} 
                    alt={name} 
                    className="w-60 h-30 object-cover transition-transform duration-300 hover:scale-110"
                />
            </Link>

            <div className="mt-4">
                <h2 className="text-xl font-monospace text-black">{name}</h2>
                <p className="text-lg font-semibold text-red-600">{price}đ</p>
            </div>
            <div className="absolute top-4 left-4 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Mới!
            </div>
        </div>
    );
};

export default ProductCart;
